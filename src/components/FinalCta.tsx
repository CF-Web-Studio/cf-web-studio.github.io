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
        className="absolute inset-0 overflow-hidden"
        style={{ ['--close' as string]: '0' }}
        aria-hidden="true"
      >
        {/* CF03 — interface imersiva: a câmera se aproxima conforme o scroll fecha a página */}
        <img
          src="/media/cf/images/cf03-immersive-interface-1440.jpg"
          srcSet="/media/cf/images/cf03-immersive-interface-960.jpg 960w, /media/cf/images/cf03-immersive-interface-1440.jpg 1440w, /media/cf/images/cf03-immersive-interface-1920.jpg 1920w"
          sizes="100vw"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover opacity-[0.22]"
          style={{
            transform:
              'scale(calc(1.06 + var(--close) * 0.16)) translateY(calc((var(--close) - 0.5) * -3%))',
            transformOrigin: '60% 45%',
            willChange: 'transform',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 50% 46%, rgba(5,11,22,0.35) 0%, rgba(5,11,22,0.82) 78%, #050b16 100%)',
          }}
        />
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
