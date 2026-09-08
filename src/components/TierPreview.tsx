/**
 * Representação esquemática dos três níveis.
 *
 * Não é uma captura de tela: é um diagrama da estrutura de cada entrega,
 * na mesma linguagem de desenho técnico do resto do site. Quem quiser ver
 * o site abre a demonstração — o botão está ao lado.
 */

const URLS: Record<string, string> = {
  essencial: 'cadus2.github.io/Essencial-Forno-Nobile-Pizzaria',
  profissional: 'cadus2.github.io/Forno-Nobile-Pizzaria',
  premium: 'cadus2.github.io/Premium-Forno-Nobile-Pizzaria',
};

export function TierPreview({ tier }: { tier: string }) {
  return (
    <figure className="m-0" data-reveal>
      <div className="overflow-hidden rounded-[6px] border border-paper/12 bg-ink-850">
        <div className="flex min-w-0 items-center gap-3 border-b border-paper/10 bg-ink-800 px-4 py-3">
          <span className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="block h-2 w-2 rounded-full bg-paper/20" />
            <span className="block h-2 w-2 rounded-full bg-paper/20" />
            <span className="block h-2 w-2 rounded-full bg-paper/20" />
          </span>
          <span className="cf-mono min-w-0 truncate rounded-[3px] bg-ink-900 px-2.5 py-1 text-paper/45">
            {URLS[tier]}
          </span>
        </div>

        <div className="aspect-[16/10] w-full bg-ink-900">
          <Schematic tier={tier} />
        </div>
      </div>

      <figcaption className="cf-mono mt-3 text-paper/35">
        Diagrama de estrutura do nível — não é captura de tela
      </figcaption>
    </figure>
  );
}

