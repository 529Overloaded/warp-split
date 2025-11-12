import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

interface SpecialTokensStepProps {
	tokens: {
		cls: string;
		sep: string;
		pad: string;
		unk: string;
		mask: string;
	};
	onChange: (key: string, value: string) => void;
}

const TOKEN_INFO = {
	cls: "Classification token - marks the start of a sequence",
	sep: "Separator token - separates multiple sequences",
	pad: "Padding token - fills sequences to equal length",
	unk: "Unknown token - replaces out-of-vocabulary words",
	mask: "Mask token - used for masked language modeling",
};

export const SpecialTokensStep = ({
	tokens,
	onChange,
}: SpecialTokensStepProps) => (
	<Card
		title="special tokens"
		description="Configure tokens with special meaning for your model"
	>
		<div className="space-y-4">
      {Object.entries(tokens).map(([key, value]) => (
        <div key={key} className="space-y-2">
          <div className="flex items-baseline gap-2">
            <label htmlFor={key} className="text-sm font-light opacity-80 w-16 uppercase text-xs">
              {key}
            </label>
            <Input
              id={key}
              value={value}
              onChange={(e) => onChange(key, e.target.value)}
              className="flex-1 font-mono text-sm"
              placeholder={`[${key.toUpperCase()}]`}
            />
					</div>
					<p className="text-xs text-secondary pl-16">
						{TOKEN_INFO[key as keyof typeof TOKEN_INFO]}
					</p>
				</div>
			))}
		</div>
	</Card>
);
