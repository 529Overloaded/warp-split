import { AutoTokenizer } from "@huggingface/transformers";
import { useCallback, useRef, useState } from "react";

export interface TokenizerConfig {
	type: "wordpiece" | "bpe" | "unigram" | "sentencepiece";
	vocab: string[];
	normalizer: {
		lowercase: boolean;
		stripAccents: boolean;
	};
	preTokenizer: "whitespace" | "bert" | "punctuation";
	specialTokens: {
		cls: string;
		sep: string;
		pad: string;
		unk: string;
		mask: string;
	};
}

export interface TokenizationResult {
	text: string;
	tokens: string[];
	tokenIds: number[];
	stats: {
		inputLength: number;
		tokenCount: number;
		compressionRatio: number;
	};
}

const DEFAULT_CONFIG: TokenizerConfig = {
	type: "wordpiece",
	vocab: [],
	normalizer: {
		lowercase: true,
		stripAccents: false,
	},
	preTokenizer: "whitespace",
	specialTokens: {
		cls: "[CLS]",
		sep: "[SEP]",
		pad: "[PAD]",
		unk: "[UNK]",
		mask: "[MASK]",
	},
};

// Map config types to model IDs for tokenizer reference
const MODEL_MAP: Record<string, string> = {
	wordpiece: "bert-base-uncased",
	bpe: "gpt2",
	unigram: "xlnet-base-cased",
	sentencepiece: "google/mt5-base",
};

