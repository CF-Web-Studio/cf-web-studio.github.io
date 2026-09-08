/**
 * Conteúdo do site. Tudo aqui é verificável: nenhum cliente, número,
 * resultado, prêmio ou depoimento inventado.
 */

export interface Capability {
  id: string;
  index: string;
  title: string;
  summary: string;
  detail: string;
  facets: string[];
}

export const CAPABILITIES: Capability[] = [
  {
    id: 'sites',
    index: '01',
    title: 'Sites institucionais',
    summary: 'A empresa explicada em uma leitura só.',
    detail:
      'Estruturamos a informação antes de desenhar a página: o que o visitante precisa entender primeiro, o que sustenta a decisão dele e onde ele age. O resultado é um site que apresenta a empresa com a mesma clareza de uma boa reunião.',
    facets: ['Arquitetura de informação', 'Direção visual própria', 'Conteúdo hierarquizado'],
  },
  {
    id: 'landing',
    index: '02',
    title: 'Landing pages',
    summary: 'Uma página, um objetivo, nenhuma distração.',
    detail:
      'Página construída em torno de uma única decisão: campanha, produto, serviço ou captação. Cada bloco existe para reduzir dúvida e encurtar o caminho até o contato.',
    facets: ['Foco em uma ação', 'Carregamento imediato', 'Contato direto no WhatsApp'],
  },
  {
    id: 'experiencias',
    index: '03',
    title: 'Experiências digitais',
    summary: 'Quando o site precisa ser lembrado, não apenas visitado.',
    detail:
      'Narrativa conduzida pelo scroll, composições em tela cheia, movimento com função e elementos gráficos autorais. É o formato para marcas cujo diferencial é difícil de explicar em texto — e fácil de sentir em tela.',
    facets: ['Storytelling por scroll', 'Motion editorial', 'Elemento gráfico assinatura'],
  },
  {
    id: 'sob-medida',
    index: '04',
    title: 'Desenvolvimento sob medida',
    summary: 'Quando o pronto não resolve.',
    detail:
      'Painéis, catálogos, calculadoras, áreas internas e fluxos específicos da operação. Escrevemos código de aplicação, com componentes reutilizáveis e estrutura preparada para crescer.',
    facets: ['React e TypeScript', 'Componentes reutilizáveis', 'Base preparada para evoluir'],
  },
  {
    id: 'redesign',
    index: '05',
    title: 'Redesign',
    summary: 'O que já funciona fica. O resto é refeito.',
    detail:
      'Auditamos o site atual, preservamos conteúdo, URLs e autoridade conquistada, e reconstruímos identidade, estrutura, responsividade e performance. Modernizar sem começar do zero à toa.',
    facets: ['Auditoria antes do desenho', 'Preservação de SEO', 'Migração sem perda de conteúdo'],
  },
  {
    id: 'performance',
    index: '06',
    title: 'Performance e SEO técnico',
    summary: 'Bonito e leve não são opostos.',
    detail:
      'Orçamento de peso definido no início do projeto, imagens dimensionadas, JavaScript dividido, animação que pausa fora da tela. Do lado do SEO: HTML semântico, metadados completos e dados estruturados quando cabem.',
    facets: ['Orçamento de performance', 'HTML semântico', 'Metadados e dados estruturados'],
  },
  {
    id: 'integracoes',
    index: '07',
    title: 'Integrações e automações',
    summary: 'O site conectado à rotina de quem atende.',
    detail:
      'Formulários que chegam onde a equipe realmente olha, disparo para WhatsApp com a mensagem já formatada, analytics configurado e conexões com as ferramentas que a empresa já usa.',
    facets: ['WhatsApp formatado', 'Analytics e eventos', 'Webhooks e APIs'],
  },
  {
    id: 'motion',
    index: '08',
    title: 'Motion e gráfico 3D',
    summary: 'Movimento como argumento, não como enfeite.',
    detail:
      'Quando faz sentido, construímos o elemento gráfico do projeto em código — geometria procedural, canvas e WebGL — em vez de comprar um banco de imagens. Assim ele é exclusivo, leve e ajustável.',
    facets: ['Geometria procedural', 'Canvas e WebGL', 'Fallback para mobile e reduced-motion'],
  },
];

export interface MethodStage {
  index: string;
  title: string;
  role: string;
  description: string;
  output: string;
}

