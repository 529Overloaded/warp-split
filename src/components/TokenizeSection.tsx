import { useState, useEffect } from "react";
import { AutoTokenizer } from "@huggingface/transformers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { TokenDisplay } from "./TokenDisplay";

const DEFAULT_TEXT = "tokenizers process text efficiently";

export const TokenizeSection = () => {
  const [modelName, setModelName] = useState("bert-base-uncased");
  const [text, setText] = useState(DEFAULT_TEXT);
  const [tokens, setTokens] = useState<string[]>([]);
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tokenizeText = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const tokenizer = await AutoTokenizer.from_pretrained(modelName);
      const ids = tokenizer.encode(text);
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
  };

  useEffect(() => {
    tokenizeText();
  }, []);

  return (
    <section className="min-h-screen w-full flex items-center justify-center p-4 md:p-8">
      <div className="max-w-4xl w-full space-y-12 md:space-y-16">
        <h2 className="text-3xl md:text-6xl font-light">tokenize</h2>
        
        <div className="space-y-8 md:space-y-12">
          <div className="space-y-4">
            <label className="text-xs md:text-sm opacity-60">model</label>
            <div className="flex gap-3">
              <Input
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="bert-base-uncased"
                className="flex-1 bg-card text-sm md:text-base"
              />
              <Button 
                onClick={tokenizeText} 
                disabled={loading}
                className="bg-primary text-primary-foreground text-sm md:text-base"
              >
                {loading ? "..." : "go"}
              </Button>
            </div>
            {error && <p className="text-xs md:text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-4">
            <label className="text-xs md:text-sm opacity-60">text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="enter text"
              rows={3}
              className="resize-none bg-card text-sm md:text-base"
            />
          </div>

          {tokens.length > 0 && (
            <TokenDisplay tokens={tokens} tokenIds={tokenIds} />
          )}
        </div>
      </div>
    </section>
  );
};