export const useTokenizerBuilder = () => {
	const [config, setConfig] = useState<TokenizerConfig>(DEFAULT_CONFIG);
	const [testInput, setTestInput] = useState("");
	const [result, setResult] = useState<TokenizationResult | null>(null);
	const [isGeneratingVocab, setIsGeneratingVocab] = useState(false);

	const tokenizerCache = useRef<Map<string, any>>(new Map());

	const tokenize = useCallback(
		async (text: string) => {
			if (!text.trim()) {
				setResult(null);
				return;
			}

			if (config.vocab.length === 0) {
				setResult(null);
				return;
			}

			try {
				// Apply user's normalization settings
				let normalizedText = text;
				if (config.normalizer.lowercase) {
					normalizedText = normalizedText.toLowerCase();
				}
				if (config.normalizer.stripAccents) {
					normalizedText = normalizedText
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "");
				}

				// Apply pre-tokenization based on config
				let chunks: string[] = [];
				switch (config.preTokenizer) {
					case "whitespace":
						chunks = normalizedText.split(/\s+/).filter(Boolean);
						break;
					case "bert":
						chunks = normalizedText
							.split(/(\s+|[^\w\s])/g)
							.filter((c) => c.trim());
						break;
					case "punctuation":
						chunks = normalizedText.split(/[\s.,!?;:()[\]{}]+/).filter(Boolean);
						break;
					default:
						chunks = [normalizedText];
				}

				// Build vocab lookup (excluding special tokens for matching)
				const vocabSet = new Set(
					config.vocab.filter(
						(token) => !Object.values(config.specialTokens).includes(token),
					),
				);

				// Custom tokenization using the generated vocabulary
				const allTokens: string[] = [];

				for (const chunk of chunks) {
					if (!chunk.trim()) continue;

					// Greedy longest-match tokenization (similar to WordPiece)
					let i = 0;
					const chunkTokens: string[] = [];

					while (i < chunk.length) {
						let foundMatch = false;

						// Try to find the longest matching token starting at position i
						for (let end = chunk.length; end > i; end--) {
							const candidate = chunk.slice(i, end);

							// For subword tokens (like ##ing), check both with and without ##
							if (vocabSet.has(candidate)) {
								chunkTokens.push(candidate);
								i = end;
								foundMatch = true;
								break;
							} else if (vocabSet.has(`##${candidate}`) && i > 0) {
								chunkTokens.push(`##${candidate}`);
								i = end;
								foundMatch = true;
								break;
							}
						}

						// If no match found, use unknown token for this character
						if (!foundMatch) {
							if (
								chunkTokens.length === 0 ||
								chunkTokens[chunkTokens.length - 1] !== config.specialTokens.unk
							) {
								chunkTokens.push(config.specialTokens.unk);
							}
							i++;
						}
					}

					allTokens.push(...chunkTokens);
				}

				// Add special tokens
				const tokensWithSpecial = [
					config.specialTokens.cls,
					...allTokens,
					config.specialTokens.sep,
				];

				// Generate token IDs from vocab
				const vocabToId = new Map<string, number>();
				config.vocab.forEach((token, idx) => vocabToId.set(token, idx));

				const tokenIds = tokensWithSpecial.map((token) =>
					vocabToId.has(token)
						? vocabToId.get(token)!
						: vocabToId.get(config.specialTokens.unk) || 0,
				);

				setResult({
					text,
					tokens: tokensWithSpecial,
					tokenIds,
					stats: {
						inputLength: text.length,
						tokenCount: tokensWithSpecial.length,
						compressionRatio: (text.length / tokensWithSpecial.length) * 100,
					},
				});
			} catch (error) {
				console.error("Tokenization error:", error);
				setResult(null);
			}
		},
		[config],
	);

	const generateVocabFromText = useCallback(
		async (text: string) => {
			if (!text.trim()) return;

			setIsGeneratingVocab(true);
			try {
				const modelId = MODEL_MAP[config.type];

				let tokenizer = tokenizerCache.current.get(modelId);
				if (!tokenizer) {
					tokenizer = await AutoTokenizer.from_pretrained(modelId);
					tokenizerCache.current.set(modelId, tokenizer);
				}

				// Apply normalization
				let normalizedText = text;
				if (config.normalizer.lowercase) {
					normalizedText = normalizedText.toLowerCase();
				}
				if (config.normalizer.stripAccents) {
					normalizedText = normalizedText
						.normalize("NFD")
						.replace(/[\u0300-\u036f]/g, "");
				}

				// Apply pre-tokenization
				let chunks: string[] = [];
				switch (config.preTokenizer) {
					case "whitespace":
						chunks = normalizedText.split(/\s+/).filter(Boolean);
						break;
					case "bert":
						chunks = normalizedText
							.split(/(\s+|[^\w\s])/g)
							.filter((c) => c.trim());
						break;
					case "punctuation":
						chunks = normalizedText.split(/[\s.,!?;:()[\]{}]+/).filter(Boolean);
						break;
					default:
						chunks = [normalizedText];
				}

				// Tokenize and collect unique tokens
				const uniqueTokens = new Set<string>();
				for (const chunk of chunks) {
					if (chunk.trim()) {
						const chunkTokens = await tokenizer.tokenize(chunk);
						chunkTokens.forEach((token: string) => uniqueTokens.add(token));
					}
				}

				// Add special tokens
				Object.values(config.specialTokens).forEach((token) => {
					if (token) uniqueTokens.add(token);
				});

				const newVocab = Array.from(uniqueTokens).sort();
				setConfig((prev) => ({ ...prev, vocab: newVocab }));
			} catch (error) {
				console.error("Vocab generation error:", error);
			} finally {
				setIsGeneratingVocab(false);
			}
		},
		[config],
	);

	const updateConfig = useCallback((updates: Partial<TokenizerConfig>) => {
		setConfig((prev) => ({
			...prev,
			...updates,
			normalizer: updates.normalizer
				? { ...prev.normalizer, ...updates.normalizer }
				: prev.normalizer,
			specialTokens: updates.specialTokens
				? { ...prev.specialTokens, ...updates.specialTokens }
				: prev.specialTokens,
		}));
	}, []);

	return {
		config,
		testInput,
		result,
		isGeneratingVocab,
		setTestInput,
		updateConfig,
		tokenize,
		generateVocabFromText,
	};
};