export const METHOD: MethodStage[] = [
  {
    index: '01',
    title: 'Ideia',
    role: 'Descoberta',
    description:
      'Entendemos o negócio antes do site: o que vende, para quem, com que argumento e onde a conversa costuma travar.',
    output: 'Objetivo do projeto e critérios de sucesso por escrito.',
  },
  {
    index: '02',
    title: 'Direção',
    role: 'Estratégia',
    description:
      'Definimos a arquitetura das páginas, a ordem dos argumentos e a linguagem visual antes de qualquer pixel.',
    output: 'Mapa de páginas, hierarquia de conteúdo e direção visual.',
  },
  {
    index: '03',
    title: 'Design',
    role: 'Composição',
    description:
      'Desenhamos o sistema — tipografia, cor, espaço, grid, estados — e depois as páginas. O sistema é o que mantém tudo coerente.',
    output: 'Design system reduzido e telas principais aprovadas.',
  },
  {
    index: '04',
    title: 'Engenharia',
    role: 'Construção',
    description:
      'Implementamos em componentes, com orçamento de peso definido e acessibilidade tratada durante o desenvolvimento, não depois.',
    output: 'Aplicação funcional, responsiva e versionada.',
  },
  {
    index: '05',
    title: 'Experiência',
    role: 'Ritmo',
    description:
      'Ajustamos movimento, transições, tempos e microinterações até a navegação ter ritmo — e até o que é estático parecer intencional.',
    output: 'Camada de motion calibrada, com fallback para reduced-motion.',
  },
  {
    index: '06',
    title: 'QA',
    role: 'Verificação',
    description:
      'Testamos em larguras reais, com teclado, com o console aberto e com a rede lenta. Corrigimos o que aparece antes de você ver.',
    output: 'Checklist de responsividade, console, links e acessibilidade.',
  },
  {
    index: '07',
    title: 'Entrega',
    role: 'Publicação',
    description:
      'Publicação, domínio, certificado, indexação e uma passagem de bastão para quem vai usar o site no dia a dia.',
    output: 'Site no ar, indexável, com orientação de uso.',
  },
];

export interface Tier {
  id: string;
  index: string;
  name: string;
  positioning: string;
  description: string;
  scope: string[];
  demoUrl: string;
  demoLabel: string;
}

/**
 * Os três níveis são demonstrados com o MESMO projeto conceitual
 * (Forno Nobile — pizzaria fictícia criada pela CF para demonstração),
 * para que a diferença entre níveis seja visível, não descrita.
 */
export const TIERS: Tier[] = [
  {
    id: 'essencial',
    index: '01',
    name: 'Essencial',
    positioning: 'Presença correta',
    description:
      'Uma página objetiva, rápida e bem escrita, com o essencial no lugar certo: o que a empresa faz, por que confiar e como falar com ela.',
    scope: [
      'Página única estruturada',
      'Design a partir do sistema CF',
      'Responsivo em todas as larguras',
      'Contato direto no WhatsApp',
      'Metadados e favicon',
    ],
    demoUrl: 'https://cadus2.github.io/Essencial-Forno-Nobile-Pizzaria/',
    demoLabel: 'Ver nível Essencial',
  },
  {
    id: 'profissional',
    index: '02',
    name: 'Profissional',
    positioning: 'Argumento completo',
    description:
      'Mais seções, mais conteúdo e mais prova. O visitante percorre um argumento inteiro — serviços, diferenciais, dúvidas — antes de decidir.',
    scope: [
      'Tudo do nível Essencial',
      'Múltiplas seções e conteúdo estendido',
      'Catálogo ou galeria estruturada',
      'Formulário com envio formatado',
      'SEO técnico e dados estruturados',
      'Analytics configurado',
    ],
    demoUrl: 'https://cadus2.github.io/Forno-Nobile-Pizzaria/',
    demoLabel: 'Ver nível Profissional',
  },
  {
    id: 'premium',
    index: '03',
    name: 'Premium',
    positioning: 'Experiência autoral',
    description:
      'O projeto ganha direção de arte própria, narrativa conduzida pelo scroll, motion calibrado e elementos gráficos feitos em código para aquele projeto.',
    scope: [
      'Tudo do nível Profissional',
      'Direção de arte exclusiva',
      'Narrativa conduzida pelo scroll',
      'Motion e elementos gráficos autorais',
      'Interações sob medida',
      'QA ampliado em múltiplos dispositivos',
    ],
    demoUrl: 'https://cadus2.github.io/Premium-Forno-Nobile-Pizzaria/',
    demoLabel: 'Ver nível Premium',
  },
];

export interface EngineeringItem {
  index: string;
  title: string;
  description: string;
}

