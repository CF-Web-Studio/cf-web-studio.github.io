/**
 * Núcleo de movimento da CF.
 *
 * Um único rAF compartilhado por toda a página (nunca um loop por componente),
 * que se auto-suspende quando não há assinantes ou quando a aba está oculta.
 */

type Subscriber = (time: number) => void;

const subscribers = new Set<Subscriber>();
let frame = 0;

function tick(time: number) {
  frame = 0;
  for (const fn of subscribers) fn(time);
  if (subscribers.size > 0 && document.visibilityState === 'visible') {
    frame = requestAnimationFrame(tick);
  }
}

function start() {
  if (frame === 0 && subscribers.size > 0 && document.visibilityState === 'visible') {
    frame = requestAnimationFrame(tick);
  }
}

if (typeof document !== 'undefined') {
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') start();
    else if (frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
}

/** Assina o ticker global. Devolve a função de cleanup. */
export function subscribe(fn: Subscriber): () => void {
  subscribers.add(fn);
  start();
  return () => {
    subscribers.delete(fn);
    if (subscribers.size === 0 && frame) {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  };
}

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
