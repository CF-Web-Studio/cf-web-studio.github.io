import type { ReactNode } from 'react';

export function Mark({ className = '', tone = 'brand' }: { className?: string; tone?: 'brand' | 'light' }) {
  const ring = tone === 'light' ? '#F3F1EC' : '#16294F';
  const glyph = tone === 'light' ? '#F3F1EC' : '#16294F';
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false">
      <g fill="none" strokeLinecap="round">
        <path d="M 86.44 43.58 A 37 37 0 1 1 62.65 15.23" stroke={ring} strokeWidth="3.4" />
        <path d="M 17.99 55.64 A 32.5 32.5 0 1 1 38.88 80.54" stroke="#2FA9A2" strokeWidth="2.6" />
      </g>
      <g transform="translate(0 -4.5)">
        <path
          d="M 48.12 64.6 A 12.5 12.5 0 1 1 48.12 43.4"
          fill="none"
          stroke={glyph}
          strokeWidth="7.6"
          strokeLinecap="butt"
        />
        <path
          fill="#2FA9A2"
          d="M 71.4 33.2 A 8.6 8.6 0 0 0 57.6 40.1 L 57.6 43.6 L 51.5 43.6 L 51.5 49.9 L 57.6 49.9 L 57.6 68.6 L 64.5 68.6 L 64.5 49.9 L 71.6 49.9 L 71.6 43.6 L 64.5 43.6 L 64.5 40.1 A 3.4 3.4 0 0 1 68.9 37.3 Z"
        />
      </g>
    </svg>
  );
}

export function Wordmark({ tone = 'light', className = '' }: { tone?: 'light' | 'dark'; className?: string }) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <Mark className="h-8 w-8 shrink-0" tone={tone === 'light' ? 'light' : 'brand'} />
      <span className="flex flex-col leading-none">
        <span
          className="cf-display text-[0.95rem] tracking-[0.02em]"
          style={{ color: tone === 'light' ? 'var(--color-paper)' : 'var(--color-navy-deep)' }}
        >
          CF Web Studio
        </span>
        <span className="cf-mono mt-1 text-[0.5625rem] tracking-[0.28em] text-teal">estúdio digital</span>
      </span>
    </span>
  );
}

export function Chapter({
  number,
  children,
  className = '',
}: {
  number: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={`cf-chapter ${className}`} data-reveal>
      <span className="text-teal">{number}</span>
      <span className="opacity-70">{children}</span>
    </p>
  );
}

type CtaProps = {
  href: string;
  children: ReactNode;
  variant?: 'solid' | 'outline' | 'ghost';
  tone?: 'dark' | 'paper';
  external?: boolean;
  className?: string;
  onClick?: () => void;
};

export function Cta({
  href,
  children,
  variant = 'solid',
  tone = 'dark',
  external = false,
  className = '',
  onClick,
}: CtaProps) {
  const base =
    'group inline-flex items-center justify-center gap-2.5 rounded-[4px] px-6 py-3.5 text-[0.9375rem] font-medium transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] min-h-[48px]';

  const styles: Record<string, string> = {
    'solid-dark': 'bg-teal text-ink-900 hover:bg-teal-bright hover:-translate-y-0.5',
    'solid-paper': 'bg-navy-deep text-paper hover:bg-navy hover:-translate-y-0.5',
    'outline-dark':
      'border border-paper/25 text-paper hover:border-teal hover:text-teal hover:-translate-y-0.5',
    'outline-paper':
      'border border-navy-deep/25 text-navy-deep hover:border-teal-deep hover:text-teal-deep hover:-translate-y-0.5',
    'ghost-dark': 'text-paper/75 hover:text-teal px-0',
    'ghost-paper': 'text-navy-deep/75 hover:text-teal-deep px-0',
  };

  return (
    <a
      href={href}
      onClick={onClick}
      className={`${base} ${styles[`${variant}-${tone}`]} ${className}`}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
    >
      <span>{children}</span>
      <Arrow className="h-3.5 w-3.5 transition-transform duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1 group-hover:-translate-y-1" />
    </a>
  );
}

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 14 14" fill="none" className={className} aria-hidden="true">
      <path d="M3 11L11 3M11 3H4.6M11 3v6.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function WhatsAppGlyph({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.13h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.36c0-4.54 3.7-8.23 8.24-8.23a8.18 8.18 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.7 8.21-8.24 8.21Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.71-.14-.25-.01-.38.11-.5.11-.11.25-.29.37-.44.13-.15.17-.25.25-.42.09-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.16 0-.43.06-.65.31-.22.24-.85.83-.85 2.03s.88 2.35 1 2.51c.12.17 1.72 2.63 4.17 3.69.58.25 1.04.4 1.39.51.59.19 1.12.16 1.54.1.47-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
