# CF Web Studio — site oficial

Site da **CF Web Studio** (Carlos & Felipe). Conceito: **da ideia à experiência digital**.

Publicado em <https://cf-web-studio.github.io/> pelo GitHub Pages, a partir da branch `main`.

## Stack

| Camada | Escolha | Por quê |
| --- | --- | --- |
| Aplicação | React 19 + TypeScript + Vite | Continuidade com o projeto anterior da CF; saída estática, ideal para Pages |
| Estilo | Tailwind CSS v4 + camada própria de tokens | Utilitários para layout, CSS autoral para o sistema visual |
| Movimento | Código próprio (`src/lib/motion.ts`) | Um único `requestAnimationFrame` compartilhado, `IntersectionObserver` e `position: sticky` — sem biblioteca de animação |
| Gráfico assinatura | Canvas 2D com projeção própria (`src/lib/nucleo.ts`) | Objeto exclusivo, ~6 kB de código, sem WebGL nem modelos de terceiros |
| Tipografia | Bricolage Grotesque · Instrument Sans · JetBrains Mono | Variáveis, subsetadas e servidas do próprio domínio (`public/fonts`) |

**Dependências de runtime: `react` e `react-dom`.** Nada mais chega ao navegador além do código do próprio site.

## Comandos

```bash
npm install
npm run dev       # servidor local em http://localhost:3000
npm run lint      # checagem de tipos (tsc --noEmit)
npm run build     # checagem de tipos + build de produção em dist/
npm run preview   # serve dist/ em http://localhost:4173
```

## Estrutura

```
index.html                 metadados, dados estruturados e fallback sem JS
public/
  cf-mark.svg              símbolo da marca
  favicon.svg              ícone
  og-cf-web-studio.png     imagem de compartilhamento (1200×630)
  fonts/                   woff2 variáveis subsetadas
  robots.txt · sitemap.xml
src/
  styles/index.css         design system: cor, tipografia, espaço, motion tokens
  lib/motion.ts            ticker único, easings, tier de dispositivo
  lib/hooks.ts             reveal, progresso de scroll, seção ativa, reduced-motion
  lib/nucleo.ts            o objeto assinatura (Núcleo CF)
  data/brand.ts            marca, contatos, links de WhatsApp
  data/content.ts          todo o conteúdo editorial em um lugar só
  components/              uma seção por arquivo
```

## Conceito visual

A página inteira executa uma narrativa: **ideia → traço → estrutura → sistema → interface → experiência**.

- **Abertura.** O Núcleo CF nasce como partículas dispersas, encontra a circunferência (o mesmo anel aberto do símbolo), ganha estrutura e fecha em volume. O rótulo abaixo do hero nomeia o estado corrente — é informação, não enfeite.
- **Método.** Um desenho técnico se constrói linha a linha conforme o scroll: ponto → eixos → wireframe → nós → trajetórias → cotas → interface resolvida.
- **Ritmo.** Seções escuras (cinematográficas) alternam com seções claras em papel técnico (editoriais). O teal é acento, nunca preenchimento.

## Conteúdo e honestidade

Não há cliente, número, prêmio ou depoimento inventado. As demonstrações usam a **Forno Nobile**, marca conceitual criada pela CF e identificada como tal em todos os lugares onde aparece.

## Performance e acessibilidade

- Animação pausa fora da viewport e com a aba oculta; `prefers-reduced-motion` desliga o loop e entrega o estado final estático.
- Contagem de partículas e DPR se ajustam à capacidade do dispositivo.
- Larguras pequenas recebem composição própria (o Método, por exemplo, troca a lista de sete etapas por régua de progresso + etapa corrente).
- HTML semântico, landmarks, ordem de títulos sem salto, skip link, foco visível, alvos de toque de 44 px+, formulário rotulado.

## Formulário de contato

Não existe backend. O formulário valida no cliente, monta a mensagem e abre o WhatsApp (ou o cliente de e-mail). **Nada é armazenado e nenhuma chave de API existe no front-end.**
