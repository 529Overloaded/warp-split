import { useState, useEffect, useRef, memo } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TokenDisplay } from "./TokenDisplay";
import { useTokenizer } from "@/hooks/useTokenizer";

const SECTION_TITLE = "compare";
const DEFAULT_TEXT = "comparing tokenizers reveals differences";
const DEFAULT_MODEL_A = "bert-base-uncased";
const DEFAULT_MODEL_B = "gpt2";

export const CompareSection = memo(() => {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [modelA, setModelA] = useState(DEFAULT_MODEL_A);
  const [modelB, setModelB] = useState(DEFAULT_MODEL_B);
  
  const tokenizerA = useTokenizer();
  const tokenizerB = useTokenizer();
  
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    debounceTimer.current = setTimeout(() => {
      tokenizerA.tokenizeText(modelA, text);
      tokenizerB.tokenizeText(modelB, text);
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [modelA, modelB, text, tokenizerA, tokenizerB]);

  return (
    <section className="section-wrapper">
      <div className="section-content space-y-12 md:space-y-16">
        <h2 className="heading-section">{SECTION_TITLE}</h2>
        
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <label className="text-secondary">text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="enter text"
              rows={2}
              className="resize-none bg-card text-sm md:text-base transition-all"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-6 animate-slide-in">
              <div className="space-y-4">
                <label className="text-secondary">model a</label>
                <Input
                  value={modelA}
                  onChange={(e) => setModelA(e.target.value)}
                  placeholder={DEFAULT_MODEL_A}
                  className="bg-card text-sm md:text-base transition-all"
                />
                {tokenizerA.loading && <p className="text-secondary animate-pulse">loading...</p>}
                {tokenizerA.error && <p className="text-xs md:text-sm text-destructive">{tokenizerA.error}</p>}
              </div>

              {tokenizerA.tokens.length > 0 && (
                <TokenDisplay tokens={tokenizerA.tokens} tokenIds={tokenizerA.tokenIds} />
              )}
            </div>

            <div className="space-y-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
              <div className="space-y-4">
                <label className="text-secondary">model b</label>
                <Input
                  value={modelB}
                  onChange={(e) => setModelB(e.target.value)}
                  placeholder={DEFAULT_MODEL_B}
                  className="bg-card text-sm md:text-base transition-all"
                />
                {tokenizerB.loading && <p className="text-secondary animate-pulse">loading...</p>}
                {tokenizerB.error && <p className="text-xs md:text-sm text-destructive">{tokenizerB.error}</p>}
              </div>

              {tokenizerB.tokens.length > 0 && (
                <TokenDisplay tokens={tokenizerB.tokens} tokenIds={tokenizerB.tokenIds} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
