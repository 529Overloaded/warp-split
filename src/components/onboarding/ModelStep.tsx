import { Card } from "@/components/ui/Card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ModelStepProps {
	value: string;
	onChange: (value: string) => void;
}

export const ModelStep = ({ value, onChange }: ModelStepProps) => (
	<Card
		title="tokenizer model"
		description="The core algorithm determines how text is split into tokens"
	>
		<div className="space-y-6">
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="text-base">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="wordpiece">WordPiece</SelectItem>
					<SelectItem value="bpe">BPE (Byte Pair Encoding)</SelectItem>
					<SelectItem value="unigram">Unigram</SelectItem>
					<SelectItem value="sentencepiece">SentencePiece</SelectItem>
				</SelectContent>
			</Select>

			<div className="space-y-2 p-4 bg-secondary/5 rounded">
				<p className="text-xs text-secondary">
					{value === "wordpiece" &&
						"WordPiece: Splits unknown words into known subwords (used in BERT)"}
					{value === "bpe" &&
						"BPE: Merges frequent character pairs iteratively (used in GPT)"}
					{value === "unigram" && "Unigram: Probabilistic subword selection"}
					{value === "sentencepiece" &&
						"SentencePiece: Language-agnostic tokenization"}
				</p>
			</div>
		</div>
	</Card>
);
