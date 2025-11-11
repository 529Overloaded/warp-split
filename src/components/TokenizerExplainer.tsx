import { useState, useRef } from "react";
import { Navigation } from "./Navigation";
import { HeroSection } from "./HeroSection";
import { LearnSection } from "./LearnSection";
import { TokenizeSection } from "./TokenizeSection";
import { CompareSection } from "./CompareSection";
import { CreateSection } from "./CreateSection";

export const TokenizerExplainer = () => {
  const [currentSection, setCurrentSection] = useState<'hero' | 'learn' | 'tokenize' | 'compare' | 'create'>('hero');
  const heroRef = useRef<HTMLDivElement>(null);
  const learnRef = useRef<HTMLDivElement>(null);
  const tokenizeRef = useRef<HTMLDivElement>(null);
  const compareRef = useRef<HTMLDivElement>(null);
  const createRef = useRef<HTMLDivElement>(null);

  const handleNavigate = (section: 'hero' | 'learn' | 'tokenize' | 'compare' | 'create') => {
    setCurrentSection(section);
    const refs = { hero: heroRef, learn: learnRef, tokenize: tokenizeRef, compare: compareRef, create: createRef };
    refs[section].current?.scrollIntoView({ behavior: 'smooth' });
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
      
      <div ref={compareRef}>
        <CompareSection />
      </div>
      
      <div ref={createRef}>
        <CreateSection />
      </div>
    </div>
  );
};
