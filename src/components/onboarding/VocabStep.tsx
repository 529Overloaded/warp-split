import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/Card";
import { Textarea } from "@/components/ui/textarea";

interface VocabStepProps {
	vocab: string[];
	isGenerating: boolean;
	onGenerate: (text: string) => Promise<void>;
	onClear: () => void;
}

export const VocabStep = ({
	vocab,
	isGenerating,
	onGenerate,
	onClear,
}: VocabStepProps) => {
	const [text, setText] = useState("");

	const handleGenerate = async () => {
		await onGenerate(text);
		setText("");
	};

	return (
		<Card
			title="generate vocabulary"
			description="Enter sample text to build your token vocabulary"
		>
			<div className="space-y-6">
				<Textarea
					value={text}
					onChange={(e) => setText(e.target.value)}
					placeholder="Enter representative text from your domain...
Example: Hello world! This is a sample text for tokenization."
					className="h-32 font-light text-sm resize-none"
				/>

				<div className="flex gap-2">
					<Button
						onClick={handleGenerate}
						disabled={!text.trim() || isGenerating}
						className="flex-1"
					>
						{isGenerating && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
						{isGenerating ? "generating..." : "generate vocabulary"}
					</Button>
					{vocab.length > 0 && (
						<Button variant="outline" onClick={onClear} disabled={isGenerating}>
							clear
						</Button>
					)}
				</div>

				{vocab.length > 0 && (
					<div className="space-y-3 p-4 bg-secondary/5 rounded animate-fade-in-up">
						<p className="text-xs text-secondary">
							Generated {vocab.length} unique tokens
						</p>
            <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto">
              {vocab.slice(0, 30).map((token, idx) => (
                <span
                  key={`${token}-${idx}`}
                  className="px-2 py-1 rounded text-xs font-light bg-card border border-border"
                >
                  {token.length > 15 ? `${token.slice(0, 13)}…` : token}
                </span>
              ))}
							{vocab.length > 30 && (
								<span className="px-2 py-1 text-xs font-light opacity-50">
									+{vocab.length - 30} more
								</span>
							)}
						</div>
					</div>
				)}
			</div>
		</Card>
	);
};
