import { memo, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getAnimationDelay, getTokenColor } from "@/lib/constants";

const SECTION_TITLE = "create";

const PIPELINE_STEPS = [
  {
    id: "model",
    title: "choose model",
    tooltip: "Select the core tokenization algorithm",
    example: "WordPiece, BPE",
    order: 1,
  },
  {
    id: "normalize",
    title: "normalize",
    tooltip: "Configure text cleaning and standardization",
    example: "lowercase, accents",
    order: 2,
  },
  {
    id: "pretokenize",
    title: "pre-tokenize",
    tooltip: "Define how to split text into chunks",
    example: "whitespace, punctuation",
    order: 3,
  },
  {
    id: "special",
    title: "special tokens",
    tooltip: "Add tokens with special meaning",
    example: "[CLS], [SEP], [UNK]",
    order: 4,
  },
  {
    id: "vocab",
    title: "vocabulary",
    tooltip: "Generate token vocabulary from text",
    example: "sample → tokens",
    order: 5,
  },
  {
    id: "test",
    title: "test",
    tooltip: "Try out your custom tokenizer",
    example: "tokenize text",
    order: 6,
  },
];

export const CreateSection = memo(() => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  return (
    <section className="section-wrapper">
      <div className="section-content space-y-16 md:space-y-24">
        <SectionHeader
          title={SECTION_TITLE}
          action={
            <Link to="/create">
              <Button variant="outline" size="sm">
                open creator
              </Button>
            </Link>
          }
        />

        {/* Step-by-step Preview */}
        <div className="space-y-8 md:space-y-12">
          <h3 className="text-xl md:text-3xl font-light opacity-60">
            build in 6 steps
          </h3>
          <TooltipProvider>
            <div className="relative">
              <div className="absolute top-4 left-0 right-0 h-0.5 bg-border hidden md:block" />

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8 relative">
                {PIPELINE_STEPS.map((step, idx) => (
                  <Tooltip key={step.id}>
                    <TooltipTrigger asChild>
                      <button
                        type="button"
                        className={`space-y-3 cursor-pointer transition-all duration-500 animate-slide-in ${activeStep === step.id
                            ? "scale-105"
                            : "hover:scale-105"
                          }`}
                        style={{ animationDelay: getAnimationDelay(idx, 0.1) }}
                        onMouseEnter={() => setActiveStep(step.id)}
                        onMouseLeave={() => setActiveStep(null)}
                      >
                        <div className="flex flex-col items-center">
                          <span
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-light transition-all duration-500 ${activeStep === step.id
                                ? "ring-2 ring-foreground ring-offset-2"
                                : ""
                              }`}
                            style={{ backgroundColor: getTokenColor(idx) }}
                          >
                            {step.order}
                          </span>
                        </div>
                        <div className="text-center">
                          <h4 className="text-sm md:text-base font-light">
                            {step.title}
                          </h4>
                          <code
                            className={`block text-xs bg-card p-2 rounded mt-2 transition-all duration-500 ${activeStep === step.id
                                ? "opacity-100 bg-accent"
                                : "opacity-60"
                              }`}
                          >
                            {step.example}
                          </code>
                        </div>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-foreground text-background"
                    >
                      <p className="text-xs max-w-[200px]">{step.tooltip}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </section>
  );
});
