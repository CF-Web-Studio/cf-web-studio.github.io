import { useRef, useState } from 'react';
import { BRAND, WHATSAPP } from '../data/brand';
import { useReducedMotion, useScrollProgress } from '../lib/hooks';
import { clamp } from '../lib/motion';
import { Cta } from './primitives';
import { SignatureObject } from './SignatureObject';

const STATES = ['Ideia', 'Traço', 'Estrutura', 'Matéria'];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const progressRef = useRef(0);
  const fadeRef = useRef(1);
  const railRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [stage, setStage] = useState(reduced ? 3 : 0);

  useScrollProgress(sectionRef, (p) => {
    progressRef.current = p;
    fadeRef.current = 1 - clamp((p - 0.52) / 0.38);

    // o rótulo de estado acompanha o objeto — informação, não enfeite
    const resolved = clamp(0.58 + p * 0.42);
    const next = resolved < 0.3 ? 0 : resolved < 0.55 ? 1 : resolved < 0.82 ? 2 : 3;
    setStage((prev) => (prev === next ? prev : next));

    if (railRef.current) railRef.current.style.setProperty('--rail', String(resolved));
    if (hintRef.current) hintRef.current.style.opacity = String(1 - clamp(p / 0.18));
  });

  return (
    <section
      ref={sectionRef}
      id="topo"
      className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden pt-[84px] pb-8"
    >
      {/* fundo: profundidade em camadas, sem glow gratuito */}
      <div
        className="absolute inset-0 -z-20"
        style={{
          background:
            'radial-gradient(120% 90% at 68% 42%, #0b1a30 0%, #070f1e 46%, #050b16 100%)',
        }}
      />
      <div className="cf-blueprint-dark absolute inset-0 -z-20 opacity-[0.5]" />
      <div
        className="absolute inset-0 -z-20"
        style={{ background: 'linear-gradient(to bottom, transparent 55%, #050b16 100%)' }}
      />

      {/* o objeto assinatura */}
      <SignatureObject
        progressRef={progressRef}
        fadeRef={fadeRef}
        reduced={reduced}
        className="absolute inset-y-0 right-0 -z-10 h-full w-full opacity-[0.62] lg:left-auto lg:w-[58%] lg:opacity-100"
      />

      <div className="cf-container relative z-10 w-full">
        <div className="max-w-[46rem] lg:max-w-[40rem]">
          <p className="cf-chapter text-teal" data-reveal>
            <span>Estúdio digital · Brasil</span>
          </p>

          <h1 className="cf-display mt-6 text-[length:var(--text-5xl)] text-paper">
            <span className="cf-mask" data-reveal-mask style={{ ['--reveal-delay' as string]: '80ms' }}>
              <span className="block">Da ideia</span>
            </span>
            <span className="cf-mask" data-reveal-mask style={{ ['--reveal-delay' as string]: '220ms' }}>
              <span className="block text-teal">à experiência</span>
            </span>
            <span className="cf-mask" data-reveal-mask style={{ ['--reveal-delay' as string]: '360ms' }}>
              <span className="block">digital.</span>
            </span>
          </h1>

          <p
            className="cf-lead mt-7 max-w-[34rem] text-paper/70"
            data-reveal
            style={{ ['--reveal-delay' as string]: '520ms' }}
          >
            Seu negócio já entrega valor. Nós construímos o site que torna isso evidente —
            na estrutura do argumento, no ritmo da navegação e no código por baixo.
          </p>

          <div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            data-reveal
            style={{ ['--reveal-delay' as string]: '640ms' }}
          >
            <Cta href={WHATSAPP.general} external>
              Iniciar um projeto
            </Cta>
            <Cta href="#niveis" variant="outline">
              Comparar os três níveis
            </Cta>
          </div>

          <p
            className="cf-mono mt-6 text-paper/45"
            data-reveal
            style={{ ['--reveal-delay' as string]: '740ms' }}
          >
            {BRAND.coverage}
          </p>
        </div>
      </div>

      {/* rodapé do hero: estado do objeto + indicador de scroll */}
      <div
        ref={railRef}
        className="cf-container relative z-10 mt-10 w-full lg:mt-12"
        style={{ ['--rail' as string]: '0' }}
      >
        <div
          className="flex flex-col gap-4 border-t border-paper/10 pt-5 sm:flex-row sm:items-center sm:justify-between"
          data-reveal
          style={{ ['--reveal-delay' as string]: '860ms' }}
        >
          <ol className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:flex sm:flex-wrap sm:items-center sm:gap-x-5">
            {STATES.map((label, i) => (
              <li
                key={label}
                className={`cf-mono transition-colors duration-500 ${
                  i === stage ? 'text-teal' : i < stage ? 'text-paper/40' : 'text-paper/20'
                }`}
              >
                <span className="tabular-nums">{String(i + 1).padStart(2, '0')}</span>{' '}
                <span>{label}</span>
              </li>
            ))}
          </ol>

          <div ref={hintRef} className="flex items-center gap-3 transition-opacity duration-300">
            <span className="cf-mono text-paper/40">role para construir</span>
            <span className="relative block h-8 w-px overflow-hidden bg-paper/20">
              <span className="absolute inset-x-0 top-0 block h-3 animate-[cf-drop_1.8s_var(--ease-cf-in-out)_infinite] bg-teal" />
            </span>
          </div>
        </div>

        <div className="mt-3 h-px w-full bg-paper/10">
          <div
            className="h-px origin-left bg-teal transition-transform duration-300 ease-out"
            style={{ transform: 'scaleX(var(--rail, 0))' }}
          />
        </div>
      </div>
    </section>
  );
}
