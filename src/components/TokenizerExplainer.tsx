import { useState, useEffect } from "react";
import { AutoTokenizer } from "@huggingface/transformers";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TOKENIZER_INFO = [
  {
    type: "BPE",
    desc: "Byte Pair Encoding merges frequent character pairs iteratively",
    example: "playing → play ##ing"
  },
  {
    type: "WordPiece",
    desc: "Splits unknown words into known subword units with ## prefix",
    example: "unhappiness → un ##hap ##pi ##ness"
  },
  {
    type: "Unigram",
    desc: "Probabilistic model selecting most likely subword combination",
    example: "tokenization → token ##ization"
  }
];

const DEFAULT_TEXT = "Tokenizers split text into subword units for language models to process efficiently.";
const TOKEN_COLORS = [
  "hsl(var(--token-1))",
  "hsl(var(--token-2))",
  "hsl(var(--token-3))",
  "hsl(var(--token-4))"
];

export const TokenizerExplainer = () => {
  const [modelName, setModelName] = useState("bert-base-uncased");
  const [text, setText] = useState(DEFAULT_TEXT);
  const [tokens, setTokens] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const tokenizeText = async () => {
    if (!text.trim()) return;
    
    setLoading(true);
    setError("");
    
    try {
      const tokenizer = await AutoTokenizer.from_pretrained(modelName);
      const result = tokenizer.encode(text);
      const tokensList = result.map((id: number) => tokenizer.decode([id]));
      setTokens(tokensList);
    } catch (err) {
      setError("Failed to load tokenizer. Check model name.");
      setTokens([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    tokenizeText();
  }, []);

  return (
    <div className="min-h-screen bg-background p-8 md:p-16">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="space-y-2">
          <h1 className="text-4xl font-light tracking-tight text-foreground">Tokenizers</h1>
          <p className="text-muted-foreground">How models split text into processable units</p>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
          {TOKENIZER_INFO.map(({ type, desc, example }) => (
            <Card key={type} className="p-6 space-y-3 bg-card border-border">
              <h2 className="text-lg font-medium text-foreground">{type}</h2>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              <code className="block text-xs bg-muted p-3 rounded font-mono">{example}</code>
            </Card>
          ))}
        </section>

        <section className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">HuggingFace Model</label>
            <div className="flex gap-3">
              <Input
                value={modelName}
                onChange={(e) => setModelName(e.target.value)}
                placeholder="bert-base-uncased"
                className="flex-1 bg-card border-border"
              />
              <Button onClick={tokenizeText} disabled={loading} className="bg-primary text-primary-foreground">
                {loading ? "Loading..." : "Tokenize"}
              </Button>
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-foreground">Your Text</label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to tokenize..."
              rows={4}
              className="resize-none bg-card border-border"
            />
          </div>

          {tokens.length > 0 && (
            <div className="space-y-3">
              <label className="text-sm font-medium text-foreground">Tokens ({tokens.length})</label>
              <div className="flex flex-wrap gap-2 p-6 bg-card border border-border rounded">
                {tokens.map((token, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded text-sm font-mono"
                    style={{ backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length] }}
                  >
                    {token}
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
