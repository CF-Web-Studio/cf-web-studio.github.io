import { BRAND, MAILTO, WHATSAPP } from '../data/brand';
import { NAV } from '../data/content';
import { Wordmark } from './primitives';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="cf-surface-dark border-t border-paper/10">
      <div className="cf-container py-16">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Wordmark tone="light" />
            <p className="mt-5 max-w-[24rem] text-[0.9375rem] leading-relaxed text-paper/60">
              {BRAND.tagline} Estúdio de design e desenvolvimento web de {BRAND.signature}.
            </p>
            <p className="cf-mono mt-5 text-paper/35">{BRAND.coverage}</p>
          </div>

          <nav aria-label="Navegação do rodapé" className="md:col-span-3">
            <h2 className="cf-mono text-paper/40">Seções</h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 md:grid-cols-1">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="inline-block py-1.5 text-[0.875rem] text-paper/65 transition-colors hover:text-teal"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <h2 className="cf-mono text-paper/40">Contato</h2>
            <ul className="mt-4 space-y-1">
              <li>
                <a
                  href={WHATSAPP.general}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 text-[0.875rem] text-paper/65 transition-colors hover:text-teal"
                >
                  WhatsApp {BRAND.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={MAILTO}
                  className="inline-block break-all py-1.5 text-[0.875rem] text-paper/65 transition-colors hover:text-teal"
                >
                  {BRAND.email}
                </a>
              </li>
              <li>
                <a
                  href={BRAND.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-1.5 text-[0.875rem] text-paper/65 transition-colors hover:text-teal"
                >
                  Instagram {BRAND.instagramDisplay}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 grid gap-3 border-t border-paper/10 pt-8 md:grid-cols-2">
          <details className="group">
            <summary className="cf-mono cursor-pointer list-none py-2 text-paper/45 transition-colors hover:text-teal">
              Privacidade e uso
              <span className="ml-2 inline-block transition-transform group-open:rotate-90">›</span>
            </summary>
            <div className="max-w-[36rem] space-y-3 pb-2 pt-2 text-[0.8125rem] leading-relaxed text-paper/55">
              <p>
                Este site não possui banco de dados nem armazena o que você digita. O formulário
                de contato monta uma mensagem no seu próprio dispositivo e abre o WhatsApp ou o
                cliente de e-mail — os dados só saem daqui quando você envia.
              </p>
              <p>
                As informações recebidas por WhatsApp ou e-mail são usadas exclusivamente para
                responder e elaborar a proposta. Não são vendidas nem compartilhadas com
                terceiros para fins publicitários.
              </p>
              <p>
                Após a conclusão e quitação do projeto, os direitos de uso do site desenvolvido
                são do cliente. A CF Web Studio reserva o direito de exibir o trabalho em seu
                portfólio, identificado como tal.
              </p>
            </div>
          </details>

          <p className="cf-mono self-end text-paper/35 md:text-right">
            © {year} {BRAND.nameUpper} · {BRAND.signature}
          </p>
        </div>
      </div>
    </footer>
  );
}
