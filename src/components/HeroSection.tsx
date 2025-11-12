import { memo, useEffect, useState } from "react";
import { getAnimationDelay, getTokenColor } from "@/lib/constants";

const SAMPLE_TEXTS = [
  "neural networks learn patterns",
  "transformers revolutionized NLP",
  "tokens are subword units",
  "embeddings capture meaning",
  "attention mechanisms focus context",
];

export const HeroSection = memo(() => {
  const [currentText, setCurrentText] = useState(0);
  const [tokens, setTokens] = useState<string[]>([]);

  useEffect(() => {
    const text = SAMPLE_TEXTS[currentText];
    const words = text.split(" ");
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
            key={`${token}-${currentText}`}
            className="text-3xl md:text-5xl lg:text-7xl font-light px-4 md:px-6 py-2 md:py-4 rounded animate-slide-in interactive-hover"
            style={{
              backgroundColor: getTokenColor(idx),
              animationDelay: getAnimationDelay(idx),
            }}
          >
            {token}
          </span>
        ))}
      </div>
    </section>
  );
});
