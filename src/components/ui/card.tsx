import type { ReactNode } from "react";

interface CardProps {
	title?: string;
	description?: string;
	children: ReactNode;
	className?: string;
}

export const Card = ({
	title,
	description,
	children,
	className = "",
}: CardProps) => (
	<div
		className={`space-y-4 p-6 rounded-lg border border-border bg-card ${className}`}
	>
		{(title || description) && (
			<div className="space-y-1">
				{title && <h3 className="text-lg font-light">{title}</h3>}
				{description && <p className="text-xs text-secondary">{description}</p>}
			</div>
		)}
		{children}
	</div>
);
