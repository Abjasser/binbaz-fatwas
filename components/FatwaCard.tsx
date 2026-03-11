interface FatwaCardProps {
  title: string;
  question: string;
  answer: string;
  index: number;
}

/**
 * Magazine / editorial layout — full-bleed sections, no card wrapper.
 * Sections stack vertically with alternating backgrounds.
 */
export function FatwaCard({ title, question, answer, index }: FatwaCardProps) {
  return (
    <article dir="rtl">
      {/* ── Hero: large title on dark green ── */}
      <header className="bg-dark-green text-white">
        <div className="max-w-4xl mx-auto px-6 py-12 md:py-20 text-center">
          {/* Edition number */}
          <p className="text-gold/60 text-xs tracking-[0.2em] font-semibold mb-8 select-none">
            الفتوى رقم {index}
          </p>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white
                         leading-relaxed max-w-2xl mx-auto">
            {title}
          </h1>

          {/* Decorative rule */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="h-px w-16 bg-gold/30" />
            <div className="w-1.5 h-1.5 rounded-full bg-gold/50" />
            <div className="h-px w-16 bg-gold/30" />
          </div>
        </div>
      </header>

      {/* ── Question ── */}
      <section aria-labelledby="q-heading" className="bg-white py-10 md:py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 id="q-heading" className="text-xl font-bold text-brown whitespace-nowrap">
              السؤال
            </h2>
            <div className="h-px flex-1 bg-gold-light" />
          </div>

          <p className="text-gray-700 leading-loose text-base md:text-lg
                        text-justify whitespace-pre-line">
            {question}
          </p>
        </div>
      </section>

      {/* ── Answer ── */}
      <section aria-labelledby="a-heading" className="bg-parchment py-10 md:py-14 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <h2 id="a-heading" className="text-xl font-bold text-dark-green whitespace-nowrap">
              الجواب
            </h2>
            <div className="h-px flex-1 bg-dark-green/20" />
          </div>

          <p className="text-gray-800 leading-loose text-base md:text-lg
                        text-justify whitespace-pre-line">
            {answer}
          </p>
        </div>
      </section>
    </article>
  );
}
