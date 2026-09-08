import { WHATSAPP } from '../data/brand';
import { useScrolled } from '../lib/hooks';
import { WhatsAppGlyph } from './primitives';

/** Atalho persistente — aparece só depois que o visitante passou do hero. */
export function WhatsAppFab() {
  const visible = useScrolled(600);

  return (
    <a
      href={WHATSAPP.floating}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Falar com a CF Web Studio no WhatsApp"
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={`fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-teal text-ink-900 shadow-[0_8px_30px_rgba(5,11,22,0.5)] transition-all duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 hover:bg-teal-bright ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <WhatsAppGlyph className="h-7 w-7" />
    </a>
  );
}
