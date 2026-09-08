export const BRAND = {
  name: 'CF Web Studio',
  nameUpper: 'CF WEB STUDIO',
  signature: 'Carlos & Felipe',
  role: 'Estúdio de design e desenvolvimento web',
  tagline: 'Da ideia à experiência digital.',
  siteUrl: 'https://cf-web-studio.github.io/',
  phone: '5511917301110',
  phoneDisplay: '(11) 91730-1110',
  email: 'cfwebstudiocarlosfelipe@gmail.com',
  instagram: 'https://www.instagram.com/cfwebstudio.br/',
  instagramDisplay: '@cfwebstudio.br',
  coverage: 'Atendimento online para empresas de todo o Brasil.',
} as const;

const wa = (text: string) =>
  `https://wa.me/${BRAND.phone}?text=${encodeURIComponent(text)}`;

export const WHATSAPP = {
  general: wa(
    'Olá! Vim pelo site da CF Web Studio e gostaria de conversar sobre um projeto.',
  ),
  floating: wa('Olá! Vim pelo site da CF Web Studio e gostaria de saber mais sobre os serviços.'),
  briefing: wa(
    'Olá! Vim pelo site da CF Web Studio e quero começar um projeto. Posso passar o briefing por aqui?',
  ),
  plan: (plan: string) =>
    wa(`Olá! Vim pelo site da CF Web Studio e quero entender melhor o nível ${plan}.`),
} as const;

export const MAILTO = `mailto:${BRAND.email}?subject=${encodeURIComponent(
  '[CF Web Studio] Novo projeto',
)}`;
