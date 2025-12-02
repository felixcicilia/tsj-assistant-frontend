type FooterLink = {
  title: string
  items: {
    name: string
    link?: string
    icon?: string
    offices?: any[]
    image?: string
    description?: string
  }[]
}

type TopLink = {
  name: string
  link?: string
}

const footerLinks: FooterLink[] = [
  {
    title: 'MENÚ',
    items: [
      { name: 'Home', link: '/home' },
      { name: 'Promociones', link: '/promotions' },
      { name: 'Empresa', link: '/business/global' },
      { name: 'Asesores', link: '/advisors' },
      { name: 'Planificador', link: '/destiny' },
      { name: 'Solvencia en Europa', link: '/solvencia' },
      { name: 'Calcular Financiamiento', link: '/financescalculator' },
      { name: 'Calcular Viaje', link: '/calculator' },
      { name: 'Ratrea tus Vuelos', link: '/flight' },
      { name: 'Consultar Visa', link: '/visa' },
      { name: 'FAQ', link: '/faq' },
      { name: 'Contacto', link: '/contact' },
    ],
  },
  {
    title: 'TELÉFONOS',
    items: [
      {
        name: 'Venezuela',
        offices: [
          { name: 'Caracas', address: '+58 424-1542685' },
          { name: 'Valencia', address: '+58 424-4097684' },
          { name: 'Barquisimeto', address: '+58 424-5239195' },
        ],
      },
      {
        name: 'España',
        offices: [
          { name: 'Madrid', address: '+34 655 20 45 86' },
          { name: 'Barcelona', address: '+34 655205035' },
        ],
      },
      {
        name: 'Argentina',
        offices: [{ name: 'Buenos Aires', address: '+54 1178543970' }],
      },
      {
        name: 'Colombia',
        offices: [
          { name: 'Bogotá', address: '+57 313 8897876' },
          { name: 'Medellín', address: '+57 323 3932626' },
        ],
      },
      { name: 'Estados Unidos', offices: [{ name: 'Miami', address: '' }] },
      { name: 'Panama', offices: [{ name: 'Panamá', address: '' }] },
      { name: 'Peru', offices: [{ name: 'Lima', address: '+51 981 255 261' }] },
      {
        name: 'Chile',
        offices: [{ name: 'Santiago de Chile', address: '+56 9 6141 4833' }],
      },
      {
        name: 'Ecuador',
        offices: [{ name: 'Quito', address: '+593 96 231 8390' }],
      },
    ],
  },
  {
    title: 'Oficinas',
    items: [
      {
        name: 'Venezuela',
        link: 'https://www.instagram.com/arcadia.viajes/',
        icon: '🇻🇪',
        description: 'Arcadia Venezuela: Viaja feliz, Viaja Arcadia.',
        image: 'assets/images/logosArcadia/venezuela.jpg',
        offices: [
          {
            name: 'Caracas',
            link: '',
            icon: '',
            address: 'Av. Francisco de Miranda, Torre Cavendes, oficina 6-02.',
          },
          {
            name: 'Valencia',
            link: '',
            icon: '',
            address: 'Av. Bolívar Norte, Torre Majay, oficina principal.',
          },
          {
            name: 'Barquisimeto',
            link: '',
            icon: '',
            address: 'Av. Los Leones, CC. Los Leones, Local #24.',
          },
        ],
      },
      {
        name: 'España',
        link: 'https://www.instagram.com/arcadiaviajes.es/',
        icon: '🇪🇸',
        description: 'Arcadia España: Viajamos contigo por el mundo.',
        image: 'assets/images/logosArcadia/spain.jpg',
        offices: [
          {
            name: 'Madrid',
            link: '',
            icon: '',
            address: 'Calle Alcalá 22. Piso 2, puerta DR. 28014. Madrid',
          },
          {
            name: 'Barcelona',
            link: '',
            icon: '',
            address: 'Bussines Center, Passeig de Grácia 5.0, 08007.',
          },
        ],
      },
      {
        name: 'Argentina',
        link: 'https://www.instagram.com/arcadiaviajes.arg/',
        icon: '🇦🇷',
        description: 'Arcadia Argentina: Potenciando tus ideas con pasión.',
        image: 'assets/images/logosArcadia/argentina.jpg',
        offices: [
          {
            name: 'Buenos Aires',
            link: '',
            icon: '',
            address:
              'Lavalle 669 Local 12, C1047AAM Cdad. Autónoma de Buenos Aires',
          },
        ],
      },
      {
        name: 'Colombia',
        link: 'https://www.instagram.com/arcadiaviajes.co/',
        icon: '🇨🇴',
        description: 'Arcadia Colombia: Innovación que transforma vidas.',
        image: 'assets/images/logosArcadia/colombia.jpg',
        offices: [
          {
            name: 'Medellín',
            link: '',
            icon: '',
            address:
              'El Poblado - Carrera 43 A # 5A - 113 One Plaza Bussines Center Piso 7 Int 713',
          },
          {
            name: 'Bogotá',
            link: '',
            icon: '',
            address: 'Edificio Varese, calle 98 #18-7. Bogotá DC',
          },
        ],
      },
      {
        name: 'Estados Unidos',
        link: 'https://www.instagram.com/arcadiaviajes.usa/',
        icon: '🇺🇸',
        description: 'Arcadia USA: Tecnología y futuro en tus manos.',
        image: 'assets/images/logosArcadia/eeuu.jpg',
        offices: [
          {
            name: 'Miami',
            link: '',
            icon: '',
            address: '8350 nw 52ter Suite 301 doral Florida 33166 oficina 199.',
          },
        ],
      },
      {
        name: 'Panamá',
        link: 'https://www.instagram.com/arcadiaviajes.pa/',
        icon: '🇵🇦',
        description: 'Arcadia Panamá: El viaje de tus sueños.',
        image: 'assets/images/logosArcadia/panama.jpg',
        offices: [
          {
            name: 'Panamá',
            link: '',
            icon: '',
            address:
              'Av. Centenario, Torre Aseguradora Ancon, oficina 14K, Costa del Este, Panamá.',
          },
        ],
      },
      {
        name: 'Perú',
        link: 'https://www.instagram.com/arcadiaviajes.pe/',
        icon: '🇵🇪',
        description: 'Arcadia Perú: Innovación al alcance de todos.',
        image: 'assets/images/logosArcadia/peru.jpg',
        offices: [
          {
            name: 'Lima',
            link: '',
            icon: '',
            address:
              'Av. Primavera 120, Santiago de Surco. Lima, Edificio C / Oficina C-8.',
          },
        ],
      },
      {
        name: 'Chile',
        link: 'https://www.instagram.com/arcadiaviajes.cl/',
        icon: '🇨🇱',
        description: 'Arcadia Chile: Creando conexiones que importan.',
        image: 'assets/images/logosArcadia/chile.jpg',
        offices: [
          {
            name: 'Santiago de Chile',
            link: '',
            icon: '',
            address: 'Serrano 73, torre Snap, piso 3 oficina 313. Stgo. Chile.',
          },
        ],
      },
      {
        name: 'Ecuador',
        link: 'https://www.instagram.com/arcadiaviajes.ec/',
        icon: '🇪🇨',
        description: 'Arcadia Ecuador: Inspirando el cambio que necesitamos.',
        image: 'assets/images/logosArcadia/ecuador.jpg',
        offices: [
          {
            name: 'Quito',
            link: '',
            icon: '',
            address:
              'Av. Moscú y Av. Noruega, Edificio Moscú Platz, piso 1, oficina 4.',
          },
        ],
      },
    ],
  },
]

