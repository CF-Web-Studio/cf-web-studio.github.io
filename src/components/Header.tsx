import { useEffect, useState } from 'react';
import { NAV } from '../data/content';
import { WHATSAPP } from '../data/brand';
import { useActiveSection, useScrolled } from '../lib/hooks';
import { Arrow, Wordmark } from './primitives';

const NAV_IDS = NAV.map((n) => n.id);

export function Header() {
  const scrolled = useScrolled(40);
  const active = useActiveSection(NAV_IDS);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <a
        href="#conteudo"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-[4px] focus:bg-teal focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-ink-900"
      >
        Pular para o conteúdo
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'border-b border-paper/10 bg-ink-900/85 backdrop-blur-xl'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <div className="cf-container flex h-[72px] items-center justify-between gap-6">
          <a href="#topo" aria-label="CF Web Studio — início" className="shrink-0">
            <Wordmark tone="light" />
          </a>

          <nav aria-label="Navegação principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={`relative block px-3.5 py-2 text-[0.8125rem] tracking-[0.01em] transition-colors duration-200 ${
                      active === item.id ? 'text-teal' : 'text-paper/65 hover:text-paper'
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute inset-x-3.5 bottom-1 h-px origin-left bg-teal transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        active === item.id ? 'scale-x-100' : 'scale-x-0'
                      }`}
                    />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={WHATSAPP.general}
              target="_blank"
              rel="noopener noreferrer"
              className="group hidden items-center gap-2 rounded-[4px] border border-paper/20 px-4 py-2.5 text-[0.8125rem] font-medium text-paper transition-all duration-200 hover:border-teal hover:text-teal sm:inline-flex"
            >
              Iniciar projeto
              <Arrow className="h-3 w-3 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-mobile"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              className="flex h-11 w-11 items-center justify-center rounded-[4px] border border-paper/20 text-paper transition-colors hover:border-teal hover:text-teal lg:hidden"
            >
              <span className="relative block h-3 w-5">
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? 'top-1.5 rotate-45' : 'top-0'
                  }`}
                />
                <span
                  className={`absolute left-0 block h-px w-5 bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    open ? 'top-1.5 -rotate-45' : 'top-3'
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      <div
        id="menu-mobile"
        hidden={!open}
        className="fixed inset-0 z-[45] bg-ink-900 lg:hidden"
      >
        <div className="cf-container flex h-full flex-col pt-[88px] pb-10">
          <nav aria-label="Navegação principal (mobile)" className="flex-1">
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <li key={item.id} className="border-b border-paper/10">
                  <a
                    href={`#${item.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between py-5"
                    style={{ transitionDelay: `${i * 30}ms` }}
                  >
                    <span className="cf-display text-2xl text-paper">{item.label}</span>
                    <span className="cf-mono text-teal">{String(i + 1).padStart(2, '0')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a
            href={WHATSAPP.general}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="mt-8 flex min-h-[52px] items-center justify-center gap-2 rounded-[4px] bg-teal px-6 font-medium text-ink-900"
          >
            Iniciar projeto no WhatsApp
            <Arrow className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </>
  );
}
