import { useEffect, useRef } from 'react';
import { useReducedMotion, useScrollProgress } from '../lib/hooks';
import { clamp } from '../lib/motion';

type Props = {
  base: string; // caminho sem sufixo de largura/extensão
  alt: string;
  className?: string;
  /** amplitude do deslocamento vertical em px ao atravessar a viewport */
  drift?: number;
  /** escala inicial → final */
  scale?: [number, number];
  sizes?: string;
  widths?: number[];
  objectPosition?: string;
};

/**
 * Imagem com movimento conduzido pelo scroll (drift + escala) via o ticker único.
 * Estática sob prefers-reduced-motion. Decorativa (aria-hidden).
 */
export function ScrollMedia({
  base,
  alt,
  className = '',
  drift = 60,
  scale = [1, 1],
  sizes = '100vw',
  widths = [960, 1440, 1920],
  objectPosition = 'center',
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useScrollProgress(wrapRef, (p) => {
    if (reduced || !imgRef.current) return;
    const y = (p - 0.5) * drift;
    const s = scale[0] + (scale[1] - scale[0]) * clamp(p * 1.1);
    imgRef.current.style.transform = `translate3d(0, ${y}px, 0) scale(${s})`;
  });

  useEffect(() => {
    if (reduced && imgRef.current) imgRef.current.style.transform = 'none';
  }, [reduced]);

  const srcSet = (ext: string) => widths.map((w) => `${base}-${w}.${ext} ${w}w`).join(', ');

  return (
    <div ref={wrapRef} className={`overflow-hidden ${className}`} aria-hidden="true">
      <picture>
        <source type="image/webp" srcSet={srcSet('webp')} sizes={sizes} />
        <img
          ref={imgRef}
          src={`${base}-1440.jpg`}
          srcSet={srcSet('jpg')}
          sizes={sizes}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover"
          style={{ objectPosition, willChange: reduced ? undefined : 'transform' }}
        />
      </picture>
    </div>
  );
}