const topLinks: TopLink[] = [
  { name: 'Flights', link: '/flights/home' },
  { name: 'Hotels', link: '/hotels/home' },
  { name: 'Tours', link: '/tours/home' },
  { name: 'Cabs', link: '/cabs/home' },
  { name: 'About', link: '/pages/about' },
  { name: 'Contact us', link: '/pages/contact' },
  { name: 'Blogs', link: '/blogs/blog' },
  { name: 'Services', link: '/help/service' },
  { name: 'Detail page', link: '/directories/detail' },
  { name: 'Policy', link: '/help/privacy-policy' },
  { name: 'Testimonials', link: '/hotels/home#hotels-home-testimonial' },
  { name: 'Newsletters', link: '/blogs/detail' },
  { name: 'Podcasts', link: '/' },
  { name: 'Protests', link: '/' },
  { name: 'NewsCyber', link: '/' },
  { name: 'Education', link: '/' },
  { name: 'Sports', link: '/' },
  { name: 'Tech and Auto', link: '/' },
  { name: 'Opinion', link: '/' },
  { name: 'Share Market', link: '/' },
]

export const footer2Link: TopLink[] = [
  {
    name: 'About',
    link: '/pages/about',
  },
  {
    name: 'Terms',
    link: '/help/service',
  },
  {
    name: 'Privacy',
    link: '/help/privacy-policy',
  },
  {
    name: 'Career',
    link: '/',
  },
  {
    name: 'Contact us',
    link: '/pages/contact',
  },
  {
    name: 'Cookies',
    link: '/',
  },
]
export const footer3Link: TopLink[] = [
  {
    name: 'About',
    link: '/pages/about',
  },
  {
    name: 'Policy',
    link: '/help/privacy-policy',
  },
  {
    name: 'Terms & Condition',
    link: '/help/service',
  },
]

const footer4Link: FooterLink[] = [
  {
    title: 'Page',
    items: [
      { name: 'About us', link: '/pages/about' },
      { name: 'Contact us', link: '/pages/contact' },
      { name: 'News and Blog', link: '/blogs/blog' },
      { name: 'Meet a Team', link: '/pages/our-team' },
    ],
  },
  {
    title: 'Link',
    items: [
      { name: 'Sign up', link: '/auth/sign-up' },
      { name: 'Sign in', link: '/auth/sign-in' },
      { name: 'Privacy Policy', link: '/help/privacy-policy' },
      { name: 'Terms', link: '/help/service' },
      { name: 'Cookie', link: '/' },
      { name: 'Support', link: '/help/center' },
    ],
  },
]

export { footerLinks, topLinks, footer4Link }
