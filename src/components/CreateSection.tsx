import { useState, memo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const SECTION_TITLE = "create";

const PIPELINE_STEPS = [
  {
    id: "vocabulary",
    title: "vocabulary",
    tooltip: "Define the set of tokens your model can recognize",
    example: "['hello', 'world', '##ing']",
    interactive: true
  },
  {
    id: "normalization",
    title: "normalization",
    tooltip: "Clean and standardize input text before tokenization",
    example: "lowercase, strip accents",
    interactive: true
  },
  {
    id: "pre-tokenization",
    title: "pre-tokenization",
    tooltip: "Split text into initial chunks using rules",
    example: "whitespace, punctuation",
    interactive: true
  },
  {
    id: "model",
    title: "model",
    tooltip: "Core algorithm that breaks chunks into final tokens",
    example: "BPE, WordPiece, Unigram",
    interactive: true
  },
  {
    id: "post-processing",
    title: "post-processing",
    tooltip: "Add special tokens required by your model",
    example: "[CLS] tokens [SEP]",
    interactive: true
  },
  {
    id: "decoding",
    title: "decoding",
    tooltip: "Convert token IDs back to readable text",
    example: "merge subwords, clean",
    interactive: true
  }
];

const TOKEN_COLORS = [
  "hsl(var(--token-1))",
  "hsl(var(--token-2))",
  "hsl(var(--token-3))",
  "hsl(var(--token-4))"
];

const TOKENIZER_TYPES = [
  {
    name: "BPE",
    description: "Byte Pair Encoding",
    example: "tokenize → token ##ize",
    usage: "GPT models",
    tokens: ["token", "##ize"]
  },
  {
    name: "WordPiece",
    description: "Subword tokenization",
    example: "tokenization → token ##ization",
    usage: "BERT models",
    tokens: ["token", "##ization"]
  },
  {
    name: "Unigram",
    description: "Probabilistic tokenization",
    example: "tokenize → token ize",
    usage: "T5, mBART",
    tokens: ["token", "ize"]
  },
  {
    name: "SentencePiece",
    description: "Language-agnostic",
    example: "tokenize → ▁token ize",
    usage: "XLNet, ALBERT",
    tokens: ["▁token", "ize"]
  }
];

export const CreateSection = memo(() => {
  const [activeStep, setActiveStep] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);

  return (
    <section className="section-wrapper">
      <div className="section-content space-y-16 md:space-y-24">
        <h2 className="heading-section">{SECTION_TITLE}</h2>
        
        {/* Pipeline Visualization */}
        <div className="space-y-8 md:space-y-12">
          <h3 className="text-xl md:text-3xl font-light opacity-60">pipeline</h3>
          <TooltipProvider>
            <div className="relative">
              {/* Connection Lines */}
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-border hidden md:block" />
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 relative">
                {PIPELINE_STEPS.map((step, idx) => (
                  <Tooltip key={step.id}>
                    <TooltipTrigger asChild>
                      <div
                        className={`space-y-3 cursor-pointer transition-all duration-500 animate-slide-in ${
                          activeStep === step.id ? 'scale-105' : 'hover:scale-105'
                        }`}
                        style={{ animationDelay: `${idx * 0.1}s` }}
                        onMouseEnter={() => setActiveStep(step.id)}
                        onMouseLeave={() => setActiveStep(null)}
                      >
                        <div className="flex flex-col items-center">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-light transition-all duration-500 ${
                              activeStep === step.id ? 'ring-2 ring-foreground ring-offset-2' : ''
                            }`}
                            style={{ backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length] }}
                          >
                            {idx + 1}
                          </span>
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm md:text-base font-light">{step.title}</h4>
                          <code className={`block text-xs bg-card p-2 rounded mt-2 transition-all duration-500 ${
                            activeStep === step.id ? 'opacity-100 bg-accent' : 'opacity-60'
                          }`}>
                            {step.example}
                          </code>
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent side="bottom" className="bg-foreground text-background">
                      <p className="text-xs max-w-[200px]">{step.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </TooltipProvider>
        </div>

        {/* Tokenizer Types Interactive */}
        <div className="space-y-8 md:space-y-12">
          <h3 className="text-xl md:text-3xl font-light opacity-60">types</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {TOKENIZER_TYPES.map((type, idx) => (
              <div
                key={type.name}
                className={`space-y-4 p-6 rounded border border-border transition-all duration-500 cursor-pointer animate-slide-in ${
                  activeType === type.name ? 'bg-accent border-foreground scale-105' : 'hover:bg-card hover:scale-105'
                }`}
                style={{ animationDelay: `${idx * 0.1}s` }}
                onMouseEnter={() => setActiveType(type.name)}
                onMouseLeave={() => setActiveType(null)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="text-lg md:text-xl font-light">{type.name}</h4>
                  <span className="text-xs text-secondary">{type.usage}</span>
                </div>
                <p className="text-xs md:text-sm opacity-60">{type.description}</p>
                <div className="space-y-2">
                  <p className="text-xs text-secondary">example</p>
                  <p className="text-sm md:text-base font-light">{type.example}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {type.tokens.map((token, tokenIdx) => (
                    <span
                      key={tokenIdx}
                      className="token-badge animate-slide-in"
                      style={{
                        backgroundColor: TOKEN_COLORS[tokenIdx % TOKEN_COLORS.length],
                        animationDelay: `${(activeType === type.name ? tokenIdx * 0.1 : 0)}s`
                      }}
                    >
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Example */}
        <div className="space-y-8 md:space-y-12">
          <h3 className="text-xl md:text-3xl font-light opacity-60">try it</h3>
          <div className="space-y-6 p-6 md:p-8 rounded border border-border bg-card animate-slide-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <p className="text-xs text-secondary">input</p>
                <p className="text-base md:text-lg font-light">tokenization</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs text-secondary">normalization</p>
                <p className="text-base md:text-lg font-light opacity-60">tokenization</p>
              </div>
              <div className="space-y-3">
                <p className="text-xs text-secondary">tokenized</p>
                <div className="flex flex-wrap gap-2">
                  {["token", "##ization"].map((token, idx) => (
                    <span
                      key={idx}
                      className="token-badge-lg animate-slide-in"
                      style={{
                        backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length],
                        animationDelay: `${idx * 0.2}s`
                      }}
                    >
                      {token}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});