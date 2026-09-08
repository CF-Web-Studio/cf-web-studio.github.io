import { DIFFERENTIALS } from '../data/content';
import { Chapter } from './primitives';

export function Differentials() {
  return (
    <section id="diferenciais" className="cf-surface-dark relative">
      <div className="cf-container border-t border-paper/10 py-[var(--spacing-chapter)]">
        <div className="max-w-[40rem]">
          <Chapter number="07" className="text-teal">
            Diferenciais
          </Chapter>
          <h2 className="cf-display mt-7 text-[length:var(--text-3xl)] text-paper" data-reveal>
            Seis coisas que valem
            <span className="block text-paper/40">mais do que um adjetivo.</span>
          </h2>
        </div>

        <div className="mt-14 grid gap-x-14 gap-y-10 md:grid-cols-2 xl:grid-cols-3">
          {DIFFERENTIALS.map((item, i) => (
            <article
              key={item.index}
              className="group relative pt-6"
              data-reveal
              style={{ ['--reveal-delay' as string]: `${(i % 3) * 90}ms` }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-paper/15 transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-teal transition-transform duration-[520ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
              />
              <span className="cf-mono text-teal/70">{item.index}</span>
              <h3 className="cf-display mt-4 text-[length:var(--text-xl)] text-paper">
                {item.title}
              </h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-paper/65">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
