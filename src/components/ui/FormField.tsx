import type { ReactNode } from "react";

interface FormFieldProps {
	label: string;
	children: ReactNode;
}

export const FormField = ({ label, children }: FormFieldProps) => (
	<div className="space-y-4">
		<p className="text-secondary">{label}</p>
		{children}
	</div>
);
