import { useEffect, useState, memo } from "react";

const SAMPLE_TEXTS = [
  "neural networks learn patterns",
  "transformers revolutionized NLP",
  "tokens are subword units",
  "embeddings capture meaning",
  "attention mechanisms focus context"
];

const TOKEN_COLORS = [
  "hsl(var(--token-1))",
  "hsl(var(--token-2))",
  "hsl(var(--token-3))",
  "hsl(var(--token-4))"
];

export const HeroSection = memo(() => {
  const [currentText, setCurrentText] = useState(0);
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    const text = SAMPLE_TEXTS[currentText];
    const words = text.split(' ');
    setTokens(words);

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % SAMPLE_TEXTS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentText]);

  return (
    <section className="section-wrapper">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center max-w-6xl">
        {tokens.map((token, idx) => (
          <span
            key={`${currentText}-${idx}`}
            className="text-3xl md:text-5xl lg:text-7xl font-light px-4 md:px-6 py-2 md:py-4 rounded animate-slide-in interactive-hover"
            style={{
              backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length],
              animationDelay: `${idx * 0.05}s`
            }}
          >
            {token}
          </span>
        ))}
      </div>
    </section>
  );
});
