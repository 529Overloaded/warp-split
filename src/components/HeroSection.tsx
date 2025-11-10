import { useEffect, useState } from "react";

const SAMPLE_TEXTS = [
  "tokenization",
  "subword units",
  "transformer models",
  "neural networks",
  "language processing",
];

const TOKEN_COLORS = [
  "hsl(var(--token-1))",
  "hsl(var(--token-2))",
  "hsl(var(--token-3))",
  "hsl(var(--token-4))"
];

export const HeroSection = () => {
  const [currentText, setCurrentText] = useState(0);
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    const text = SAMPLE_TEXTS[currentText];
    const chars = text.split('');
    setTokens(chars);

    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % SAMPLE_TEXTS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentText]);

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4">
      <div className="flex flex-wrap gap-2 md:gap-4 justify-center max-w-6xl">
        {tokens.map((token, idx) => (
          <span
            key={`${currentText}-${idx}`}
            className="text-4xl md:text-6xl lg:text-8xl font-light px-3 md:px-6 py-2 md:py-4 rounded animate-slide-in"
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
};
