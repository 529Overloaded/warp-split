export const TOKEN_COLORS = [
	"hsl(var(--token-1))",
	"hsl(var(--token-2))",
	"hsl(var(--token-3))",
	"hsl(var(--token-4))",
] as const;

export const getTokenColor = (index: number) =>
	TOKEN_COLORS[index % TOKEN_COLORS.length];

export const getAnimationDelay = (index: number, multiplier = 0.05) =>
	`${index * multiplier}s`;
