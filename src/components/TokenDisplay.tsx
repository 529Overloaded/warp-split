import { useState, memo } from "react";

interface TokenDisplayProps {
  tokens: string[];
  tokenIds?: number[];
}

const TOKEN_COLORS = [
  "hsl(var(--token-1))",
  "hsl(var(--token-2))",
  "hsl(var(--token-3))",
  "hsl(var(--token-4))"
];

export const TokenDisplay = memo(({ tokens, tokenIds }: TokenDisplayProps) => {
  const [showIds, setShowIds] = useState(false);

  return (
    <div className="space-y-4 animate-slide-in">
      <div className="flex items-center justify-between">
        <p className="text-secondary">{tokens.length} tokens</p>
        {tokenIds && (
          <button
            onClick={() => setShowIds(!showIds)}
            className="button-secondary interactive-hover"
          >
            {showIds ? 'show tokens' : 'show ids'}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {tokens.map((token, idx) => (
          <span
            key={idx}
            className="token-badge-lg animate-slide-in"
            style={{ 
              backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length],
              animationDelay: `${idx * 0.02}s`
            }}
          >
            {showIds && tokenIds ? tokenIds[idx] : token}
          </span>
        ))}
      </div>
    </div>
  );
});
