import { useRef, useState, type FormEvent } from 'react';
import { BRAND, MAILTO, WHATSAPP } from '../data/brand';
import { TIERS } from '../data/content';
import { Arrow, Chapter, WhatsAppGlyph } from './primitives';

interface FormState {
  name: string;
  company: string;
  email: string;
  phone: string;
  level: string;
  message: string;
}

const EMPTY: FormState = {
  name: '',
  company: '',
  email: '',
  phone: '',
  level: 'Ainda não sei',
  message: '',
};

const LEVELS = [...TIERS.map((t) => t.name), 'Ainda não sei'];

function buildMessage(data: FormState) {
  return [
    'Olá, CF Web Studio! Vim pelo site.',
    '',
    `Nome: ${data.name}`,
    data.company ? `Empresa: ${data.company}` : null,
    `E-mail: ${data.email}`,
    `WhatsApp: ${data.phone}`,
    `Nível de interesse: ${data.level}`,
    '',
    'Sobre o projeto:',
    data.message || '(vou detalhar na conversa)',
  ]
    .filter((line) => line !== null)
    .join('\n');
}

export function Contact() {
  const [data, setData] = useState<FormState>(EMPTY);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const lastUrl = useRef<string>('');

  const set = (key: keyof FormState) => (value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!data.name.trim() || !data.email.trim() || !data.phone.trim()) {
      setError('Preencha nome, e-mail e WhatsApp para que possamos responder.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) {
      setError('O e-mail informado parece incompleto. Confira antes de enviar.');
      return;
    }

    setError(null);
    const url = `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(buildMessage(data))}`;
    lastUrl.current = url;
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <section id="contato" className="cf-surface-paper relative overflow-hidden">
      <div className="cf-blueprint absolute inset-0 opacity-50" aria-hidden="true" />

      <div className="cf-container relative py-[var(--spacing-chapter)]">
        <Chapter number="09">Contato</Chapter>

        <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* formulário */}
          <div className="lg:col-span-7">
            <h2 className="cf-display text-[length:var(--text-3xl)] text-navy-deep" data-reveal>
              Comece pelo essencial:
              <span className="block text-navy-deep/45">o que a sua empresa faz.</span>
            </h2>

            {sent ? (
              <div
                role="status"
                className="mt-9 rounded-[6px] border border-teal-deep/35 bg-white/60 p-7"
              >
                <p className="cf-display text-xl text-navy-deep">
                  Pronto, {data.name.split(' ')[0]}.
                </p>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-navy-deep/75">
                  Abrimos o WhatsApp com o seu briefing já formatado. Se a janela não apareceu,
                  o navegador pode ter bloqueado o pop-up — use o botão abaixo.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a
                    href={lastUrl.current}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] items-center gap-2.5 rounded-[4px] bg-navy-deep px-6 py-3.5 text-[0.9375rem] font-medium text-paper transition-colors hover:bg-navy"
                  >
                    Reabrir no WhatsApp
                    <Arrow className="h-3.5 w-3.5" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSent(false);
                      setData(EMPTY);
                    }}
                    className="inline-flex min-h-[48px] items-center rounded-[4px] border border-navy-deep/25 px-6 py-3.5 text-[0.9375rem] text-navy-deep transition-colors hover:border-teal-deep hover:text-teal-deep"
                  >
                    Enviar outro briefing
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="mt-9 grid gap-5 sm:grid-cols-2">
                <Field
                  id="c-nome"
                  label="Nome"
                  required
                  value={data.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
                <Field
                  id="c-empresa"
                  label="Empresa"
                  value={data.company}
                  onChange={set('company')}
                  autoComplete="organization"
                />
                <Field
                  id="c-email"
                  label="E-mail"
                  type="email"
                  required
                  value={data.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
                <Field
                  id="c-whats"
                  label="WhatsApp com DDD"
                  type="tel"
                  required
                  value={data.phone}
                  onChange={set('phone')}
                  autoComplete="tel"
                  inputMode="tel"
                />

                <div className="sm:col-span-2">
                  <label htmlFor="c-nivel" className="cf-mono block text-navy-deep/60">
                    Nível de interesse
                  </label>
                  <select
                    id="c-nivel"
                    value={data.level}
                    onChange={(e) => set('level')(e.target.value)}
                    className="mt-2 min-h-[48px] w-full rounded-[4px] border border-navy-deep/20 bg-white/70 px-3.5 text-[0.9375rem] text-navy-deep transition-colors focus:border-teal-deep"
                  >
                    {LEVELS.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="c-msg" className="cf-mono block text-navy-deep/60">
                    O que a empresa faz e o que o site precisa resolver
                  </label>
                  <textarea
                    id="c-msg"
                    rows={5}
                    value={data.message}
                    onChange={(e) => set('message')(e.target.value)}
                    className="mt-2 w-full resize-y rounded-[4px] border border-navy-deep/20 bg-white/70 px-3.5 py-3 text-[0.9375rem] leading-relaxed text-navy-deep transition-colors placeholder:text-navy-deep/35 focus:border-teal-deep"
                    placeholder="Ex.: somos uma clínica de fisioterapia esportiva; hoje o contato chega por indicação e o site antigo não explica os tratamentos."
                  />
                </div>

                <div aria-live="polite" className="sm:col-span-2">
                  {error && (
                    <p className="rounded-[4px] border border-red-700/30 bg-red-700/5 px-4 py-3 text-[0.875rem] text-red-800">
                      {error}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="group inline-flex min-h-[52px] shrink-0 items-center justify-center gap-2.5 whitespace-nowrap rounded-[4px] bg-navy-deep px-7 text-[0.9375rem] font-medium text-paper transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 hover:bg-navy"
                  >
                    Enviar briefing pelo WhatsApp
                    <Arrow className="h-3.5 w-3.5 transition-transform duration-[220ms] group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </button>
                  <p className="text-[0.8125rem] leading-relaxed text-navy-deep/55">
                    O formulário monta a mensagem e abre a conversa. Nada é armazenado neste site.
                  </p>
                </div>
              </form>
            )}
          </div>

          {/* canais diretos */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <ul className="divide-y divide-navy-deep/12 border-y border-navy-deep/12">
                <ChannelRow
                  href={WHATSAPP.general}
                  label="WhatsApp"
                  value={BRAND.phoneDisplay}
                  icon={<WhatsAppGlyph className="h-4 w-4" />}
                />
                <ChannelRow href={MAILTO} label="E-mail" value={BRAND.email} />
                <ChannelRow
                  href={BRAND.instagram}
                  label="Instagram"
                  value={BRAND.instagramDisplay}
                />
              </ul>

              <div className="mt-8 space-y-4 text-[0.875rem] leading-relaxed text-navy-deep/65">
                <p>
                  <span className="cf-mono block text-navy-deep/45">Quem atende</span>
                  {BRAND.signature} — os mesmos que desenham e escrevem o código. Não há
                  intermediário entre você e o projeto.
                </p>
                <p>
                  <span className="cf-mono block text-navy-deep/45">Abrangência</span>
                  {BRAND.coverage}
                </p>
                <p>
                  <span className="cf-mono block text-navy-deep/45">O que enviamos de volta</span>
                  Uma leitura do problema, o nível de entrega recomendado e uma proposta com
                  escopo e prazo definidos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  autoComplete,
  inputMode,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  inputMode?: 'tel' | 'email' | 'text';
}) {
  return (
    <div>
      <label htmlFor={id} className="cf-mono block text-navy-deep/60">
        {label}
        {required && <span className="ml-1 text-teal-deep">*</span>}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 min-h-[48px] w-full rounded-[4px] border border-navy-deep/20 bg-white/70 px-3.5 text-[0.9375rem] text-navy-deep transition-colors focus:border-teal-deep"
      />
    </div>
  );
}

function ChannelRow({
  href,
  label,
  value,
  icon,
}: {
  href: string;
  label: string;
  value: string;
  icon?: React.ReactNode;
}) {
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-teal-deep"
      >
        <span>
          <span className="cf-mono block text-navy-deep/45">{label}</span>
          <span className="mt-1 flex items-center gap-2 text-[0.9375rem] text-current">
            {icon}
            {value}
          </span>
        </span>
        <Arrow className="h-3.5 w-3.5 shrink-0 transition-transform duration-[220ms] group-hover:translate-x-1 group-hover:-translate-y-1" />
      </a>
    </li>
  );
}
