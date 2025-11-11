import { useState, useEffect, useRef, memo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TokenDisplay } from "./TokenDisplay";
import { useTokenizer } from "@/hooks/useTokenizer";

const DEFAULT_TEXT = "tokenizers process text efficiently";
const SECTION_TITLE = "tokenize";

export const TokenizeSection = memo(() => {
  const [modelName, setModelName] = useState("bert-base-uncased");
  const [text, setText] = useState(DEFAULT_TEXT);
  const { tokens, tokenIds, loading, error, tokenizeText } = useTokenizer();
  
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    debounceTimer.current = setTimeout(() => {
      tokenizeText(modelName, text);
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [modelName, text, tokenizeText]);

  return (
    <section className="section-wrapper">
      <div className="section-content space-y-12 md:space-y-16">
        <h2 className="heading-section">{SECTION_TITLE}</h2>
        
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <label className="text-secondary">model</label>
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="bert-base-uncased"
              className="bg-card text-sm md:text-base transition-all"
            />
            {loading && <p className="text-secondary animate-pulse">loading...</p>}
            {error && <p className="text-xs md:text-sm text-destructive animate-slide-in">{error}</p>}
          </div>

          <div className="space-y-4">
            <label className="text-secondary">text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="enter text"
              rows={3}
              className="resize-none bg-card text-sm md:text-base transition-all"
            />
          </div>

          {tokens.length > 0 && (
            <TokenDisplay tokens={tokens} tokenIds={tokenIds} />
          )}
        </div>
      </div>
    </section>
  );
});
