import { useEffect, useRef, useState, type RefObject } from 'react';
import { clamp, prefersReducedMotion, subscribe } from './motion';

/**
 * Revela elementos ao entrar na viewport, escrevendo `data-reveal="in"`.
 * Observa uma vez e desconecta — sem listeners residuais.
 */
export function useRevealRoot(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = root.querySelectorAll<HTMLElement>('[data-reveal], [data-reveal-mask]');
    if (prefersReducedMotion()) {
      targets.forEach((el) => {
        if (el.hasAttribute('data-reveal-mask')) el.setAttribute('data-reveal-mask', 'in');
        else el.setAttribute('data-reveal', 'in');
      });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (el.hasAttribute('data-reveal-mask')) el.setAttribute('data-reveal-mask', 'in');
          else el.setAttribute('data-reveal', 'in');
          io.unobserve(el);
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [rootRef]);
}

/**
 * Progresso de scroll de um elemento (0 → 1 enquanto ele atravessa a viewport).
 * Só calcula enquanto o elemento está visível; fora dela o rAF é liberado.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (p: number) => void,
) {
  const cb = useRef(onProgress);
  cb.current = onProgress;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let unsubscribe: (() => void) | null = null;

    const read = () => {
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = total > 0 ? clamp(-rect.top / total) : clamp(1 - rect.bottom / (rect.height || 1));
      cb.current(p);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !unsubscribe) {
          read();
          unsubscribe = subscribe(read);
        } else if (!entry.isIntersecting && unsubscribe) {
          unsubscribe();
          unsubscribe = null;
        }
      },
      { threshold: 0 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      unsubscribe?.();
    };
  }, [ref]);
}

/** true enquanto o elemento estiver (parcialmente) na viewport. */
export function useInView(ref: RefObject<HTMLElement | null>, rootMargin = '160px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, rootMargin]);
  return inView;
}

/** Distância percorrida no topo da página — usada pelo header. */
export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const read = () => setScrolled(window.scrollY > threshold);
    read();
    window.addEventListener('scroll', read, { passive: true });
    return () => window.removeEventListener('scroll', read);
  }, [threshold]);
  return scrolled;
}

/** Seção ativa na navegação, por observação das âncoras. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  useEffect(() => {
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5] },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(() => prefersReducedMotion());
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
