import { TokenDisplay } from "@/components/TokenDisplay";
import { Card } from "@/components/ui/Card";
import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/input";
import { StatDisplay } from "@/components/ui/StatDisplay";
import type { TokenizationResult } from "@/hooks/useTokenizerBuilder";

interface TestStepProps {
	testInput: string;
	result: TokenizationResult | null;
	onInputChange: (value: string) => void;
}

export const TestStep = ({
	testInput,
	result,
	onInputChange,
}: TestStepProps) => (
	<Card
		title="test your tokenizer"
		description="See your custom tokenizer in action"
	>
		<div className="space-y-6">
			<FormField label="enter text to tokenize">
				<Input
					value={testInput}
					onChange={(e) => onInputChange(e.target.value)}
					placeholder="Type something to see it tokenized..."
					className="font-light text-sm md:text-base"
				/>
			</FormField>

			{result && result.tokens.length > 0 ? (
				<div className="space-y-6 animate-fade-in-up">
					<TokenDisplay tokens={result.tokens} tokenIds={result.tokenIds} />
					<div className="pt-4 border-t border-border grid grid-cols-3 gap-4">
						<StatDisplay label="tokens" value={result.stats.tokenCount} />
						<StatDisplay label="characters" value={result.stats.inputLength} />
						<StatDisplay
							label="compression"
							value={`${result.stats.compressionRatio.toFixed(0)}%`}
						/>
					</div>
				</div>
			) : testInput.trim() ? (
				<div className="text-center py-12">
					<p className="text-sm text-secondary animate-pulse">tokenizing...</p>
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-sm text-secondary opacity-60">
						enter text to see results
					</p>
				</div>
			)}
		</div>
	</Card>
);
