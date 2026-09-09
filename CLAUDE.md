# CF Web Studio — guia do projeto

Site oficial da CF Web Studio. Leia isto antes de alterar qualquer coisa.

## Regras que não se negociam

1. **Dependências de runtime: `react`, `react-dom`, e — desde 2026-09-09, por decisão do proprietário — `lenis`, `gsap` (com o plugin gratuito `ScrollTrigger`).** Nada além disso sem novo aval. Framer Motion / Motion One e Three.js continuam **fora** (sem problema concreto que justifique). Antes de qualquer outra lib: verifique se dá para escrever. Só builds gratuitas/OSS — **nenhum** GSAP Club / bonus plugin pago. O objeto 3D do hero vive em `src/lib/nucleo.ts`.
2. **Nenhuma API paga, chave de API ou serviço faturado.** O site é estático e o formulário só monta uma mensagem de WhatsApp no próprio dispositivo.
3. **Nada inventado.** Sem clientes, métricas, prêmios, depoimentos ou logotipos que não existam. Demonstração é identificada como demonstração.
4. **A marca é `CF Web Studio`.** Nunca "FC Web Designer" nem variações. O símbolo é o anel duplo com o "cf" (`public/cf-mark.svg`); o nome é escrito com a tipografia do site, não com o lockup raster.
5. **Movimento tem função.** Se uma animação não comunica nada, ela sai. Momentos estáticos fazem parte da composição.

## Onde mexer

| Quero mudar | Arquivo |
| --- | --- |
| Texto de qualquer seção | `src/data/content.ts` |
| Telefone, e-mail, Instagram, mensagens de WhatsApp | `src/data/brand.ts` |
| Cor, tipografia, espaçamento, raio, easing, duração | `src/styles/index.css` (bloco `@theme`) |
| O objeto do hero | `src/lib/nucleo.ts` |
| O desenho técnico do Método | `src/components/Blueprint.tsx` |
| Metadados, Open Graph, dados estruturados | `index.html` |

O FAQ existe em dois lugares: `src/data/content.ts` (renderizado) e no `FAQPage` de `index.html` (dados estruturados). **Ao editar um, edite o outro.**

## Sistema de motion

- **Um único loop de RAF na página.** Quando Lenis entrar, ele é a fonte do RAF e o GSAP é sincronizado a ele (`lenis.on('scroll', ScrollTrigger.update)` + `gsap.ticker.add(t => lenis.raf(t * 1000))` + `gsap.ticker.lagSmoothing(0)`). O `subscribe()` de `src/lib/motion.ts` e o ticker do Lenis não podem coexistir como loops independentes — migre `src/lib/motion.ts` para cima do Lenis/GSAP ou remova o que for substituído (§ arquitetura única de motion). Nunca crie um terceiro loop.
- GSAP em React: sempre `gsap.context()` (ou `useGSAP`) com cleanup; zero timeline duplicada em StrictMode; `ScrollTrigger.refresh()` no resize.
- `useScrollProgress` só calcula enquanto o elemento está visível e libera o ticker quando sai.
- Lenis respeita `prefers-reduced-motion`: com movimento reduzido, não instanciar Lenis (scroll nativo) e encurtar/desligar ScrollTrigger; scroll por teclado, âncoras e foco continuam funcionais.
- Reveals usam `data-reveal` (deslocamento) e `data-reveal-mask` (máscara). **A máscara vai no elemento pai** — o `IntersectionObserver` zera a área de um elemento que tem `clip-path`, então o alvo observado nunca pode ser o recortado.
- Toda animação precisa de caminho para `prefers-reduced-motion`.

## Antes de abrir PR

```bash
npm run build     # tsc --noEmit + vite build; precisa passar limpo
npm run preview   # confira 360, 390, 768, 1024, 1440 e 1920
```

Verifique: console sem erros, nenhum recurso 4xx/5xx, nada transbordando na horizontal, navegação por teclado começando pelo skip link, e o Método construindo o desenho do início ao fim.

## Publicação

`push` na `main` dispara `.github/workflows/deploy.yml`, que roda o build e publica em <https://cf-web-studio.github.io/>. Qualquer outra branch não publica nada.
