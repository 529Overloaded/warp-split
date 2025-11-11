import { useState, useEffect } from "react";

interface NavigationProps {
  onNavigate: (section: 'hero' | 'learn' | 'tokenize' | 'compare' | 'create') => void;
  currentSection: string;
}

export const Navigation = ({ onNavigate, currentSection }: NavigationProps) => {
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setMinimized(currentScroll > 100 && currentScroll > lastScroll);
      lastScroll = currentScroll;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (section: 'hero' | 'learn' | 'tokenize' | 'compare' | 'create') => {
    setMinimized(true);
    onNavigate(section);
  };

  return (
    <nav className={`fixed top-0 left-0 z-50 flex items-center gap-4 md:gap-8 transition-all duration-300 ${
      minimized ? 'p-2 md:p-3' : 'p-4 md:p-8'
    }`}>
      <button 
        onClick={() => handleNavigate('hero')}
        className={`font-light tracking-tight hover:opacity-60 transition-all duration-300 ${
          minimized ? 'text-lg md:text-xl' : 'text-2xl md:text-4xl'
        }`}
      >
        TOKENIZERS
      </button>
      <div className={`flex gap-3 md:gap-6 transition-all duration-300 ${
        minimized ? 'text-[10px] md:text-xs' : 'text-xs md:text-sm'
      }`}>
        <button
          onClick={() => handleNavigate('learn')}
          className={`hover:opacity-60 transition-opacity ${currentSection === 'learn' ? 'opacity-100' : 'opacity-40'}`}
        >
          learn
        </button>
        <button
          onClick={() => handleNavigate('tokenize')}
          className={`hover:opacity-60 transition-opacity ${currentSection === 'tokenize' ? 'opacity-100' : 'opacity-40'}`}
        >
          tokenize
        </button>
        <button
          onClick={() => handleNavigate('compare')}
          className={`hover:opacity-60 transition-opacity ${currentSection === 'compare' ? 'opacity-100' : 'opacity-40'}`}
        >
          compare
        </button>
        <button
          onClick={() => handleNavigate('create')}
          className={`hover:opacity-60 transition-opacity ${currentSection === 'create' ? 'opacity-100' : 'opacity-40'}`}
        >
          create
        </button>
      </div>
    </nav>
  );
};
