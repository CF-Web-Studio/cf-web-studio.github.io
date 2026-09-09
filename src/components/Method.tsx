import { useRef, useState } from 'react';
import { METHOD } from '../data/content';
import { useReducedMotion, useScrollProgress } from '../lib/hooks';
import { clamp } from '../lib/motion';
import { Blueprint } from './Blueprint';
import { Chapter } from './primitives';

/**
 * MÉTODO — o segundo momento cinematográfico.
 * O desenho técnico é construído linha a linha enquanto o leitor desce:
 * ideia → direção → design → engenharia → experiência → QA → entrega.
 *
 * No desktop, as sete etapas ficam listadas ao lado do desenho.
 * No mobile, o desenho vem primeiro e apenas a etapa corrente é exibida,
 * com uma régua numérica de progresso — composição própria, não a versão
 * espremida da de cima.
 */
export function Method() {
  const sectionRef = useRef<HTMLElement>(null);
  const stageHostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();

  // Cada etapa recebe sua própria janela de scroll (entrada -> estável -> leitura -> transição)
  // e a última etapa (Entrega) mantém um hold dedicado no final, para que nada seja cortado
  // ou avance antes do tempo de leitura.
  const PER_STEP_VH = 60;
  const HEAD_START = 0.45; // a etapa 01 já nasce parcialmente desenhada
  const HOLD_VH = 80; // hold da Entrega após 100% do desenho, antes da próxima seção assumir
  const TOTAL_SCROLL_VH = METHOD.length * PER_STEP_VH + HOLD_VH;

  useScrollProgress(sectionRef, (p) => {
    // com movimento reduzido o desenho já nasce completo: o scroll não escreve nada
    if (reduced) return;
    const host = stageHostRef.current;
    if (!host) return;

    const scrolledVh = p * TOTAL_SCROLL_VH;
    const t = clamp(scrolledVh / PER_STEP_VH + HEAD_START, 0, METHOD.length);
    for (let i = 0; i < METHOD.length; i++) {
      host.style.setProperty(`--s${i + 1}`, clamp(t - i).toFixed(3));
    }
    const next = Math.min(METHOD.length - 1, Math.floor(t));
    setActive((prev) => (prev === next ? prev : next));
  });

  const stageVars = Object.fromEntries(
    METHOD.map((_, i) => [`--s${i + 1}`, reduced ? '1' : i === 0 ? '0.45' : '0']),
  ) as Record<string, string>;

  const current = METHOD[active];

  return (
    <section
      ref={sectionRef}
      id="metodo"
      className={`cf-surface-dark relative ${reduced ? '' : 'min-h-[600svh]'}`}
    >
      <div
        ref={stageHostRef}
        style={stageVars}
        className={
          reduced
            ? 'py-[var(--spacing-chapter)]'
            : 'sticky top-0 flex min-h-[100svh] items-center overflow-hidden py-20 lg:py-24'
        }
      >
        <div className="cf-blueprint-dark absolute inset-0 opacity-40" aria-hidden="true" />

        <div className="cf-container relative w-full">
          <Chapter number="03" className="text-teal">
            Método
          </Chapter>

          <div className={`mt-7 grid gap-8 lg:mt-8 lg:grid-cols-12 lg:gap-14 ${reduced ? 'lg:items-start' : 'lg:items-center'}`}>
            {/* desenho técnico */}
            <div className="lg:col-span-6">
              <div className="relative aspect-[3/2] w-full lg:aspect-[4/3]">
                <Blueprint className="h-full w-full" />
              </div>
            </div>

            <div className="lg:col-span-6">
              <h2 className="cf-display text-[length:var(--text-2xl)] text-paper lg:text-[length:var(--text-3xl)]">
                Sete etapas.
                <span className="block text-paper/40">Nenhuma delas é opcional.</span>
              </h2>

              {/* ---- mobile: régua + etapa corrente ---- */}
              <div className={reduced ? 'hidden' : 'mt-6 lg:hidden'}>
                <ol className="flex items-center gap-2" aria-label="Progresso das etapas">
                  {METHOD.map((stage, i) => (
                    <li
                      key={stage.index}
                      aria-current={i === active ? 'step' : undefined}
                      className={`cf-mono flex-1 border-t-2 pt-2 transition-colors duration-500 ${
                        i <= active ? 'border-teal text-teal' : 'border-paper/15 text-paper/25'
                      }`}
                    >
                      {stage.index}
                    </li>
                  ))}
                </ol>

                <div className="mt-6 min-h-[13rem]">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <h3 className="cf-display text-[length:var(--text-xl)] text-paper">
                      {current.title}
                    </h3>
                    <span className="cf-mono text-teal">{current.role}</span>
                  </div>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/70">
                    {current.description}
                  </p>
                  <p className="mt-3 flex items-baseline gap-2 text-[0.8125rem] text-teal/85">
                    <span className="cf-mono shrink-0 text-teal/60">saída</span>
                    <span>{current.output}</span>
                  </p>
                </div>
              </div>

              {/* ---- desktop (e reduced-motion): as sete etapas listadas ---- */}
              <ol className={`mt-8 border-t border-paper/10 ${reduced ? '' : 'hidden lg:block'}`}>
                {METHOD.map((stage, i) => {
                  const isActive = reduced || i === active;
                  const isPast = !reduced && i < active;
                  return (
                    <li key={stage.index} className="border-b border-paper/10">
                      <div
                        className="grid grid-cols-[2.5rem_1fr] gap-x-4 py-4 transition-opacity duration-500 sm:grid-cols-[3.5rem_1fr]"
                        style={{ opacity: isActive ? 1 : isPast ? 0.42 : 0.22 }}
                      >
                        <span
                          className={`cf-mono pt-1 transition-colors duration-500 ${
                            isActive ? 'text-teal' : 'text-paper/50'
                          }`}
                        >
                          {stage.index}
                        </span>
                        <div>
                          <div className="flex flex-wrap items-baseline gap-x-3">
                            <h3 className="cf-display text-xl text-paper">{stage.title}</h3>
                            <span className="cf-mono text-paper/40">{stage.role}</span>
                          </div>

                          <div
                            className="grid transition-[grid-template-rows,opacity] duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                            style={{
                              gridTemplateRows: isActive ? '1fr' : '0fr',
                              opacity: isActive ? 1 : 0,
                            }}
                          >
                            <div className="overflow-hidden">
                              <p className="pt-2 text-[0.9375rem] leading-relaxed text-paper/70">
                                {stage.description}
                              </p>
                              <p className="mt-2.5 flex items-baseline gap-2 text-[0.8125rem] text-teal/85">
                                <span className="cf-mono shrink-0 text-teal/60">saída</span>
                                <span>{stage.output}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
