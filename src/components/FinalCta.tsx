import { useRef } from 'react';
import { WHATSAPP } from '../data/brand';
import { useScrollProgress } from '../lib/hooks';
import { Cta } from './primitives';

/** Encerramento: uma única frase, em escala, e uma decisão. */
export function FinalCta() {
  const ref = useRef<HTMLElement>(null);
  const artRef = useRef<HTMLDivElement>(null);

  useScrollProgress(ref, (p) => {
    if (artRef.current) {
      artRef.current.style.setProperty('--close', p.toFixed(3));
    }
  });

  return (
    <section
      ref={ref}
      className="cf-surface-dark relative flex min-h-[86svh] items-center overflow-hidden"
    >
      <div
        ref={artRef}
        className="absolute inset-0 grid place-items-center"
        style={{ ['--close' as string]: '0' }}
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className="h-[130%] w-auto max-w-none opacity-[0.13]"
          aria-hidden="true"
          style={{
            transform: 'rotate(calc((var(--close) - 0.5) * 26deg)) scale(calc(0.9 + var(--close) * 0.22))',
          }}
          fill="none"
        >
          <path d="M 86.44 43.58 A 37 37 0 1 1 62.65 15.23" stroke="#2FA9A2" strokeWidth="0.22" />
          <path d="M 17.99 55.64 A 32.5 32.5 0 1 1 38.88 80.54" stroke="#F3F1EC" strokeWidth="0.16" />
          <circle cx="50" cy="50" r="26" stroke="#2FA9A2" strokeWidth="0.1" />
          <circle cx="50" cy="50" r="44" stroke="#2FA9A2" strokeWidth="0.1" />
        </svg>
      </div>

      <div className="cf-container relative w-full text-center">
        <p className="cf-chapter justify-center text-teal" data-reveal>
          <span>Próximo passo</span>
        </p>

        <h2 className="cf-display mx-auto mt-8 max-w-[18ch] text-[length:var(--text-5xl)] text-paper">
          <span className="cf-mask" data-reveal-mask>
            <span className="block">A sua ideia já</span>
          </span>
          <span className="cf-mask" data-reveal-mask style={{ ['--reveal-delay' as string]: '140ms' }}>
            <span className="block">existe. Falta a</span>
          </span>
          <span className="cf-mask" data-reveal-mask style={{ ['--reveal-delay' as string]: '280ms' }}>
            <span className="block text-teal">experiência.</span>
          </span>
        </h2>

        <p
          className="mx-auto mt-8 max-w-[38rem] text-[length:var(--text-lg)] leading-relaxed text-paper/65"
          data-reveal
          style={{ ['--reveal-delay' as string]: '420ms' }}
        >
          Conte o que a sua empresa faz e onde a conversa costuma travar. Respondemos com uma
          leitura do problema — não com um orçamento genérico.
        </p>

        <div
          className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row"
          data-reveal
          style={{ ['--reveal-delay' as string]: '520ms' }}
        >
          <Cta href={WHATSAPP.briefing} external>
            Conversar no WhatsApp
          </Cta>
          <Cta href="#contato" variant="outline">
            Enviar o briefing pelo formulário
          </Cta>
        </div>
      </div>
    </section>
  );
}