export const ENGINEERING: EngineeringItem[] = [
  {
    index: '01',
    title: 'Peso tratado como decisão de projeto',
    description:
      'O orçamento de bytes é definido junto com a direção visual. Quando um efeito custa mais do que entrega, ele é simplificado — não removido do briefing, resolvido de outro jeito.',
  },
  {
    index: '02',
    title: 'Movimento que sabe parar',
    description:
      'Animação pausa fora da viewport, respeita prefers-reduced-motion e usa um único loop de renderização compartilhado. Nada fica rodando escondido consumindo bateria.',
  },
  {
    index: '03',
    title: 'Responsividade projetada, não espremida',
    description:
      'As larguras pequenas recebem composição própria. Quando o gráfico pesado não faz sentido no celular, ele é substituído por uma versão leve que preserva a narrativa.',
  },
  {
    index: '04',
    title: 'Acessibilidade durante, não depois',
    description:
      'HTML semântico, ordem de títulos correta, navegação por teclado, foco visível, contraste verificado e alternativas textuais. Feito enquanto se constrói custa pouco; feito depois, custa refação.',
  },
  {
    index: '05',
    title: 'SEO técnico como base',
    description:
      'Título, descrição, canonical, Open Graph, robots, sitemap e dados estruturados quando realmente se aplicam. Em redesign, o conteúdo e as URLs existentes são preservados.',
  },
  {
    index: '06',
    title: 'Código que outra pessoa consegue ler',
    description:
      'Componentes com responsabilidade única, tokens de design centralizados e tipagem estática. O projeto é entregue em repositório, versionado, pronto para receber manutenção.',
  },
];

export interface Differential {
  index: string;
  title: string;
  description: string;
}

export const DIFFERENTIALS: Differential[] = [
  {
    index: '01',
    title: 'Você fala com quem constrói',
    description:
      'Não há camada de atendimento entre você e o projeto. Quem entende o briefing é quem desenha e quem escreve o código — o que some no caminho é o ruído, não a informação.',
  },
  {
    index: '02',
    title: 'A estrutura vem antes da estética',
    description:
      'Definimos o que precisa ser dito e em que ordem antes de escolher cor e tipografia. Site bonito com argumento desorganizado continua sendo um site que não convence.',
  },
  {
    index: '03',
    title: 'O gráfico é feito para o projeto',
    description:
      'Quando um projeto pede um elemento visual forte, ele é construído em código para aquele cliente. É por isso que o objeto desta página não existe em nenhum banco de imagens.',
  },
  {
    index: '04',
    title: 'Nada de número inventado',
    description:
      'Não exibimos métricas, prêmios, depoimentos ou logotipos de clientes que não existam. O que mostramos aqui é trabalho nosso, identificado como demonstração quando é demonstração.',
  },
  {
    index: '05',
    title: 'Entrega com o repositório junto',
    description:
      'O projeto termina versionado e documentado. Se um dia outra pessoa assumir a manutenção, ela encontra um código legível — e não um site refém de quem o fez.',
  },
  {
    index: '06',
    title: 'Projetado para a segunda versão',
    description:
      'Toda empresa muda. A arquitetura é montada para receber páginas, seções e integrações novas sem precisar refazer o que já está no ar.',
  },
];

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    id: 'investimento',
    question: 'Quanto custa um site com vocês?',
    answer:
      'Depende do nível de entrega, da quantidade de páginas e das funcionalidades. Depois de entender o projeto, enviamos uma proposta com escopo e prazo definidos — sem valor genérico de tabela.',
  },
  {
    id: 'prazo',
    question: 'Qual é o prazo de entrega?',
    answer:
      'O cronograma é definido antes do início, junto com o escopo. Projetos de página única costumam ser mais rápidos que sites com muitas seções ou funcionalidades sob medida.',
  },
  {
    id: 'niveis',
    question: 'Qual é a diferença real entre Essencial, Profissional e Premium?',
    answer:
      'Profundidade de conteúdo, quantidade de recursos e nível de direção de arte. Para tornar isso visível, demonstramos o mesmo projeto conceitual nos três níveis — você compara antes de escolher.',
  },
  {
    id: 'celular',
    question: 'O site funciona bem no celular?',
    answer:
      'Sim. As larguras pequenas recebem composição própria, e não uma versão comprimida do desktop. Testamos de 360px a 1920px antes de entregar.',
  },
  {
    id: 'atendimento',
    question: 'Vocês atendem empresas de outras cidades?',
    answer:
      'Sim. O atendimento é online e trabalhamos com empresas e profissionais de todo o Brasil.',
  },
  {
    id: 'manutencao',
    question: 'Depois de publicado, quem cuida do site?',
    answer:
      'Podemos seguir com manutenção e melhorias, ou entregar o projeto documentado para a sua equipe. O código é seu e fica em repositório versionado nos dois casos.',
  },
  {
    id: 'redesign',
    question: 'Tenho um site antigo. Vou perder o que já está no Google?',
    answer:
      'Não, se o redesign for feito com cuidado. Preservamos conteúdo, estrutura de URLs e metadados existentes, e só mudamos o que tem motivo técnico ou editorial para mudar.',
  },
]; 

export const NAV = [
  { id: 'manifesto', label: 'Manifesto' },
  { id: 'capacidades', label: 'Capacidades' },
  { id: 'metodo', label: 'Método' },
  { id: 'projetos', label: 'Projetos' },
  { id: 'niveis', label: 'Níveis' },
  { id: 'engenharia', label: 'Engenharia' },
  { id: 'contato', label: 'Contato' },
] as const;
