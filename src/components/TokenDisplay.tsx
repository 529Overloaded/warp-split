import { useState } from "react";

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

export const TokenDisplay = ({ tokens, tokenIds }: TokenDisplayProps) => {
  const [showIds, setShowIds] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-xs md:text-sm opacity-60">{tokens.length} tokens</p>
        {tokenIds && (
          <button
            onClick={() => setShowIds(!showIds)}
            className="text-xs md:text-sm opacity-60 hover:opacity-100 transition-opacity"
          >
            {showIds ? 'show tokens' : 'show ids'}
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2 md:gap-3">
        {tokens.map((token, idx) => (
          <span
            key={idx}
            className="px-3 md:px-4 py-2 md:py-3 rounded text-sm md:text-base font-light"
            style={{ backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length] }}
          >
            {showIds && tokenIds ? tokenIds[idx] : token}
          </span>
        ))}
      </div>
    </div>
  );
};
