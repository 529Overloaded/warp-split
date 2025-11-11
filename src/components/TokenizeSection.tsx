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
  const [compareMode, setCompareMode] = useState(false);
  const [modelB, setModelB] = useState("gpt2");
  
  const tokenizerA = useTokenizer();
  const tokenizerB = useTokenizer();
  const debounceTimer = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    
    debounceTimer.current = setTimeout(() => {
      tokenizerA.tokenizeText(modelName, text);
      if (compareMode) {
        tokenizerB.tokenizeText(modelB, text);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [modelName, modelB, text, compareMode, tokenizerA, tokenizerB]);

  return (
    <section className="section-wrapper">
      <div className="section-content space-y-12 md:space-y-16">
        <div className="flex items-center justify-between">
          <h2 className="heading-section">{SECTION_TITLE}</h2>
          <button
            onClick={() => setCompareMode(!compareMode)}
            className="text-xs md:text-sm button-secondary px-4 py-2 rounded border border-border hover:bg-card transition-all"
          >
            {compareMode ? 'single' : 'compare'}
          </button>
        </div>
        
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

          <div className={`grid ${compareMode ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'} gap-8 md:gap-12`}>
            <div className="space-y-6 animate-slide-in">
              <div className="space-y-4">
                <label className="text-secondary">{compareMode ? 'model a' : 'model'}</label>
                <Input
                  value={modelName}
                  onChange={(e) => setModelName(e.target.value)}
                  placeholder="bert-base-uncased"
                  className="bg-card text-sm md:text-base transition-all"
                />
                {tokenizerA.loading && <p className="text-secondary animate-pulse">loading...</p>}
                {tokenizerA.error && <p className="text-xs md:text-sm text-destructive">{tokenizerA.error}</p>}
              </div>

              {tokenizerA.tokens.length > 0 && (
                <TokenDisplay tokens={tokenizerA.tokens} tokenIds={tokenizerA.tokenIds} />
              )}
            </div>

            {compareMode && (
              <div className="space-y-6 animate-slide-in" style={{ animationDelay: '0.1s' }}>
                <div className="space-y-4">
                  <label className="text-secondary">model b</label>
                  <Input
                    value={modelB}
                    onChange={(e) => setModelB(e.target.value)}
                    placeholder="gpt2"
                    className="bg-card text-sm md:text-base transition-all"
                  />
                  {tokenizerB.loading && <p className="text-secondary animate-pulse">loading...</p>}
                  {tokenizerB.error && <p className="text-xs md:text-sm text-destructive">{tokenizerB.error}</p>}
                </div>

                {tokenizerB.tokens.length > 0 && (
                  <TokenDisplay tokens={tokenizerB.tokens} tokenIds={tokenizerB.tokenIds} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});
