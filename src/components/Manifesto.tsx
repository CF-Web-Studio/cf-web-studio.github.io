import { Chapter } from './primitives';

const PRINCIPLES = [
  {
    k: 'Clareza',
    v: 'Um site não precisa impressionar em três segundos. Precisa ser entendido em três segundos e continuar interessante por mais três minutos.',
  },
  {
    k: 'Ritmo',
    v: 'Sequência de blocos não é narrativa. Existe tensão, pausa e resolução — e o silêncio entre as seções faz tanto trabalho quanto o conteúdo delas.',
  },
  {
    k: 'Peso',
    v: 'Sofisticação que custa três segundos de carregamento não é sofisticação. Cada efeito precisa justificar o que pesa.',
  },
];

export function Manifesto() {
  return (
    <section id="manifesto" className="cf-surface-paper relative overflow-hidden">
      <div className="cf-blueprint absolute inset-0 opacity-60" aria-hidden="true" />

      <div className="cf-container relative py-[var(--spacing-chapter)]">
        <Chapter number="01">Manifesto</Chapter>

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <h2 className="cf-display text-[length:var(--text-4xl)] text-navy-deep">
              <span className="cf-mask" data-reveal-mask>
                <span className="block">A maior parte dos sites descreve a empresa.</span>
              </span>
              <span className="cf-mask" data-reveal-mask style={{ ['--reveal-delay' as string]: '150ms' }}>
                <span className="block text-teal-deep">Poucos demonstram o que ela faz.</span>
              </span>
            </h2>

            <div className="mt-10 max-w-[38rem] space-y-6 text-[length:var(--text-lg)] leading-relaxed text-navy-deep/80">
              <p data-reveal>
                A CF Web Studio nasceu de uma observação simples: empresas competentes costumam
                ter sites que não passam essa impressão. O trabalho é bom, o atendimento é bom,
                a entrega é boa — e a primeira coisa que o cliente vê não conta nada disso.
              </p>
              <p data-reveal style={{ ['--reveal-delay' as string]: '90ms' }}>
                Nosso ofício é fechar essa distância. Tratamos o site como uma peça de argumentação:
                ele precisa organizar o que a empresa tem a dizer, conduzir quem lê e terminar em
                uma ação clara. Design, texto e código servem a isso — nunca ao contrário.
              </p>
              <p data-reveal style={{ ['--reveal-delay' as string]: '180ms' }}>
                É por isso que esta página é construída como construímos as dos nossos clientes:
                o objeto que se forma na abertura não veio de um banco de imagens, ele é gerado em
                código, aqui mesmo. Se prometemos experiências digitais, o mínimo é que a nossa
                própria seja uma.
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-4">
            <dl className="divide-y divide-navy-deep/12 border-y border-navy-deep/12">
              {PRINCIPLES.map((item, i) => (
                <div
                  key={item.k}
                  className="grid grid-cols-[auto_1fr] gap-x-6 py-7"
                  data-reveal
                  style={{ ['--reveal-delay' as string]: `${i * 110}ms` }}
                >
                  <dt className="cf-mono pt-1.5 text-teal-deep">{String(i + 1).padStart(2, '0')}</dt>
                  <div>
                    <dt className="cf-display text-xl text-navy-deep">{item.k}</dt>
                    <dd className="mt-2.5 text-[0.9375rem] leading-relaxed text-navy-deep/70">
                      {item.v}
                    </dd>
                  </div>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}
