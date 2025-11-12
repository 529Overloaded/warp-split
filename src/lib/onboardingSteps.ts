export const ONBOARDING_STEPS = [
	{
		id: "model",
		title: "choose tokenizer model",
		description: "Select the core algorithm that will break text into tokens",
		order: 1,
	},
	{
		id: "normalize",
		title: "configure normalization",
		description: "Define how to clean and standardize input text",
		order: 2,
	},
	{
		id: "pretokenize",
		title: "set pre-tokenization",
		description: "Choose how to split text into initial chunks",
		order: 3,
	},
	{
		id: "special",
		title: "add special tokens",
		description: "Configure special tokens for your model",
		order: 4,
	},
	{
		id: "vocab",
		title: "generate vocabulary",
		description: "Create your token vocabulary from sample text",
		order: 5,
	},
	{
		id: "test",
		title: "test your tokenizer",
		description: "Try out your custom tokenizer",
		order: 6,
	},
] as const;

export type OnboardingStepId = (typeof ONBOARDING_STEPS)[number]["id"];
