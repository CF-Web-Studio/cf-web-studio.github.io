/**
 * O desenho técnico do MÉTODO.
 *
 * Cada grupo pertence a uma etapa e é revelado pela variável CSS --s1..--s7,
 * escrita pelo scroll. Traços usam pathLength="1", então o desenho literalmente
 * se desenha: ponto → eixo → wireframe → estrutura → movimento → medida → interface.
 */

const draw = (v: string) => ({
  strokeDasharray: '1px',
  strokeDashoffset: `calc((1 - var(${v})) * 1px)`,
  opacity: `calc(var(${v}) * 3)` as unknown as number,
});

const fade = (v: string, max = 1) => ({
  opacity: `calc(var(${v}) * ${max})` as unknown as number,
});

export function Blueprint({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 300"
      className={className}
      role="img"
      aria-label="Desenho técnico que se constrói etapa a etapa: do ponto inicial à interface final."
      fill="none"
      strokeLinecap="round"
    >
      {/* 01 IDEIA — um ponto e sua mira */}
      <g stroke="#2FA9A2" strokeWidth="1">
        <circle cx="200" cy="150" r="4" fill="#2FA9A2" style={fade('--s1')} />
        <circle cx="200" cy="150" r="17" pathLength={1} style={draw('--s1')} />
      </g>

      {/* 02 DIREÇÃO — eixos e limite da composição */}
      <g stroke="#47C8BF" strokeWidth="0.75" opacity="0.9">
        <path d="M200 20 L200 280" pathLength={1} style={draw('--s2')} />
        <path d="M40 150 L360 150" pathLength={1} style={draw('--s2')} />
        <path d="M40 20 L360 20 L360 280 L40 280 Z" pathLength={1} style={draw('--s2')} />
      </g>

      {/* 03 DESIGN — o wireframe: cabeçalho, hero e colunas */}
      <g stroke="#F3F1EC" strokeWidth="1" opacity="0.85">
        <path d="M40 20 L360 20 L360 46 L40 46 Z" pathLength={1} style={draw('--s3')} />
        <path d="M40 46 L360 46 L360 158 L40 158 Z" pathLength={1} style={draw('--s3')} />
        <path d="M40 176 L142 176 L142 254 L40 254 Z" pathLength={1} style={draw('--s3')} />
        <path d="M149 176 L251 176 L251 254 L149 254 Z" pathLength={1} style={draw('--s3')} />
        <path d="M258 176 L360 176 L360 254 L258 254 Z" pathLength={1} style={draw('--s3')} />
      </g>

      {/* 04 ENGENHARIA — nós de construção e ligações */}
      <g stroke="#2FA9A2" strokeWidth="0.75">
        <path d="M40 20 L40 8 M360 20 L360 8 M40 280 L40 292 M360 280 L360 292" pathLength={1} style={draw('--s4')} />
        <path d="M91 176 L91 158 M200 176 L200 158 M309 176 L309 158" pathLength={1} style={draw('--s4')} />
        <g fill="#2FA9A2" style={fade('--s4')}>
          <circle cx="40" cy="46" r="2.4" />
          <circle cx="360" cy="46" r="2.4" />
          <circle cx="40" cy="158" r="2.4" />
          <circle cx="360" cy="158" r="2.4" />
          <circle cx="91" cy="176" r="2.4" />
          <circle cx="200" cy="176" r="2.4" />
          <circle cx="309" cy="176" r="2.4" />
        </g>
      </g>

      {/* 05 EXPERIÊNCIA — as trajetórias do movimento */}
      <g stroke="#47C8BF" strokeWidth="0.75" opacity="0.75">
        <path d="M60 132 C120 96, 280 96, 340 132" pathLength={1} style={draw('--s5')} />
        <path d="M60 236 C120 206, 280 206, 340 236" pathLength={1} style={draw('--s5')} />
        <path d="M330 122 l12 8 l-12 8" pathLength={1} style={draw('--s5')} />
        <path d="M330 226 l12 8 l-12 8" pathLength={1} style={draw('--s5')} />
      </g>

      {/* 06 QA — cotas e verificação */}
      <g stroke="#F3F1EC" strokeWidth="0.6" opacity="0.55">
        <path d="M40 268 L142 268 M40 264 L40 272 M142 264 L142 272" pathLength={1} style={draw('--s6')} />
        <path d="M372 46 L372 158 M368 46 L376 46 M368 158 L376 158" pathLength={1} style={draw('--s6')} />
      </g>
      <g stroke="#2FA9A2" strokeWidth="1.4">
        <path d="M186 209 l8 9 l14 -18" pathLength={1} style={draw('--s6')} />
      </g>

      {/* 07 ENTREGA — a interface resolvida */}
      <g style={fade('--s7')}>
        <rect x="40" y="46" width="320" height="112" fill="#16294F" opacity="0.55" />
        <rect x="40" y="20" width="320" height="26" fill="#0d1c38" opacity="0.8" />
        <rect x="56" y="30" width="52" height="6" rx="3" fill="#2FA9A2" />
        <rect x="60" y="76" width="176" height="12" rx="2" fill="#F3F1EC" opacity="0.85" />
        <rect x="60" y="96" width="132" height="12" rx="2" fill="#F3F1EC" opacity="0.5" />
        <rect x="60" y="124" width="86" height="18" rx="3" fill="#2FA9A2" />
        <rect x="40" y="176" width="102" height="78" fill="#16294F" opacity="0.4" />
        <rect x="149" y="176" width="102" height="78" fill="#16294F" opacity="0.4" />
        <rect x="258" y="176" width="102" height="78" fill="#16294F" opacity="0.4" />
        <rect x="54" y="192" width="46" height="5" rx="2.5" fill="#47C8BF" />
        <rect x="163" y="192" width="46" height="5" rx="2.5" fill="#47C8BF" />
        <rect x="272" y="192" width="46" height="5" rx="2.5" fill="#47C8BF" />
        <rect x="54" y="208" width="74" height="4" rx="2" fill="#F3F1EC" opacity="0.4" />
        <rect x="163" y="208" width="74" height="4" rx="2" fill="#F3F1EC" opacity="0.4" />
        <rect x="272" y="208" width="74" height="4" rx="2" fill="#F3F1EC" opacity="0.4" />
      </g>
    </svg>
  );
}
