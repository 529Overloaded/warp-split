import type { ReactNode } from "react";

interface SectionHeaderProps {
	title: string;
	action?: ReactNode;
}

export const SectionHeader = ({ title, action }: SectionHeaderProps) => (
	<div className="flex items-end justify-between">
		<h2 className="heading-section">{title}</h2>
		{action}
	</div>
);
