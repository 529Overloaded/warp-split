import { useState, useEffect, useRef, useCallback, memo } from "react";
import { AutoTokenizer } from "@huggingface/transformers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TokenDisplay } from "./TokenDisplay";

const DEFAULT_TEXT = "tokenizers process text efficiently";
const SECTION_TITLE = "tokenize";

export const TokenizeSection = memo(() => {
  const [modelName, setModelName] = useState("bert-base-uncased");
  const [text, setText] = useState(DEFAULT_TEXT);
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const tokenizerCache = useRef<Map<string, any>>(new Map());
  const debounceTimer = useRef<NodeJS.Timeout>();

  const tokenizeText = useCallback(async (model: string, inputText: string) => {
    if (!inputText.trim() || !model.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      let tokenizer = tokenizerCache.current.get(model);
      
      if (!tokenizer) {
        tokenizer = await AutoTokenizer.from_pretrained(model);
        tokenizerCache.current.set(model, tokenizer);
      }
      
      const ids = tokenizer.encode(inputText);
      const tokensList = ids.map((id: number) => tokenizer.decode([id]));
      setTokens(tokensList);
      setTokenIds(ids);
    } catch (err) {
      setError("model load failed");
      setTokens([]);
      setTokenIds([]);
    } finally {
      setLoading(false);
    }
  }, []);

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
    <section className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="max-w-6xl w-full space-y-12 md:space-y-16 animate-slide-in">
        <h2 className="text-3xl md:text-6xl font-light">{SECTION_TITLE}</h2>
        
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <label className="text-xs md:text-sm opacity-60">model</label>
            <Input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="bert-base-uncased"
              className="bg-card text-sm md:text-base transition-all"
            />
            {loading && <p className="text-xs md:text-sm opacity-60 animate-pulse">loading...</p>}
            {error && <p className="text-xs md:text-sm text-destructive animate-slide-in">{error}</p>}
          </div>

          <div className="space-y-4">
            <label className="text-xs md:text-sm opacity-60">text</label>
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
