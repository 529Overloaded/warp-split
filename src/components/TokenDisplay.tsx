import { memo, useState } from "react";
import { getAnimationDelay, getTokenColor } from "@/lib/constants";

interface TokenDisplayProps {
	tokens: string[];
	tokenIds?: number[];
}

export const TokenDisplay = memo(({ tokens, tokenIds }: TokenDisplayProps) => {
	const [showIds, setShowIds] = useState(false);

	return (
		<div className="space-y-4 animate-slide-in">
			<div className="flex items-center justify-between">
				<p className="text-secondary">{tokens.length} tokens</p>
				{tokenIds && (
          <button
            type="button"
            onClick={() => setShowIds(!showIds)}
            className="button-secondary interactive-hover"
          >
						{showIds ? "show tokens" : "show ids"}
					</button>
				)}
			</div>
			<div className="flex flex-wrap gap-2 md:gap-3">
        {tokens.map((token, idx) => (
          <span
            key={`${token}-${idx}`}
            className="token-badge-lg animate-slide-in"
            style={{
              backgroundColor: getTokenColor(idx),
              animationDelay: getAnimationDelay(idx, 0.02),
            }}
          >
            {showIds && tokenIds ? tokenIds[idx] : token}
          </span>
        ))}
			</div>
		</div>
	);
});
