import type { ReactNode } from "react";

interface EmptyStateProps {
	title: string;
	description: string;
	action?: ReactNode;
}

export const EmptyState = ({ title, description, action }: EmptyStateProps) => (
	<div className="space-y-6 p-6 md:p-8 rounded border border-dashed border-border bg-card/50 animate-slide-in text-center">
		<div className="space-y-3 max-w-md mx-auto">
			<p className="text-base md:text-lg font-light opacity-60">{title}</p>
			<p className="text-xs text-secondary">{description}</p>
			{action && <div className="mt-4">{action}</div>}
		</div>
	</div>
);
