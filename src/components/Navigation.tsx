interface NavigationProps {
  onNavigate: (section: 'hero' | 'learn' | 'tokenize') => void;
  currentSection: string;
}

export const Navigation = ({ onNavigate, currentSection }: NavigationProps) => {
  return (
    <nav className="fixed top-0 left-0 z-50 p-4 md:p-8 flex items-center gap-6 md:gap-12">
      <button 
        onClick={() => onNavigate('hero')}
        className="text-2xl md:text-4xl font-light tracking-tight hover:opacity-60 transition-opacity"
      >
        TOKENIZERS
      </button>
      <div className="flex gap-4 md:gap-8 text-xs md:text-sm">
        <button
          onClick={() => onNavigate('learn')}
          className={`hover:opacity-60 transition-opacity ${currentSection === 'learn' ? 'opacity-100' : 'opacity-40'}`}
        >
          learn
        </button>
        <button
          onClick={() => onNavigate('tokenize')}
          className={`hover:opacity-60 transition-opacity ${currentSection === 'tokenize' ? 'opacity-100' : 'opacity-40'}`}
        >
          tokenize
        </button>
      </div>
    </nav>
  );
};
