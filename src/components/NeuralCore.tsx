import { useEffect, useRef, useState, type RefObject } from 'react';
import { clamp, deviceTier, subscribe } from '../lib/motion';
import { createNucleo, type NucleoHandle } from '../lib/nucleo';

type Props = {
  progressRef: RefObject<number>;
  fadeRef: RefObject<number>;
  reduced: boolean;
  className?: string;
};

const SRC = '/media/cf/images/cf01-neural-core';

/**
 * CF01 — o núcleo do hero.
 *
 * Era uma imagem CGI estática com translate/scale no scroll. Agora o objeto é
 * construído em WebGL (`src/lib/nucleo.ts`, sem dependência nova) e responde de
 * verdade: ponteiro move a câmera com inércia, scroll aproxima, e há respiração
 * própria quando ninguém toca em nada.
 *
 * A imagem continua no DOM como fundo e como fallback: se não houver WebGL,
 * ou sob `prefers-reduced-motion`, ela é a composição — não sobra buraco.
 */
export function NeuralCore({ progressRef, fadeRef, reduced, className = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    let nucleo: NucleoHandle | null = null;
    try {
      nucleo = createNucleo(canvas, { tier: deviceTier() });
    } catch {
      nucleo = null;
    }
    if (!nucleo) return; // fallback: a imagem já está no DOM
    setLive(true);

    const fine = window.matchMedia('(pointer: fine)').matches;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      nucleo?.setPointer(
        ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) || 0,
        ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) || 0,
      );
    };
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });

    const onResize = () => nucleo?.resize();
    window.addEventListener('resize', onResize);

    // Perda de contexto acontece de verdade (troca de GPU, aba dormindo,
    // pressão de memória). Voltamos para a imagem em vez de deixar um canvas
    // vazio no lugar do objeto.
    // `lost` precisa ser lido pelo RAF: só trocar o estado do React não basta,
    // porque o próprio RAF escreve `style.opacity` inline e o inline vence o
    // style renderizado — o hero ficava vazio em vez de voltar para a imagem.
    let lost = false;
    const onLost = (e: Event) => {
      e.preventDefault();
      lost = true;
      setLive(false);
      canvas.style.opacity = '0';
      if (imgRef.current) imgRef.current.style.opacity = '0.9';
    };
    canvas.addEventListener('webglcontextlost', onLost);

    // Pausa fora da viewport e com a aba oculta (§32): nada de queimar GPU
    // desenhando um objeto que ninguém está vendo.
    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), {
      rootMargin: '80px',
    });
    io.observe(wrap);
    const onVis = () => {
      if (document.hidden) visible = false;
    };
    document.addEventListener('visibilitychange', onVis);

    // Um único RAF na página: entramos no loop existente (CLAUDE.md § motion).
    const unsub = subscribe((timeMs) => {
      if (lost || !visible || document.hidden) return;
      const p = progressRef.current ?? 0;
      const fade = fadeRef.current ?? 1;
      nucleo?.setProgress(p);
      nucleo?.render(timeMs);
      canvas.style.opacity = String(clamp(fade, 0, 1));
      if (imgRef.current) imgRef.current.style.opacity = String(clamp(fade * 0.12, 0, 1));
    });

    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('resize', onResize);
      canvas.removeEventListener('webglcontextlost', onLost);
      document.removeEventListener('visibilitychange', onVis);
      io.disconnect();
      unsub();
      nucleo?.destroy();
    };
  }, [progressRef, fadeRef, reduced]);

  return (
    <div ref={wrapRef} className={className} aria-hidden="true">
      <picture>
        <source
          type="image/webp"
          srcSet={`${SRC}-960.webp 960w, ${SRC}-1440.webp 1440w, ${SRC}-1920.webp 1920w`}
          sizes="(min-width: 1024px) 62vw, 100vw"
        />
        <img
          ref={imgRef}
          src={`${SRC}-1440.jpg`}
          srcSet={`${SRC}-960.jpg 960w, ${SRC}-1440.jpg 1440w, ${SRC}-1920.jpg 1920w`}
          sizes="(min-width: 1024px) 62vw, 100vw"
          alt=""
          decoding="async"
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-right"
          style={{
            // com o núcleo vivo a foto vira só atmosfera — duas esferas sobrepostas
            // liam como ruído. Sem WebGL ela volta a ser a composição inteira.
            opacity: reduced ? 0.6 : live ? 0.12 : 0.9,
            transformOrigin: '70% 45%',
          }}
        />
      </picture>

      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full"
        style={{ opacity: 0, transition: 'opacity 600ms var(--ease-cf)' }}
      />

      {/* fundido com o fundo do hero para não virar "imagem colada" */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(80% 70% at 68% 42%, rgba(5,11,22,0) 0%, rgba(5,11,22,0.35) 62%, rgba(5,11,22,0.92) 100%), linear-gradient(90deg, #050b16 0%, rgba(5,11,22,0.2) 34%, rgba(5,11,22,0) 60%)',
        }}
      />
    </div>
  );
}
