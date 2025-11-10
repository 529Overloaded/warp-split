import { memo } from "react";

const SECTION_TITLE = "learn";

const TOKENIZERS = [
  {
    type: "BPE",
    desc: "merges frequent pairs",
    tokens: ["play", "ing"]
  },
  {
    type: "WordPiece",
    desc: "splits into subwords",
    tokens: ["un", "##hap", "##pi", "##ness"]
  },
  {
    type: "Unigram",
    desc: "probabilistic selection",
    tokens: ["token", "##ization"]
  },
  {
    type: "SentencePiece",
    desc: "no pre-tokenization",
    tokens: ["▁the", "▁quick", "▁brown"]
  },
  {
    type: "CharBPE",
    desc: "character-level base",
    tokens: ["h", "e", "ll", "o"]
  }
];

const TOKEN_COLORS = [
  "hsl(var(--token-1))",
  "hsl(var(--token-2))",
  "hsl(var(--token-3))",
  "hsl(var(--token-4))"
];

export const LearnSection = memo(() => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full space-y-12 md:space-y-24 animate-slide-in">
        <h2 className="text-3xl md:text-6xl font-light">{SECTION_TITLE}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {TOKENIZERS.map(({ type, desc, tokens }, cardIdx) => (
            <div 
              key={type} 
              className="space-y-6 animate-slide-in hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${cardIdx * 0.1}s` }}
            >
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-light">{type}</h3>
                <p className="text-xs md:text-sm opacity-60">{desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 rounded text-xs md:text-sm transition-all duration-300 hover:scale-110 cursor-default"
                    style={{ 
                      backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length],
                      animationDelay: `${(cardIdx * 0.1) + (idx * 0.05)}s`
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
