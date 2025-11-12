import { useRef, useState } from "react";
import { CreateSection } from "./CreateSection";
import { HeroSection } from "./HeroSection";
import { LearnSection } from "./LearnSection";
import { Navigation } from "./Navigation";
import { TokenizeSection } from "./TokenizeSection";

export const TokenizerExplainer = () => {
	const [currentSection, setCurrentSection] = useState<
		"hero" | "learn" | "tokenize" | "create"
	>("hero");
	const heroRef = useRef<HTMLDivElement>(null);
	const learnRef = useRef<HTMLDivElement>(null);
	const tokenizeRef = useRef<HTMLDivElement>(null);
	const createRef = useRef<HTMLDivElement>(null);

	const handleNavigate = (
		section: "hero" | "learn" | "tokenize" | "create",
	) => {
		setCurrentSection(section);
		const refs = {
			hero: heroRef,
			learn: learnRef,
			tokenize: tokenizeRef,
			create: createRef,
		};
		refs[section].current?.scrollIntoView({ behavior: "smooth" });
	};

	return (
		<div className="min-h-screen bg-background">
			<Navigation onNavigate={handleNavigate} currentSection={currentSection} />

			<div ref={heroRef}>
				<HeroSection />
			</div>

			<div ref={learnRef}>
				<LearnSection />
			</div>

			<div ref={tokenizeRef}>
				<TokenizeSection />
			</div>

			<div ref={createRef}>
				<CreateSection />
			</div>
		</div>
	);
};
