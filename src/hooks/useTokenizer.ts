import { AutoTokenizer } from "@huggingface/transformers";
import { useCallback, useRef, useState } from "react";

export const useTokenizer = () => {
	const [tokens, setTokens] = useState<string[]>([]);
	const [tokenIds, setTokenIds] = useState<number[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const tokenizerCache = useRef<Map<string, any>>(new Map());

	const tokenizeText = useCallback(async (model: string, inputText: string) => {
		if (!inputText.trim() || !model.trim()) return;

		setLoading(true);
		setError("");

		try {
			let tokenizer = tokenizerCache.current.get(model);

			if (!tokenizer) {
				tokenizer = await AutoTokenizer.from_pretrained(model);
				tokenizerCache.current.set(model, tokenizer);
			}

			const ids = tokenizer.encode(inputText);
			const tokensList = ids.map((id: number) => tokenizer.decode([id]));
			setTokens(tokensList);
			setTokenIds(ids);
		} catch (_err) {
			setError("model load failed");
			setTokens([]);
			setTokenIds([]);
		} finally {
			setLoading(false);
		}
	}, []);

	return { tokens, tokenIds, loading, error, tokenizeText };
};
