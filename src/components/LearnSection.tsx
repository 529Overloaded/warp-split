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

export const LearnSection = () => {
  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full space-y-12 md:space-y-24">
        <h2 className="text-3xl md:text-6xl font-light">types</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {TOKENIZERS.map(({ type, desc, tokens }) => (
            <div key={type} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-light">{type}</h3>
                <p className="text-xs md:text-sm opacity-60">{desc}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                {tokens.map((token, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-2 rounded text-xs md:text-sm"
                    style={{ backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length] }}
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
};
