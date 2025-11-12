interface StatDisplayProps {
	label: string;
	value: string | number;
}

export const StatDisplay = ({ label, value }: StatDisplayProps) => (
	<div className="space-y-1">
		<p className="text-xs text-secondary">{label}</p>
		<p className="text-lg md:text-xl font-light">{value}</p>
	</div>
);
