import { Card } from "@/components/ui/Card";

interface NormalizeStepProps {
	lowercase: boolean;
	stripAccents: boolean;
	onLowercaseChange: (value: boolean) => void;
	onStripAccentsChange: (value: boolean) => void;
}

export const NormalizeStep = ({
	lowercase,
	stripAccents,
	onLowercaseChange,
	onStripAccentsChange,
}: NormalizeStepProps) => (
	<Card
		title="normalization"
		description="Clean and standardize text before tokenization"
	>
		<div className="space-y-6">
			<label className="flex items-center gap-4 p-4 rounded border border-border cursor-pointer hover:bg-secondary/5 transition-colors">
				<input
					type="checkbox"
					checked={lowercase}
					onChange={(e) => onLowercaseChange(e.target.checked)}
					className="w-5 h-5 cursor-pointer"
				/>
				<div className="flex-1">
					<p className="text-sm font-light">Convert to lowercase</p>
					<p className="text-xs text-secondary mt-1">
						"Hello World" becomes "hello world"
					</p>
				</div>
			</label>

			<label className="flex items-center gap-4 p-4 rounded border border-border cursor-pointer hover:bg-secondary/5 transition-colors">
				<input
					type="checkbox"
					checked={stripAccents}
					onChange={(e) => onStripAccentsChange(e.target.checked)}
					className="w-5 h-5 cursor-pointer"
				/>
				<div className="flex-1">
					<p className="text-sm font-light">Remove accents</p>
					<p className="text-xs text-secondary mt-1">"café" becomes "cafe"</p>
				</div>
			</label>
		</div>
	</Card>
);
