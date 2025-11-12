import { Card } from "@/components/ui/card";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface PretokenizeStepProps {
	value: string;
	onChange: (value: string) => void;
}

export const PretokenizeStep = ({ value, onChange }: PretokenizeStepProps) => (
	<Card
		title="pre-tokenization"
		description="Define how to split text into initial chunks"
	>
		<div className="space-y-6">
			<Select value={value} onValueChange={onChange}>
				<SelectTrigger className="text-base">
					<SelectValue />
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="whitespace">Whitespace</SelectItem>
					<SelectItem value="bert">BERT-style</SelectItem>
					<SelectItem value="punctuation">Punctuation</SelectItem>
				</SelectContent>
			</Select>

			<div className="space-y-2 p-4 bg-secondary/5 rounded">
				<p className="text-xs text-secondary">
					{value === "whitespace" &&
						"Split on spaces: 'hello world' → ['hello', 'world']"}
					{value === "bert" &&
						"Split on spaces and punctuation: 'hello, world!' → ['hello', ',', 'world', '!']"}
					{value === "punctuation" &&
						"Split on punctuation only: 'hello.world' → ['hello', 'world']"}
				</p>
			</div>
		</div>
	</Card>
);
