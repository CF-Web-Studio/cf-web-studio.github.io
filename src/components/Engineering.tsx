import { ENGINEERING } from '../data/content';
import { Chapter } from './primitives';

export function Engineering() {
  return (
    <section id="engenharia" className="cf-surface-dark relative overflow-hidden">
      <div className="cf-container py-[var(--spacing-chapter)]">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Chapter number="06" className="text-teal">
                Engenharia
              </Chapter>
              <h2 className="cf-display mt-7 text-[length:var(--text-3xl)] text-paper" data-reveal>
                Site premium
                <span className="block text-paper/40">não é site pesado.</span>
              </h2>
              <p
                className="mt-6 max-w-[26rem] text-[0.9375rem] leading-relaxed text-paper/65"
                data-reveal
                style={{ ['--reveal-delay' as string]: '90ms' }}
              >
                A parte técnica não é um bônus escondido no fim da proposta: ela é o que
                permite que a parte visual funcione no celular de quem tem pressa e sinal ruim.
              </p>

              <dl
                className="mt-9 grid grid-cols-2 gap-px overflow-hidden rounded-[4px] bg-paper/10 sm:max-w-[26rem]"
                data-reveal
                style={{ ['--reveal-delay' as string]: '180ms' }}
              >
                {[
                  ['Dependências no runtime', 'React e nada mais'],
                  ['Gráfico do topo', 'gerado em código'],
                  ['Loop de animação', 'um só, compartilhado'],
                  ['Fora da viewport', 'render suspenso'],
                ].map(([k, v]) => (
                  <div key={k} className="bg-ink-900 p-4">
                    <dt className="cf-mono text-paper/40">{k}</dt>
                    <dd className="mt-2 text-[0.875rem] text-teal">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {ENGINEERING.map((item, i) => (
              <li
                key={item.index}
                className="border-t border-paper/10 py-7 last:border-b"
                data-reveal
                style={{ ['--reveal-delay' as string]: `${Math.min(i, 4) * 70}ms` }}
              >
                <div className="grid grid-cols-[2.5rem_1fr] gap-x-4 sm:grid-cols-[3.5rem_1fr]">
                  <span className="cf-mono pt-1.5 text-teal/70">{item.index}</span>
                  <div>
                    <h3 className="cf-display text-xl text-paper">{item.title}</h3>
                    <p className="mt-2.5 max-w-[42rem] text-[0.9375rem] leading-relaxed text-paper/65">
                      {item.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
