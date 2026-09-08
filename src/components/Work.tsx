import { useState } from 'react';
import { TIERS } from '../data/content';
import { Arrow, Chapter } from './primitives';
import { TierPreview } from './TierPreview';

/**
 * PROJETOS — a prova.
 * O mesmo projeto conceitual construído nos três níveis de entrega,
 * para que a diferença entre eles seja vista, e não descrita.
 */
export function Work() {
  const [current, setCurrent] = useState(TIERS.length - 1);

  return (
    <section id="projetos" className="cf-surface-dark relative overflow-hidden">
      <div className="cf-container py-[var(--spacing-chapter)]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-[36rem]">
            <Chapter number="04" className="text-teal">
              Projetos
            </Chapter>
            <h2 className="cf-display mt-7 text-[length:var(--text-3xl)] text-paper" data-reveal>
              Um mesmo negócio.
              <span className="block text-paper/40">Três níveis de entrega, lado a lado.</span>
            </h2>
          </div>

          <p
            className="max-w-[26rem] text-[0.9375rem] leading-relaxed text-paper/65"
            data-reveal
            style={{ ['--reveal-delay' as string]: '90ms' }}
          >
            Comparar propostas de sites é difícil porque cada uma mostra um projeto diferente.
            Construímos uma pizzaria fictícia — a Forno Nobile — e a entregamos três vezes,
            uma em cada nível. A diferença deixa de ser discurso.
          </p>
        </div>

        {/* seletor */}
        <div className="mt-12 flex flex-wrap gap-2" role="tablist" aria-label="Níveis de entrega demonstrados">
          {TIERS.map((tier, i) => (
            <button
              key={tier.id}
              type="button"
              role="tab"
              id={`tab-${tier.id}`}
              aria-selected={current === i}
              aria-controls={`panel-${tier.id}`}
              onClick={() => setCurrent(i)}
              className={`min-h-[44px] rounded-[4px] border px-5 py-2.5 text-[0.875rem] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                current === i
                  ? 'border-teal bg-teal/10 text-teal'
                  : 'border-paper/15 text-paper/60 hover:border-paper/35 hover:text-paper'
              }`}
            >
              <span className="cf-mono mr-2 opacity-60">{tier.index}</span>
              {tier.name}
            </button>
          ))}
        </div>

        {TIERS.map((tier, i) => (
          <div
            key={tier.id}
            id={`panel-${tier.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${tier.id}`}
            hidden={current !== i}
            className="mt-8"
          >
            <div className="grid min-w-0 gap-8 lg:grid-cols-12 lg:gap-12">
              <div className="min-w-0 lg:col-span-7">
                <TierPreview tier={tier.id} />
              </div>

              <div className="flex flex-col lg:col-span-5">
                <p className="cf-mono text-teal">Forno Nobile · projeto conceitual</p>
                <h3 className="cf-display mt-4 text-[length:var(--text-2xl)] text-paper">
                  Nível {tier.name} — {tier.positioning.toLowerCase()}
                </h3>
                <p className="mt-4 text-[0.9375rem] leading-relaxed text-paper/70">
                  {tier.description}
                </p>

                <ul className="mt-7 grid gap-x-6 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-1">
                  {tier.scope.map((item) => (
                    <li key={item} className="flex items-baseline gap-2.5 text-[0.875rem] text-paper/70">
                      <span className="mt-1.5 block h-1 w-1 shrink-0 rounded-full bg-teal" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href={tier.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex min-h-[48px] w-fit items-center gap-2.5 rounded-[4px] bg-teal px-6 py-3.5 text-[0.9375rem] font-medium text-ink-900 transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-teal-bright"
                >
                  Abrir a demonstração
                  <Arrow className="h-3.5 w-3.5 transition-transform duration-[220ms] group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>

                <p className="mt-5 max-w-[24rem] text-[0.8125rem] leading-relaxed text-paper/40">
                  A Forno Nobile é uma marca criada pela CF para demonstração. Não é um cliente
                  real e nenhum resultado comercial é atribuído a ela.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
