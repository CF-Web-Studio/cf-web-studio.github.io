import { useState } from 'react';
import { CAPABILITIES } from '../data/content';
import { Chapter } from './primitives';

export function Capabilities() {
  const [open, setOpen] = useState<string | null>(CAPABILITIES[0].id);

  return (
    <section id="capacidades" className="cf-surface-paper relative">
      <div className="cf-container border-t border-navy-deep/12 py-[var(--spacing-chapter)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Chapter number="02">Capacidades</Chapter>
              <h2 className="cf-display mt-7 text-[length:var(--text-3xl)] text-navy-deep" data-reveal>
                Não é um catálogo de serviços.
                <span className="block text-navy-deep/45">É uma competência só, aplicada em graus diferentes.</span>
              </h2>
              <p
                className="mt-6 max-w-[26rem] text-[0.9375rem] leading-relaxed text-navy-deep/70"
                data-reveal
                style={{ ['--reveal-delay' as string]: '110ms' }}
              >
                Tudo começa no mesmo lugar — entender o negócio e organizar o argumento.
                O que muda de projeto para projeto é a profundidade e o formato da entrega.
              </p>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ul className="border-t border-navy-deep/12">
              {CAPABILITIES.map((cap, i) => {
                const isOpen = open === cap.id;
                return (
                  <li
                    key={cap.id}
                    className="border-b border-navy-deep/12"
                    data-reveal
                    style={{ ['--reveal-delay' as string]: `${Math.min(i, 5) * 60}ms` }}
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : cap.id)}
                        aria-expanded={isOpen}
                        aria-controls={`cap-${cap.id}`}
                        className="group grid w-full grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-6 text-left transition-colors duration-300 hover:text-teal-deep sm:grid-cols-[4rem_1fr_auto]"
                      >
                        <span
                          className={`cf-mono transition-colors duration-300 ${
                            isOpen ? 'text-teal-deep' : 'text-navy-deep/35'
                          }`}
                        >
                          {cap.index}
                        </span>
                        <span>
                          <span className="cf-display block text-[length:var(--text-2xl)] text-current">
                            {cap.title}
                          </span>
                          <span className="mt-1.5 block text-[0.9375rem] text-navy-deep/55">
                            {cap.summary}
                          </span>
                        </span>
                        <span
                          className={`relative mt-2 block h-3 w-3 shrink-0 self-center transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isOpen ? 'rotate-45' : ''
                          }`}
                          aria-hidden="true"
                        >
                          <span className="absolute left-1/2 top-0 block h-3 w-px -translate-x-1/2 bg-current" />
                          <span className="absolute top-1/2 left-0 block h-px w-3 -translate-y-1/2 bg-current" />
                        </span>
                      </button>
                    </h3>

                    <div
                      id={`cap-${cap.id}`}
                      hidden={!isOpen}
                      className="grid gap-6 pb-8 pl-[3rem] pr-2 sm:grid-cols-[1fr_auto] sm:pl-[4rem]"
                    >
                      <p className="max-w-[38rem] text-[0.9375rem] leading-relaxed text-navy-deep/75">
                        {cap.detail}
                      </p>
                      <ul className="flex flex-col gap-2 sm:items-end">
                        {cap.facets.map((facet) => (
                          <li key={facet} className="cf-mono text-navy-deep/50">
                            {facet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
