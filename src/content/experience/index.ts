import type { ExperienceItem, SkillCategory } from '@/types/portfolio';

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'itti-digital-engineer',
    company: 'ITTI Digital',
    role: {
      es: 'Digital Engineer',
      en: 'Digital Engineer',
    },
    period: {
      es: 'Diciembre 2023 – Fecha de finalización pendiente de confirmar',
      en: 'December 2023 – End date pending confirmation',
    },
    current: true,
    summary: {
      es: 'Desarrollo, mantenimiento y evolución de sistemas empresariales en producción, incluyendo aplicaciones ERP, comercio electrónico, facturación electrónica, bases de datos e integraciones entre plataformas.',
      en: 'Development, maintenance, and evolution of production enterprise systems, including ERP platforms, e-commerce, electronic invoicing, databases, and cross-system integrations.',
    },
    highlights: {
      es: [
        'Implementación y mantenimiento de lógica de negocio en sistemas ERP y módulos administrativos.',
        'Desarrollo de integraciones con plataformas de facturación electrónica y servicios externos.',
        'Resolución de incidencias en producción, optimización de consultas SQL y mejora de estabilidad.',
        'Participación en modernización de aplicaciones legacy y remediación de hallazgos de seguridad.',
      ],
      en: [
        'Implementation and maintenance of business logic across ERP systems and administrative modules.',
        'Development of integrations with electronic invoicing platforms and external services.',
        'Production incident resolution, SQL query optimization, and stability improvements.',
        'Participation in legacy application modernization and security finding remediation.',
      ],
    },
    technologies: ['PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'Docker', 'AWS EC2', 'Checkmarx'],
  },
  {
    id: 'epem-dev-lead',
    company: 'Grupo EPEM',
    role: {
      es: 'Líder de Desarrollo',
      en: 'Development Lead',
    },
    period: {
      es: 'Julio 2023 – Diciembre 2023',
      en: 'July 2023 – December 2023',
    },
    current: false,
    summary: {
      es: 'Coordinación del equipo de desarrollo, análisis de requerimientos técnicos y funcionales, y acompañamiento en las implementaciones de software.',
      en: 'Coordination of the development team, technical and functional requirements analysis, and guidance during software implementations.',
    },
    highlights: {
      es: [
        'Coordinación técnica del equipo para organizar entregas y prioridades de desarrollo.',
        'Análisis de requerimientos junto a áreas operativas para traducir necesidades en tareas técnicas.',
        'Acompañamiento en implementaciones y revisión de soluciones sobre aplicaciones existentes.',
      ],
      en: [
        'Technical coordination of the team to structure deliveries and development priorities.',
        'Requirements analysis with operational stakeholders to translate needs into technical tasks.',
        'Guidance on implementations and solution reviews across existing applications.',
      ],
    },
    technologies: ['PHP', 'Laravel', 'MySQL', 'Vue.js', 'Linux'],
  },
  {
    id: 'epem-software-developer',
    company: 'Grupo EPEM',
    role: {
      es: 'Desarrollador de Software',
      en: 'Software Developer',
    },
    period: {
      es: 'Agosto 2021 – Julio 2023',
      en: 'August 2021 – July 2023',
    },
    current: false,
    summary: {
      es: 'Desarrollo de aplicaciones web en PHP/Laravel y mantenimiento continuo de bases de datos MySQL orientadas a procesos internos del negocio.',
      en: 'Development of PHP/Laravel web applications and continuous maintenance of MySQL databases supporting internal business processes.',
    },
    highlights: {
      es: [
        'Construcción y evolución de funcionalidades backend y vistas administrativas con PHP y Laravel.',
        'Mantenimiento, modelado y ajuste de consultas sobre bases de datos MySQL.',
        'Corrección de errores y soporte evolutivo sobre aplicaciones en operación.',
      ],
      en: [
        'Building and evolving backend features and administrative views with PHP and Laravel.',
        'Maintenance, schema adjustments, and query tuning on MySQL databases.',
        'Bug fixing and evolutionary support for active business applications.',
      ],
    },
    technologies: ['PHP', 'Laravel', 'MySQL', 'JavaScript', 'Vue.js'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'backend',
    title: {
      es: 'Backend',
      en: 'Backend',
    },
    description: {
      es: 'Especialización principal en arquitectura de negocio, APIs y evolución de sistemas.',
      en: 'Primary specialization in business architecture, APIs, and system evolution.',
    },
    skills: [
      { name: 'PHP', tier: 'core' },
      { name: 'Laravel', tier: 'core' },
      { name: 'Python', tier: 'applied' },
    ],
  },
  {
    id: 'frontend',
    title: {
      es: 'Frontend',
      en: 'Frontend',
    },
    description: {
      es: 'Construcción de interfaces administrativas y aplicaciones web modernas.',
      en: 'Building administrative interfaces and modern web applications.',
    },
    skills: [
      { name: 'JavaScript', tier: 'proficient' },
      { name: 'Vue.js', tier: 'proficient' },
      { name: 'Nuxt', tier: 'applied' },
      { name: 'React', tier: 'applied' },
      { name: 'Next.js', tier: 'applied' },
      {
        name: 'TypeScript',
        tier: 'applied',
        note: {
          es: 'Uso en proyectos personales; experiencia profesional por confirmar',
          en: 'Used in personal projects; professional experience pending confirmation',
        },
      },
    ],
  },
  {
    id: 'databases',
    title: {
      es: 'Bases de Datos',
      en: 'Databases',
    },
    description: {
      es: 'Modelado relacional, integridad referencial y optimización de consultas.',
      en: 'Relational modeling, referential integrity, and query optimization.',
    },
    skills: [
      { name: 'PostgreSQL', tier: 'core' },
      { name: 'MySQL', tier: 'core' },
    ],
  },
  {
    id: 'cloud-devops',
    title: {
      es: 'Cloud & DevOps',
      en: 'Cloud & DevOps',
    },
    description: {
      es: 'Infraestructura, contenedores y pipelines de integración y despliegue.',
      en: 'Infrastructure, containerization, and continuous integration/delivery pipelines.',
    },
    skills: [
      { name: 'Docker', tier: 'proficient' },
      { name: 'Linux', tier: 'proficient' },
      { name: 'AWS', tier: 'applied' },
      { name: 'EC2', tier: 'applied' },
      { name: 'GitHub Actions', tier: 'proficient' },
      { name: 'Jenkins', tier: 'applied' },
      { name: 'Nullplatform', tier: 'applied' },
    ],
  },
  {
    id: 'security',
    title: {
      es: 'Seguridad Aplicativa',
      en: 'Application Security',
    },
    description: {
      es: 'Análisis estático, prevención de vulnerabilidades y endurecimiento de controles.',
      en: 'Static analysis, vulnerability prevention, and access control hardening.',
    },
    skills: [
      { name: 'OWASP Top 10', tier: 'core' },
      { name: 'Checkmarx (SAST)', tier: 'proficient' },
      { name: 'Control de acceso y autenticación', tier: 'core' },
      { name: 'Remediación de vulnerabilidades', tier: 'core' },
    ],
  },
  {
    id: 'ai-engineering',
    title: {
      es: 'Ingeniería Asistida por IA',
      en: 'AI-Assisted Engineering',
    },
    description: {
      es: 'Diseño de flujos reproducibles, contexto estructurado y orquestación de agentes.',
      en: 'Reproducible workflows, structured context design, and agent orchestration.',
    },
    skills: [
      { name: 'Spec-Driven Development (SDD)', tier: 'core' },
      { name: 'Agentes de IA y Sistemas Multiagente', tier: 'core' },
      { name: 'Model Context Protocol (MCP)', tier: 'proficient' },
      { name: 'Skills, Rules & Workflows', tier: 'core' },
    ],
  },
];
