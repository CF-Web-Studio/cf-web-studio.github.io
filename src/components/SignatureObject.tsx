import { useEffect, useRef } from 'react';
import { Nucleo, nucleoBudget } from '../lib/nucleo';
import { clamp, deviceTier, subscribe } from '../lib/motion';
import { useInView } from '../lib/hooks';

interface Props {
  /** Progresso narrativo externo (0 → 1). Vem do scroll da seção. */
  progressRef: React.RefObject<number>;
  /** Opacidade externa (0 → 1). */
  fadeRef: React.RefObject<number>;
  reduced: boolean;
  className?: string;
}

/**
 * Camada de render do Núcleo CF.
 * Existe um único canvas na página e ele pausa ao sair da viewport.
 */
export function SignatureObject({ progressRef, fadeRef, reduced, className = '' }: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nucleoRef = useRef<Nucleo | null>(null);
  const startRef = useRef(0);
  const inView = useInView(wrapRef, '120px');

  // --- construção + dimensionamento (uma vez) --------------------------------
  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;

    const tier = deviceTier();
    // em reduced-motion é uma pintura só: dá para usar mais partículas sem custo contínuo
    const nucleo = new Nucleo(canvas, nucleoBudget(reduced ? 'mid' : tier));
    nucleoRef.current = nucleo;
    startRef.current = performance.now();

    const maxDpr = tier === 'high' ? 2 : 1.5;
    const fit = () => {
      const rect = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      nucleo.resize(Math.max(1, rect.width), Math.max(1, rect.height), dpr);
      // em modo estático a única pintura acontece aqui
      if (reduced) nucleo.render(0, 1, fadeRef.current ?? 1, false);
    };

    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(wrap);

    return () => {
      ro.disconnect();
      nucleoRef.current = null;
    };
  }, [reduced, fadeRef]);

  // --- loop de render (só enquanto visível e com movimento permitido) --------
  useEffect(() => {
    if (reduced || !inView) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    const fine = window.matchMedia('(pointer: fine)').matches;
    const onPointer = (e: PointerEvent) => {
      const nucleo = nucleoRef.current;
      if (!nucleo) return;
      const rect = wrap.getBoundingClientRect();
      nucleo.setPointer(
        clamp((e.clientX - rect.left) / rect.width, 0, 1) * 2 - 1,
        clamp((e.clientY - rect.top) / rect.height, 0, 1) * 2 - 1,
      );
    };
    if (fine) window.addEventListener('pointermove', onPointer, { passive: true });

    const stop = subscribe((time) => {
      const nucleo = nucleoRef.current;
      if (!nucleo) return;
      // abertura: a ideia se organiza sozinha nos primeiros 2,2 s
      const intro = clamp((time - startRef.current) / 2200);
      const scrolled = progressRef.current ?? 0;
      nucleo.render(time, clamp(intro * 0.58 + scrolled * 0.42), fadeRef.current ?? 1, true);
    });

    return () => {
      stop();
      if (fine) window.removeEventListener('pointermove', onPointer);
    };
  }, [inView, reduced, progressRef, fadeRef]);

  return (
    <div ref={wrapRef} className={`pointer-events-none ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