function Schematic({ tier }: { tier: string }) {
  const common = { className: 'h-full w-full', viewBox: '0 0 480 300', role: 'img' } as const;

  if (tier === 'essencial') {
    return (
      <svg {...common} aria-label="Estrutura do nível Essencial: uma página com hero, texto e uma chamada para ação.">
        <rect width="480" height="300" fill="#050b16" />
        <rect x="36" y="26" width="46" height="7" rx="3.5" fill="#2FA9A2" />
        <rect x="366" y="24" width="78" height="12" rx="3" fill="#F3F1EC" opacity="0.14" />
        <rect x="36" y="76" width="238" height="17" rx="3" fill="#F3F1EC" opacity="0.82" />
        <rect x="36" y="102" width="176" height="17" rx="3" fill="#F3F1EC" opacity="0.5" />
        <rect x="36" y="140" width="216" height="6" rx="3" fill="#F3F1EC" opacity="0.22" />
        <rect x="36" y="154" width="192" height="6" rx="3" fill="#F3F1EC" opacity="0.22" />
        <rect x="36" y="182" width="104" height="26" rx="4" fill="#2FA9A2" />
        <rect x="312" y="70" width="132" height="138" rx="4" fill="#16294F" opacity="0.55" />
        <rect x="36" y="248" width="408" height="1" fill="#F3F1EC" opacity="0.12" />
        <rect x="36" y="262" width="96" height="5" rx="2.5" fill="#F3F1EC" opacity="0.16" />
      </svg>
    );
  }

  if (tier === 'profissional') {
    return (
      <svg {...common} aria-label="Estrutura do nível Profissional: várias seções, catálogo e formulário.">
        <rect width="480" height="300" fill="#050b16" />
        <rect x="0" y="0" width="480" height="30" fill="#07101f" />
        <rect x="24" y="12" width="38" height="6" rx="3" fill="#2FA9A2" />
        {[0, 1, 2, 3].map((i) => (
          <rect key={i} x={300 + i * 40} y="13" width="28" height="4" rx="2" fill="#F3F1EC" opacity="0.28" />
        ))}
        <rect x="24" y="48" width="200" height="14" rx="3" fill="#F3F1EC" opacity="0.8" />
        <rect x="24" y="68" width="148" height="14" rx="3" fill="#F3F1EC" opacity="0.45" />
        <rect x="24" y="96" width="88" height="22" rx="4" fill="#2FA9A2" />
        <rect x="260" y="42" width="196" height="82" rx="4" fill="#16294F" opacity="0.6" />
        <rect x="24" y="140" width="60" height="5" rx="2.5" fill="#47C8BF" />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <rect x={24 + i * 148} y="156" width="136" height="60" rx="4" fill="#16294F" opacity="0.42" />
            <rect x={36 + i * 148} y="170" width="52" height="5" rx="2.5" fill="#47C8BF" />
            <rect x={36 + i * 148} y="184" width="96" height="4" rx="2" fill="#F3F1EC" opacity="0.32" />
            <rect x={36 + i * 148} y="194" width="72" height="4" rx="2" fill="#F3F1EC" opacity="0.32" />
          </g>
        ))}
        <rect x="24" y="234" width="272" height="46" rx="4" fill="#0a1526" stroke="#F3F1EC" strokeOpacity="0.12" />
        <rect x="38" y="248" width="112" height="7" rx="3.5" fill="#F3F1EC" opacity="0.35" />
        <rect x="38" y="262" width="76" height="7" rx="3.5" fill="#F3F1EC" opacity="0.2" />
        <rect x="234" y="248" width="48" height="21" rx="4" fill="#2FA9A2" />
        <rect x="316" y="234" width="140" height="46" rx="4" fill="#16294F" opacity="0.42" />
      </svg>
    );
  }

  return (
    <svg {...common} aria-label="Estrutura do nível Premium: composição em tela cheia, narrativa por capítulos e elemento gráfico autoral.">
      <defs>
        <radialGradient id="tier-premium-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2FA9A2" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#2FA9A2" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="480" height="300" fill="#050b16" />
      <g stroke="#2FA9A2" strokeOpacity="0.1" strokeWidth="1">
        {[0, 1, 2, 3, 4].map((i) => (
          <path key={i} d={`M${60 + i * 90} 0 L${60 + i * 90} 300`} />
        ))}
      </g>
      <circle cx="342" cy="140" r="86" fill="url(#tier-premium-core)" />
      <g stroke="#47C8BF" fill="none" strokeLinecap="round">
        <path d="M342 66 a74 74 0 1 1 -52 22" strokeWidth="1.4" opacity="0.85" />
        <path d="M300 200 a62 62 0 1 1 42 -14" strokeWidth="1" opacity="0.5" />
      </g>
      {Array.from({ length: 46 }).map((_, i) => {
        const a = (i / 46) * Math.PI * 2;
        const r = 74 + (i % 5) * 3.5;
        return (
          <circle
            key={i}
            cx={342 + Math.cos(a) * r}
            cy={140 + Math.sin(a) * r * 0.62}
            r={i % 4 === 0 ? 2 : 1.2}
            fill="#F3F1EC"
            opacity={0.25 + (i % 5) * 0.14}
          />
        );
      })}
      <rect x="24" y="18" width="34" height="5" rx="2.5" fill="#2FA9A2" />
      <rect x="24" y="86" width="188" height="20" rx="3" fill="#F3F1EC" opacity="0.9" />
      <rect x="24" y="114" width="146" height="20" rx="3" fill="#2FA9A2" opacity="0.85" />
      <rect x="24" y="142" width="120" height="20" rx="3" fill="#F3F1EC" opacity="0.55" />
      <rect x="24" y="184" width="150" height="5" rx="2.5" fill="#F3F1EC" opacity="0.22" />
      <rect x="24" y="196" width="122" height="5" rx="2.5" fill="#F3F1EC" opacity="0.22" />
      <rect x="24" y="222" width="88" height="24" rx="4" fill="#2FA9A2" />
      <rect x="24" y="272" width="432" height="1" fill="#F3F1EC" opacity="0.12" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={24 + i * 76} y="282" width={i === 1 ? 44 : 30} height="4" rx="2" fill={i === 1 ? '#2FA9A2' : '#F3F1EC'} opacity={i === 1 ? 1 : 0.2} />
      ))}
    </svg>
  );
}
