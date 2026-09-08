import { useState } from 'react';
import { FAQ } from '../data/content';
import { Chapter } from './primitives';

export function Faq() {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section id="duvidas" className="cf-surface-paper relative">
      <div className="cf-container py-[var(--spacing-chapter)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <Chapter number="08">Dúvidas</Chapter>
            <h2 className="cf-display mt-7 text-[length:var(--text-3xl)] text-navy-deep" data-reveal>
              O que costumam
              <span className="block text-navy-deep/45">perguntar antes de começar.</span>
            </h2>
          </div>

          <div className="lg:col-span-8">
            <dl className="border-t border-navy-deep/12">
              {FAQ.map((item, i) => {
                const isOpen = open === item.id;
                return (
                  <div
                    key={item.id}
                    className="border-b border-navy-deep/12"
                    data-reveal
                    style={{ ['--reveal-delay' as string]: `${Math.min(i, 5) * 55}ms` }}
                  >
                    <dt>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : item.id)}
                        aria-expanded={isOpen}
                        aria-controls={`faq-${item.id}`}
                        className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-200 hover:text-teal-deep"
                      >
                        <span className="cf-display text-[length:var(--text-xl)] text-current">
                          {item.question}
                        </span>
                        <span
                          className={`relative mt-2 block h-3 w-3 shrink-0 transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                          aria-hidden="true"
                        >
                          <span className="absolute left-1/2 top-0 block h-3 w-px -translate-x-1/2 bg-current" />
                          <span className="absolute left-0 top-1/2 block h-px w-3 -translate-y-1/2 bg-current" />
                        </span>
                      </button>
                    </dt>
                    <dd id={`faq-${item.id}`} hidden={!isOpen} className="pb-6 pr-10">
                      <p className="max-w-[44rem] text-[0.9375rem] leading-relaxed text-navy-deep/75">
                        {item.answer}
                      </p>
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
