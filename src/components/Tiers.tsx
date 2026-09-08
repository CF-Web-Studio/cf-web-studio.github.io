import { TIERS } from '../data/content';
import { WHATSAPP } from '../data/brand';
import { Arrow, Chapter } from './primitives';

/**
 * NÍVEIS — a progressão de valor precisa ser visível na própria composição:
 * cada nível ocupa mais espaço, tem mais peso tipográfico e mais densidade
 * que o anterior. Não são três cartões iguais lado a lado.
 */
export function Tiers() {
  return (
    <section id="niveis" className="cf-surface-paper relative overflow-hidden">
      <div className="cf-blueprint absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="cf-container relative py-[var(--spacing-chapter)]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Chapter number="05">Níveis de entrega</Chapter>
            <h2 className="cf-display mt-7 text-[length:var(--text-3xl)] text-navy-deep" data-reveal>
              Três níveis, uma mesma exigência
              <span className="block text-navy-deep/45">de estrutura, texto e acabamento.</span>
            </h2>
          </div>
          <p
            className="text-[0.9375rem] leading-relaxed text-navy-deep/70 lg:col-span-5"
            data-reveal
            style={{ ['--reveal-delay' as string]: '90ms' }}
          >
            O que muda entre eles é a profundidade do conteúdo, a quantidade de recursos e o
            grau de direção de arte. O que não muda é o cuidado com performance,
            responsividade e acessibilidade.
          </p>
        </div>

        <ol className="mt-14 flex flex-col">
          {TIERS.map((tier, i) => {
            const emphasis = i === TIERS.length - 1;
            return (
              <li
                key={tier.id}
                className={`group relative border-t border-navy-deep/15 ${
                  emphasis ? 'border-b-2 border-b-navy-deep' : ''
                }`}
                data-reveal
                style={{ ['--reveal-delay' as string]: `${i * 90}ms` }}
              >
                <div
                  className="grid gap-6 lg:grid-cols-12 lg:gap-10"
                  style={{ paddingBlock: `${1.75 + i * 0.85}rem` }}
                >
                  <div className="lg:col-span-4">
                    <div className="flex items-baseline gap-4">
                      <span className="cf-mono text-teal-deep">{tier.index}</span>
                      <div>
                        <h3
                          className="cf-display text-navy-deep"
                          style={{ fontSize: `calc(var(--text-2xl) * ${1 + i * 0.18})` }}
                        >
                          {tier.name}
                        </h3>
                        <p className="cf-mono mt-2 text-navy-deep/45">{tier.positioning}</p>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-4">
                    <p className="max-w-[30rem] text-[0.9375rem] leading-relaxed text-navy-deep/75">
                      {tier.description}
                    </p>
                    <ul className="mt-5 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                      {tier.scope.map((item) => (
                        <li key={item} className="cf-mono text-navy-deep/50">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col items-start gap-3 lg:col-span-4 lg:items-end">
                    <a
                      href={WHATSAPP.plan(tier.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group/cta inline-flex min-h-[48px] items-center gap-2.5 rounded-[4px] px-6 py-3.5 text-[0.9375rem] font-medium transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 ${
                        emphasis
                          ? 'bg-navy-deep text-paper hover:bg-navy'
                          : 'border border-navy-deep/25 text-navy-deep hover:border-teal-deep hover:text-teal-deep'
                      }`}
                    >
                      Pedir proposta {tier.name}
                      <Arrow className="h-3.5 w-3.5 transition-transform duration-[220ms] group-hover/cta:translate-x-1 group-hover/cta:-translate-y-1" />
                    </a>

                    <a
                      href={tier.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cf-link cf-mono py-2 text-navy-deep/55 hover:text-teal-deep"
                    >
                      {tier.demoLabel}
                    </a>
                  </div>
                </div>

                {/* barra de progressão de valor */}
                <span
                  aria-hidden="true"
                  className="absolute bottom-0 left-0 h-px bg-teal-deep/70 transition-[width] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  style={{ width: `${28 + i * 36}%` }}
                />
              </li>
            );
          })}
        </ol>

        <p className="mt-8 max-w-[42rem] text-[0.875rem] leading-relaxed text-navy-deep/55">
          Não publicamos tabela de preços porque o escopo muda o valor. Depois de entender o
          projeto, enviamos uma proposta com escopo, prazo e investimento definidos — e sem
          cobrança por hora de reunião.
        </p>
      </div>
    </section>
  );
}
