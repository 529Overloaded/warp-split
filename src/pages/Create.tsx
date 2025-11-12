import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { Navigation } from "@/components/Navigation";
import { ModelStep } from "@/components/onboarding/ModelStep";
import { NormalizeStep } from "@/components/onboarding/NormalizeStep";
import { PretokenizeStep } from "@/components/onboarding/PretokenizeStep";
import { SpecialTokensStep } from "@/components/onboarding/SpecialTokensStep";
import { TestStep } from "@/components/onboarding/TestStep";
import { VocabStep } from "@/components/onboarding/VocabStep";
import { Button } from "@/components/ui/button";
import { useTokenizerBuilder } from "@/hooks/useTokenizerBuilder";
import { ONBOARDING_STEPS, type OnboardingStepId } from "@/lib/onboardingSteps";

export default function Create() {
    const [currentStepId, setCurrentStepId] = useState<OnboardingStepId>("model");
    const [isAnimating, setIsAnimating] = useState(false);

    const {
        config,
        testInput,
        result,
        isGeneratingVocab,
        setTestInput,
        updateConfig,
        tokenize,
        generateVocabFromText,
    } = useTokenizerBuilder();

    // Auto-tokenize when input changes
    useEffect(() => {
        if (testInput.trim() && config.vocab.length > 0) {
            tokenize(testInput);
        }
    }, [testInput, config, tokenize]);

    const currentStep = ONBOARDING_STEPS.find((s) => s.id === currentStepId);
    if (!currentStep) {
        throw new Error(`Step ${currentStepId} not found`);
    }
    const currentIndex = ONBOARDING_STEPS.findIndex(
        (s) => s.id === currentStepId,
    );
    const isFirstStep = currentIndex === 0;
    const isLastStep = currentIndex === ONBOARDING_STEPS.length - 1;
    const isTestStep = currentStepId === "test";
    const canProceedToTest = config.vocab.length > 0;

    const handleNext = () => {
        if (isAnimating) return;

        // Don't allow proceeding to test without vocab
        if (currentStepId === "vocab" && !canProceedToTest) {
            return;
        }

        if (!isLastStep) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStepId(ONBOARDING_STEPS[currentIndex + 1].id);
                setIsAnimating(false);
            }, 300);
        }
    };

    const handleBack = () => {
        if (isAnimating) return;

        if (!isFirstStep) {
            setIsAnimating(true);
            setTimeout(() => {
                setCurrentStepId(ONBOARDING_STEPS[currentIndex - 1].id);
                setIsAnimating(false);
            }, 300);
        }
    };

    const handleReset = () => {
        if (
            confirm(
                "Start over? This will clear your current tokenizer configuration.",
            )
        ) {
            updateConfig({ vocab: [] });
            setTestInput("");
            setCurrentStepId("model");
        }
    };

    const renderStep = () => {
        const stepProps = {
            key: currentStepId,
            className: isAnimating ? "animate-fade-out-down" : "animate-fade-in-up",
        };

        switch (currentStepId) {
            case "model":
                return (
                    <div {...stepProps}>
                        <ModelStep
                            value={config.type}
                            onChange={(v) => updateConfig({ type: v as "wordpiece" | "bpe" | "unigram" | "sentencepiece" })}
                        />
                    </div>
                );

            case "normalize":
                return (
                    <div {...stepProps}>
                        <NormalizeStep
                            lowercase={config.normalizer.lowercase}
                            stripAccents={config.normalizer.stripAccents}
                            onLowercaseChange={(v) =>
                                updateConfig({
                                    normalizer: { lowercase: v, stripAccents: config.normalizer.stripAccents },
                                })
                            }
                            onStripAccentsChange={(v) =>
                                updateConfig({
                                    normalizer: { lowercase: config.normalizer.lowercase, stripAccents: v },
                                })
                            }
                        />
                    </div>
                );

            case "pretokenize":
                return (
                    <div {...stepProps}>
                        <PretokenizeStep
                            value={config.preTokenizer}
                            onChange={(v) => updateConfig({ preTokenizer: v as "whitespace" | "bert" | "punctuation" })}
                        />
                    </div>
                );

            case "special":
                return (
                    <div {...stepProps}>
                        <SpecialTokensStep
                            tokens={config.specialTokens}
                            onChange={(key, value) =>
                                updateConfig({
                                    specialTokens: {
                                        ...config.specialTokens,
                                        [key]: value,
                                    },
                                })
                            }
                        />
                    </div>
                );

            case "vocab":
                return (
                    <div {...stepProps}>
                        <VocabStep
                            vocab={config.vocab}
                            isGenerating={isGeneratingVocab}
                            onGenerate={generateVocabFromText}
                            onClear={() => updateConfig({ vocab: [] })}
                        />
                    </div>
                );

            case "test":
                return (
                    <div {...stepProps}>
                        <TestStep
                            testInput={testInput}
                            result={result}
                            onInputChange={setTestInput}
                        />
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation onNavigate={() => { }} currentSection="create" />

            <div className="max-w-3xl mx-auto px-6 py-24 md:py-32">
                {/* Progress indicator */}
                <div className="mb-12 animate-slide-in-right">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <p className="text-xs text-secondary mb-1">
                                step {currentStep.order} of {ONBOARDING_STEPS.length}
                            </p>
                            <h1 className="text-3xl md:text-4xl font-light">
                                {currentStep.title}
                            </h1>
                            <p className="text-sm text-secondary mt-2">
                                {currentStep.description}
                            </p>
                        </div>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1 bg-border rounded-full overflow-hidden">
                        <div
                            className="h-full bg-foreground transition-all duration-500 ease-out"
                            style={{
                                width: `${(currentStep.order / ONBOARDING_STEPS.length) * 100}%`,
                            }}
                        />
                    </div>
                </div>

                {/* Step content */}
                <div className="space-y-6">
                    <div>{renderStep()}</div>

                    {/* Navigation */}
                    <div
                        className="flex items-center justify-between gap-4 animate-slide-in-right"
                        style={{ animationDelay: "0.2s" }}
                    >
                        <div className="flex gap-2">
                            {!isFirstStep && (
                                <Button
                                    variant="outline"
                                    onClick={handleBack}
                                    disabled={isAnimating}
                                    className="gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    back
                                </Button>
                            )}

                            {isTestStep && (
                                <Button
                                    variant="outline"
                                    onClick={handleReset}
                                    className="gap-2"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                    start over
                                </Button>
                            )}
                        </div>

                        {!isLastStep && (
                            <Button
                                onClick={handleNext}
                                disabled={
                                    isAnimating ||
                                    (currentStepId === "vocab" && !canProceedToTest)
                                }
                                className="gap-2"
                            >
                                {currentStepId === "vocab" && !canProceedToTest ? (
                                    "generate vocabulary first"
                                ) : (
                                    <>
                                        next
                                        <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </Button>
                        )}
                    </div>

                    {/* Hint for vocab step */}
                </div>
            </div>
        </div>
    );
}
