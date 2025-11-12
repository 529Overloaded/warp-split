import { memo } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getAnimationDelay, getTokenColor } from "@/lib/constants";

const SECTION_TITLE = "learn";

const TOKENIZERS = [
	{
		type: "BPE",
		desc: "merges frequent pairs",
		tokens: ["play", "ing"],
	},
	{
		type: "WordPiece",
		desc: "splits into subwords",
		tokens: ["un", "##hap", "##pi", "##ness"],
	},
	{
		type: "Unigram",
		desc: "probabilistic selection",
		tokens: ["token", "##ization"],
	},
	{
		type: "SentencePiece",
		desc: "no pre-tokenization",
		tokens: ["▁the", "▁quick", "▁brown"],
	},
	{
		type: "CharBPE",
		desc: "character-level base",
		tokens: ["h", "e", "ll", "o"],
	},
];

export const LearnSection = memo(() => {
	return (
		<section className="section-wrapper">
			<div className="section-content space-y-12 md:space-y-24">
				<SectionHeader title={SECTION_TITLE} />

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
					{TOKENIZERS.map(({ type, desc, tokens }, cardIdx) => (
						<div
							key={type}
							className="space-y-6 animate-slide-in interactive-hover"
							style={{ animationDelay: `${cardIdx * 0.1}s` }}
						>
							<div className="space-y-2">
								<h3 className="text-xl md:text-2xl font-light">{type}</h3>
								<p className="text-secondary">{desc}</p>
							</div>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, idx) => (
                  <span
                    key={`${token}-${idx}`}
                    className="token-badge animate-slide-in"
                    style={{ 
                      backgroundColor: getTokenColor(idx),
                      animationDelay: getAnimationDelay(cardIdx * 2 + idx),
                    }}
                  >
                    {token}
                  </span>
                ))}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
});
