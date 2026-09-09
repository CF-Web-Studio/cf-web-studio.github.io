import { useEffect, useRef, type RefObject } from 'react';
import { clamp, lerp, subscribe } from '../lib/motion';

type Props = {
  progressRef: RefObject<number>;
  fadeRef: RefObject<number>;
  reduced: boolean;
  className?: string;
};

const SRC = '/media/cf/images/cf01-neural-core';

/**
 * CF01 — o núcleo neural como protagonista do hero (§42). Composição integrada:
 * o objeto ocupa o quadro e responde ao scroll (escala/opacidade/progresso) e,
 * em ponteiro fino, a uma profundidade sutil. Sem competir com a headline.
 */
export function NeuralCore({ progressRef, fadeRef, reduced, className = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const pointer = useRef({ x: 0, y: 0, tx: 0, ty: 0 });

  useEffect(() => {
    if (reduced) return;
    const wrap = wrapRef.current;
    const img = imgRef.current;
    if (!wrap || !img) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    const onMove = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.current.tx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) || 0;
      pointer.current.ty = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) || 0;
    };
    if (fine) window.addEventListener('pointermove', onMove, { passive: true });

    const unsub = subscribe(() => {
      const p = progressRef.current ?? 0;
      const fade = fadeRef.current ?? 1;

      // scroll: aproxima e sobe levemente
      const scale = 1 + p * 0.14;
      const rise = p * -26;

      // ponteiro: profundidade sutil, com inércia
      pointer.current.x = lerp(pointer.current.x, pointer.current.tx, 0.06);
      pointer.current.y = lerp(pointer.current.y, pointer.current.ty, 0.06);
      const px = pointer.current.x * 14;
      const py = pointer.current.y * 10;
      const rot = pointer.current.x * 2.4;

      img.style.transform = `translate3d(${px}px, ${rise + py}px, 0) scale(${scale}) rotate(${rot}deg)`;
      img.style.opacity = String(clamp(0.25 + fade * 0.9, 0, 1));
    });

    return () => {
      window.removeEventListener('pointermove', onMove);
      unsub();
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
          className="h-full w-full object-cover object-right"
          style={{
            opacity: reduced ? 0.6 : 0.9,
            willChange: reduced ? undefined : 'transform, opacity',
            transformOrigin: '70% 45%',
          }}
        />
      </picture>
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
