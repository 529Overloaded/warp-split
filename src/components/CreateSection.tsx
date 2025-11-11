import { memo } from "react";

const SECTION_TITLE = "create";

const STEPS = [
  {
    title: "vocabulary",
    desc: "define token set",
    code: "vocab = ['hello', 'world', '##ing']"
  },
  {
    title: "normalization",
    desc: "clean input text",
    code: "lowercase, strip accents, unicode"
  },
  {
    title: "pre-tokenization",
    desc: "split text initially",
    code: "whitespace, punctuation, regex"
  },
  {
    title: "model",
    desc: "tokenize algorithm",
    code: "BPE, WordPiece, Unigram"
  },
  {
    title: "post-processing",
    desc: "add special tokens",
    code: "[CLS] tokens [SEP]"
  },
  {
    title: "decoding",
    desc: "convert back to text",
    code: "merge subwords, clean output"
  }
];

const API_EXAMPLES = [
  {
    title: "load tokenizer",
    code: `import { AutoTokenizer } from '@huggingface/transformers';

const tokenizer = await AutoTokenizer
  .from_pretrained('bert-base-uncased');`
  },
  {
    title: "encode text",
    code: `const ids = tokenizer.encode('hello world');
// [101, 7592, 2088, 102]

const tokens = tokenizer.tokenize('hello world');
// ['hello', 'world']`
  },
  {
    title: "decode ids",
    code: `const text = tokenizer.decode(ids);
// "hello world"

const batch = tokenizer.batch_decode([[101, 7592]]);
// ["hello"]`
  },
  {
    title: "batch encode",
    code: `const { input_ids } = await tokenizer([
  'first sentence',
  'second sentence'
]);`
  }
];

const TOKEN_COLORS = [
  "hsl(var(--token-1))",
  "hsl(var(--token-2))",
  "hsl(var(--token-3))",
  "hsl(var(--token-4))"
];

export const CreateSection = memo(() => {
  return (
    <section className="section-wrapper">
      <div className="section-content space-y-12 md:space-y-24">
        <h2 className="heading-section">{SECTION_TITLE}</h2>
        
        <div className="space-y-12 md:space-y-20">
          <div>
            <h3 className="text-xl md:text-3xl font-light mb-8 md:mb-12">pipeline</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
              {STEPS.map(({ title, desc, code }, idx) => (
                <div 
                  key={title} 
                  className="space-y-3 animate-slide-in"
                  style={{ animationDelay: `${idx * 0.05}s` }}
                >
                  <div className="flex items-center gap-3">
                    <span 
                      className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-light"
                      style={{ backgroundColor: TOKEN_COLORS[idx % TOKEN_COLORS.length] }}
                    >
                      {idx + 1}
                    </span>
                    <h4 className="text-base md:text-lg font-light">{title}</h4>
                  </div>
                  <p className="text-secondary">{desc}</p>
                  <code className="block text-xs bg-card p-3 rounded font-mono">{code}</code>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-3xl font-light mb-8 md:mb-12">api</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
              {API_EXAMPLES.map(({ title, code }, idx) => (
                <div 
                  key={title} 
                  className="space-y-4 animate-slide-in"
                  style={{ animationDelay: `${idx * 0.08}s` }}
                >
                  <h4 className="text-base md:text-lg font-light">{title}</h4>
                  <pre className="text-xs bg-card p-4 rounded font-mono overflow-x-auto">{code}</pre>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});
