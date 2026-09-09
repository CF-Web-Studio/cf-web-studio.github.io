/**
 * Núcleo de movimento da CF — arquitetura ÚNICA (§17).
 *
 * Um só loop na página: o `gsap.ticker` conduz o Lenis (scroll suave) e também
 * os assinantes de `subscribe()`. Nunca um `requestAnimationFrame` por componente.
 * Sob `prefers-reduced-motion`, o Lenis não é instanciado (scroll nativo);
 * o ticker do GSAP continua servindo os assinantes e o ScrollTrigger.
 */

import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Subscriber = (time: number) => void;

const subscribers = new Set<Subscriber>();
let lenis: Lenis | null = null;
let tickerAttached = false;

function frame(time: number) {
  // gsap.ticker entrega o tempo em segundos
  lenis?.raf(time * 1000);
  for (const fn of subscribers) fn(time * 1000);
}

/** Liga o scroll suave + o ticker compartilhado. Idempotente. */
export function startMotion(): void {
  if (typeof window === 'undefined') return;

  if (!prefersReducedMotion() && !lenis) {
    lenis = new Lenis({
      duration: 1.05,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.15,
      anchors: { offset: -72 },
    });
    lenis.on('scroll', ScrollTrigger.update);
  }

  if (!tickerAttached) {
    gsap.ticker.add(frame);
    gsap.ticker.lagSmoothing(0);
    tickerAttached = true;
  }
  ScrollTrigger.refresh();
}

export function stopMotion(): void {
  if (tickerAttached) {
    gsap.ticker.remove(frame);
    tickerAttached = false;
  }
  lenis?.destroy();
  lenis = null;
}

export function getLenis(): Lenis | null {
  return lenis;
}

/** Rola até um elemento/seletor com o scroll suave quando ativo. */
export function scrollTo(target: string | HTMLElement, offset = -72): void {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.1 });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
}

/** Assina o ticker global. Devolve a função de cleanup. */
export function subscribe(fn: Subscriber): () => void {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}

export { gsap, ScrollTrigger };

export const clamp = (v: number, min = 0, max = 1) => (v < min ? min : v > max ? max : v);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Mapeia v de [inMin,inMax] para [0,1], com corte nas pontas. */
export const progress = (v: number, inMin: number, inMax: number) =>
  clamp((v - inMin) / (inMax - inMin || 1));

/** easeOutExpo — a curva de saída padrão da casa. */
export const easeOut = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const easeInOut = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || !window.matchMedia) return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Heurística de capacidade: define o orçamento de partículas/DPR. */
export function deviceTier(): 'low' | 'mid' | 'high' {
  if (typeof window === 'undefined') return 'mid';
  const cores = navigator.hardwareConcurrency ?? 4;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 768;
  if (narrow || coarse || cores <= 4) return 'low';
  if (cores <= 8) return 'mid';
  return 'high';
}
