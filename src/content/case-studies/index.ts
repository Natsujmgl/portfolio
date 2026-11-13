import type { CaseStudy } from '@/types/portfolio';

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'legacy-security-hardening',
    order: '01',
    category: 'security',
    diagramType: 'security-hardening',
    visibility: 'private-professional',
    title: {
      es: 'Endurecimiento de Seguridad en Aplicación Legacy',
      en: 'Legacy Application Security Hardening',
    },
    subtitle: {
      es: 'Remediación OWASP Top 10, control de acceso y análisis SAST en monolito PHP 5.3 / CakePHP 1.3',
      en: 'OWASP Top 10 remediation, access control hardening, and SAST triage on a PHP 5.3 / CakePHP 1.3 monolith',
    },
    summary: {
      es: 'Fortalecimiento sistemático de controles de autenticación, autorización y protección de datos en una aplicación empresarial heredada sin interrumpir su operación diaria.',
      en: 'Systematic strengthening of authentication, authorization, and data protection controls in a legacy enterprise application without disrupting daily operations.',
    },
    scopeBadge: {
      es: 'Seguridad Aplicativa · Legacy',
      en: 'Application Security · Legacy',
    },
    contextTags: ['PHP 5.3', 'CakePHP 1.3', 'OWASP Top 10', 'Checkmarx SAST', 'RBAC'],
    sections: {
      technicalContext: {
        es: 'Aplicación monolítica empresarial en producción construida sobre PHP 5.3 y CakePHP 1.3, con múltiples módulos internos desarrollados a lo largo de varios años y validada periódicamente mediante análisis estático de seguridad (SAST) con Checkmarx.',
        en: 'Production enterprise monolithic application built on PHP 5.3 and CakePHP 1.3, spanning multiple internal modules accumulated over several years and audited periodically through static application security testing (SAST) with Checkmarx.',
      },
      problem: {
        es: 'El código heredado presentaba patrones inseguros habituales de su época: consultas vulnerables a SQL Injection, ausencia de tokens CSRF consistentes en acciones sensibles, verificaciones insuficientes de propiedad de recursos (IDOR) y brechas en la validación de privilegios por rol.',
        en: 'The inherited codebase contained security patterns common to older implementations: queries exposed to SQL Injection, inconsistent CSRF protection on state-changing actions, insufficient resource ownership checks (IDOR), and gaps in role-based privilege enforcement.',
      },
      challenges: {
        es: [
          'Operar dentro de las restricciones técnicas de PHP 5.3 y CakePHP 1.3 sin disponer de protecciones modernas integradas por defecto.',
          'Corregir fallas de autorización y consultas SQL sin romper flujos administrativos críticos ni integraciones existentes.',
          'Diferenciar verdaderos positivos de falsos positivos en los reportes de Checkmarx antes de priorizar cada remediación.',
        ],
        en: [
          'Operating within the technical constraints of PHP 5.3 and CakePHP 1.3 without modern framework security defaults.',
          'Fixing authorization flaws and SQL queries without breaking critical administrative workflows or existing integrations.',
          'Separating true positives from false positives in Checkmarx SAST reports before prioritizing each remediation.',
        ],
      },
      personalContribution: {
        es: [
          'Análisis y clasificación de hallazgos reportados por Checkmarx (SAST) en módulos prioritarios.',
          'Implementación de remediaciones puntuales para SQL Injection, CSRF, IDOR y escalamiento de privilegios.',
          'Refuerzo de las validaciones de autorización basada en roles (RBAC) en controladores y endpoints sensibles.',
        ],
        en: [
          'Triage and classification of Checkmarx (SAST) findings across priority modules.',
          'Implementation of targeted remediations for SQL Injection, CSRF, IDOR, and privilege escalation.',
          'Strengthening of role-based access control (RBAC) checks across sensitive controllers and endpoints.',
        ],
      },
      engineeringDecisions: {
        es: [
          'Priorizar controles de autorización del lado servidor verificando identidad, rol y pertenencia del recurso en cada acción, en lugar de confiar en restricciones ocultas en la interfaz.',
          'Estandarizar el saneamiento y parametrización de consultas compatibles con la capa de datos de CakePHP 1.3 en lugar de reescribir módulos completos de forma riesgosa.',
          'Introducir validación de tokens CSRF en operaciones que modifican estado, manteniendo compatibilidad con formularios existentes.',
        ],
        en: [
          'Prioritize server-side authorization checks verifying identity, role, and resource ownership per action rather than relying on hidden UI controls.',
          'Standardize query parameterization and escaping compatible with CakePHP 1.3 data layers instead of risky full-module rewrites.',
          'Introduce CSRF token verification on state-changing operations while preserving compatibility with existing forms.',
        ],
      },
      implementedSolution: {
        es: 'Se aplicó una estrategia de defensa en profundidad por capas: validación estricta de sesión y roles antes de ejecutar lógica de negocio, verificación explícita de propiedad de registros para mitigar IDOR, uso consistente de enlaces parametrizados para eliminar vectores de SQL Injection y validación de tokens anti-CSRF en mutaciones, validando cada cambio con nuevas ejecuciones de Checkmarx.',
        en: 'A layered defense-in-depth approach was applied: strict session and role validation prior to business logic execution, explicit record-ownership verification to mitigate IDOR, consistent parameterized bindings to eliminate SQL Injection vectors, and anti-CSRF token validation on mutations, re-verifying fixes against subsequent Checkmarx scans.',
      },
      technologies: [
        'PHP 5.3',
        'CakePHP 1.3',
        'OWASP Top 10',
        'Checkmarx (SAST)',
        'MySQL / SQL',
        'RBAC',
      ],
      verifiableResults: {
        es: [
          'Eliminación de hallazgos críticos y altos identificados en los ciclos de análisis SAST sobre los módulos intervenidos.',
          'Fortalecimiento verificable de los límites de acceso entre roles y protección frente a manipulación directa de identificadores (IDOR).',
          'Continuidad operativa del sistema legado sin regresiones reportadas durante las entregas.',
        ],
        en: [
          'Closure of high-severity SAST findings identified across the remediated modules.',
          'Verifiable strengthening of role boundaries and protection against direct identifier manipulation (IDOR).',
          'Continuous operation of the legacy platform without regressions introduced during rollout.',
        ],
      },
      learnings: {
        es: [
          'La seguridad aplicativa no depende de tener el último framework: exige validar invariantes de autorización en el servidor y entender cómo fluyen los datos desde la entrada hasta la base de datos.',
          'El análisis SAST es una herramienta de diagnóstico valiosa cuando se combina con criterio de dominio para distinguir riesgos reales de ruido sintáctico.',
        ],
        en: [
          'Application security does not depend on running the latest framework: it requires enforcing server-side authorization invariants and tracing data flow from input to storage.',
          'SAST tooling becomes truly effective when paired with domain context to separate genuine exploit paths from syntactic noise.',
        ],
      },
    },
  },
  {
    slug: 'legacy-system-modernization',
    order: '02',
    category: 'modernization',
    diagramType: 'legacy-modernization',
    visibility: 'private-professional',
    title: {
      es: 'Modernización de Sistema Legacy (Laravel 5.6 → 10)',
      en: 'Legacy System Modernization (Laravel 5.6 → 10)',
    },
    subtitle: {
      es: 'Participación en la evolución técnica de un monolito empresarial garantizando compatibilidad y continuidad funcional',
      en: 'Technical evolution of an enterprise monolith safeguarding compatibility and functional continuity',
    },
    summary: {
      es: 'Migración técnica y actualización de dependencias de una aplicación empresarial desde Laravel 5.6 hasta Laravel 10, preservando reglas de negocio históricas.',
      en: 'Technical migration and dependency upgrade of an enterprise application from Laravel 5.6 to Laravel 10 while preserving historical business rules.',
    },
    scopeBadge: {
      es: 'Modernización · Laravel',
      en: 'Modernization · Laravel',
    },
    contextTags: ['PHP', 'Laravel 5.6 → 10', 'Composer', 'Refactoring', 'Compatibility'],
    sections: {
      technicalContext: {
        es: 'Monolito empresarial desarrollado originalmente sobre Laravel 5.6 con múltiples integraciones, paquetes de terceros y lógica de negocio acumulada que requería acercarse a una versión con soporte activo y compatibilidad con PHP moderno.',
        en: 'Enterprise monolith originally built on Laravel 5.6 with multiple integrations, third-party packages, and accumulated business logic requiring an upgrade toward a supported release compatible with modern PHP.',
      },
      problem: {
        es: 'Mantener el sistema en Laravel 5.6 incrementaba la deuda técnica, limitaba la actualización del runtime de PHP y bloqueaba la adopción de mejoras de seguridad, rendimiento y dependencias actuales.',
        en: 'Remaining on Laravel 5.6 increased technical debt, blocked PHP runtime upgrades, and prevented adopting current security patches, performance improvements, and maintained packages.',
      },
      challenges: {
        es: [
          'Comprender código heredado con escasa documentación histórica y múltiples dependencias acopladas.',
          'Resolver incompatibilidades acumuladas a través de múltiples versiones mayores de Laravel y PHP.',
          'Mantener la equivalencia funcional del negocio mientras se refactorizaban componentes obsoletos.',
        ],
        en: [
          'Understanding inherited code with sparse historical documentation and tightly coupled dependencies.',
          'Resolving breaking changes accumulated across multiple major releases of Laravel and PHP.',
          'Preserving functional parity for business workflows while refactoring deprecated components.',
        ],
      },
      personalContribution: {
        es: [
          'Lectura y mapeo de módulos existentes para identificar comportamientos críticos antes de modificar dependencias.',
          'Actualización y reemplazo de paquetes incompatibles junto con resolución de errores de compatibilidad entre versiones.',
          'Refactorización de piezas afectadas y verificación funcional de los flujos migrados.',
        ],
        en: [
          'Reading and mapping existing modules to identify critical behavior prior to upgrading dependencies.',
          'Upgrading or replacing incompatible packages and resolving cross-version compatibility issues.',
          'Refactoring affected components and verifying functional behavior across migrated flows.',
        ],
      },
      engineeringDecisions: {
        es: [
          'Priorizar la comprensión del comportamiento real del código antes de refactorizar para evitar cambios silenciosos en reglas de negocio.',
          'Abordar incompatibilidades de dependencias y firmas del framework de forma trazable, aislando ajustes por módulo.',
          'Evitar reescrituras innecesarias fuera del alcance de compatibilidad para reducir el riesgo de regresión.',
        ],
        en: [
          'Prioritize understanding actual runtime behavior before refactoring to avoid silent shifts in business rules.',
          'Address package incompatibilities and framework signature changes traceably, isolating adjustments per module.',
          'Avoid unnecessary rewrites outside the compatibility scope to contain regression risk.',
        ],
      },
      implementedSolution: {
        es: 'Se trabajó sobre la compatibilización progresiva del código base y su árbol de dependencias hacia Laravel 10, adaptando helpers, contratos del framework, configuraciones y código PHP obsoleto, y validando la operación de los flujos críticos tras cada ajuste.',
        en: 'The codebase and its dependency tree were progressively adapted to Laravel 10 by updating helpers, framework contracts, configuration files, and deprecated PHP constructs, validating critical business workflows after each adjustment.',
      },
      technologies: ['PHP', 'Laravel 5.6', 'Laravel 10', 'Composer', 'SQL', 'Git'],
      verifiableResults: {
        es: [
          'Código base compatibilizado con Laravel 10 y versiones modernas de PHP y dependencias activas.',
          'Reducción de deuda técnica derivada de paquetes sin mantenimiento.',
          'Mantenimiento de la continuidad funcional de los procesos empresariales evaluados.',
        ],
        en: [
          'Codebase brought into compatibility with Laravel 10, modern PHP versions, and maintained dependencies.',
          'Reduction of technical debt tied to unmaintained third-party packages.',
          'Preservation of functional continuity across the evaluated enterprise workflows.',
        ],
      },
      learnings: {
        es: [
          'En una migración multi-versión, la disciplina para entender el código legado vale más que la velocidad de reemplazo.',
          'Documentar los puntos de fricción durante la actualización acelera futuras evoluciones del equipo.',
        ],
        en: [
          'During a multi-version upgrade, discipline in understanding legacy behavior matters more than replacement speed.',
          'Documenting friction points throughout the upgrade accelerates future team maintenance.',
        ],
      },
    },
  },
  {
    slug: 'ai-development-automation',
    order: '03',
    category: 'ai-automation',
    diagramType: 'ai-workflow',
    visibility: 'private-professional',
    title: {
      es: 'Automatización del Flujo de Desarrollo con IA',
      en: 'AI-Powered Development Automation',
    },
    subtitle: {
      es: 'Orquestación de agentes, skills, rules, MCP y Spec-Driven Development orientada a soporte L3',
      en: 'Orchestration of specialized agents, skills, rules, MCP, and Spec-Driven Development for L3 engineering support',
    },
    summary: {
      es: 'Diseño e implementación de herramientas y flujos automatizados asistidos por IA para acelerar el análisis de incidentes L3 y la preparación de propuestas de solución auditables.',
      en: 'Design and implementation of AI-assisted automation workflows to accelerate L3 incident triage and prepare auditable solution proposals.',
    },
    scopeBadge: {
      es: 'Agentes IA · MCP · SDD',
      en: 'AI Agents · MCP · SDD',
    },
    contextTags: ['AI Agents', 'MCP', 'Spec-Driven Development', 'Skills & Rules', 'L3 Automation'],
    sections: {
      technicalContext: {
        es: 'Entorno de ingeniería con alta demanda de análisis técnico en soporte de tercer nivel (L3), donde cada incidente requiere revisar tickets, inspeccionar múltiples archivos de código, proponer cambios acotados y preparar entregables revisables por el equipo.',
        en: 'Engineering environment with recurring Level 3 (L3) support demand, where each incident requires inspecting tickets, tracing multiple codebases, proposing scoped fixes, and preparing peer-reviewable deliverables.',
      },
      problem: {
        es: 'El triaje inicial y la recopilación de contexto consumían tiempo operativo significativo antes de llegar a la decisión técnica, y el uso ad-hoc de modelos generativos sin reglas claras producía salidas inconsistentes.',
        en: 'Initial triage and context gathering consumed substantial engineering time before reaching technical decisions, while ad-hoc use of generative models without clear guardrails yielded inconsistent outputs.',
      },
      challenges: {
        es: [
          'Evitar que los agentes actuaran sin control o propusieran cambios fuera del alcance del incidente.',
          'Estandarizar el contexto de proyecto mediante convenciones reutilizables (skills, rules y especificaciones).',
          'Integrar herramientas de gestión de tickets y control de versiones manteniendo revisión y aprobación humana obligatoria.',
        ],
        en: [
          'Preventing agents from acting without boundaries or proposing out-of-scope edits.',
          'Standardizing project context through reusable conventions (skills, rules, and specifications).',
          'Integrating ticket tracking and version control tooling while enforcing mandatory human review and approval.',
        ],
      },
      personalContribution: {
        es: [
          'Diseño de agentes especializados, archivos de rules y skills reutilizables para estandarizar criterios técnicos.',
          'Construcción de workflows automatizados basados en Spec-Driven Development (SDD) e integraciones mediante Model Context Protocol (MCP).',
          'Implementación del flujo estructurado desde la lectura del ticket hasta la preparación del Pull Request sujeto a validación humana.',
        ],
        en: [
          'Design of specialized agents, rules files, and reusable skills to standardize engineering conventions.',
          'Construction of automated workflows grounded in Spec-Driven Development (SDD) and Model Context Protocol (MCP) integrations.',
          'Implementation of a structured pipeline from ticket ingestion to Pull Request preparation under human sign-off.',
        ],
      },
      engineeringDecisions: {
        es: [
          'Adoptar Spec-Driven Development (SDD) para que cada agente contraste el problema y la especificación antes de escribir código.',
          'Separar responsabilidades en agentes y skills especializados en lugar de depender de un único prompt monolítico.',
          'Establecer una compuerta humana explícita antes de crear o aprobar Pull Requests, manteniendo al ingeniero al mando de las decisiones.',
        ],
        en: [
          'Adopt Spec-Driven Development (SDD) so agents validate problem statements and specs before writing code.',
          'Separate concerns across specialized agents and skills instead of relying on a single monolithic prompt.',
          'Enforce an explicit human approval gate before Pull Request creation or merge, keeping engineers in control.',
        ],
      },
      implementedSolution: {
        es: 'Se estructuró un flujo reproducible de siete pasos (Jira Ticket → Code Analysis → Solution Planning → Code Changes → Git Branch → Commit → Pull Request) respaldado por conectores MCP, skills de dominio y reglas de arquitectura, permitiendo generar diagnósticos y propuestas trazables sin exposición de código productivo fuera del entorno autorizado.',
        en: 'A reproducible seven-stage workflow (Jira Ticket → Code Analysis → Solution Planning → Code Changes → Git Branch → Commit → Pull Request) was built around MCP connectors, domain skills, and architecture rules, producing traceable diagnostics and change proposals under strict authorization boundaries.',
      },
      technologies: [
        'AI Agents & Multi-Agent Orchestration',
        'Model Context Protocol (MCP)',
        'Spec-Driven Development (SDD)',
        'Skills, Rules & Workflows',
        'Git & CI Automation',
      ],
      verifiableResults: {
        es: [
          'Estandarización del proceso de análisis L3 con salidas reproducibles y alineadas a las convenciones del repositorio.',
          'Reducción de fricción en la etapa de investigación y preparación de propuestas técnicas revisables.',
          'Integración segura con control humano explícito en cada cambio propuesto.',
        ],
        en: [
          'Standardized L3 analysis process producing reproducible outputs aligned with repository conventions.',
          'Reduced friction during context investigation and preparation of peer-reviewable proposals.',
          'Safe integration preserving explicit human oversight on every proposed change.',
        ],
      },
      learnings: {
        es: [
          'El valor de la IA en ingeniería no está en generar código rápido, sino en diseñar contexto, restricciones y verificación alrededor del modelo.',
          'Las especificaciones claras y las compuertas humanas son lo que vuelve confiable a un flujo multiagente en entornos reales.',
        ],
        en: [
          'The real value of AI in software engineering lies in designing context, constraints, and verification around the model—not raw code generation speed.',
          'Clear specifications and human-in-the-loop gates are what make multi-agent workflows reliable in production settings.',
        ],
      },
    },
  },
  {
    slug: 'enterprise-software-engineering',
    order: '04',
    category: 'enterprise',
    diagramType: 'enterprise-architecture',
    visibility: 'private-professional',
    title: {
      es: 'Ingeniería en Sistemas Empresariales (ERP, E-Commerce y Facturación)',
      en: 'Enterprise Software Engineering (ERP, E-Commerce & Invoicing)',
    },
    subtitle: {
      es: 'Evolución de plataformas de gestión, integraciones críticas y optimización de bases de datos en producción',
      en: 'Evolution of business management platforms, critical integrations, and production database optimization',
    },
    summary: {
      es: 'Desarrollo y mantenimiento de sistemas de gestión empresarial donde la consistencia transaccional, la trazabilidad de integraciones y el rendimiento de datos sostienen la operación diaria.',
      en: 'Development and maintenance of enterprise management systems where transactional consistency, integration traceability, and database performance sustain daily operations.',
    },
    scopeBadge: {
      es: 'ERP · E-Commerce · Facturación',
      en: 'ERP · E-Commerce · Invoicing',
    },
    contextTags: ['PHP', 'Laravel', 'PostgreSQL', 'MySQL', 'ERP', 'Electronic Invoicing'],
    sections: {
      technicalContext: {
        es: 'Ecosistema de plataformas empresariales orientadas a gestión interna (ERP), comercio electrónico y emisión de comprobantes electrónicos, interconectadas mediante APIs y procesos asíncronos sobre bases de datos relacionales.',
        en: 'Ecosystem of enterprise platforms covering internal management (ERP), e-commerce, and electronic invoicing, interconnected via APIs and asynchronous jobs backed by relational databases.',
      },
      problem: {
        es: 'Los sistemas empresariales en crecimiento acumulan consultas pesadas, acoplamientos entre módulos comerciales y administrativos, y puntos sensibles en integraciones externas ante caídas o respuestas inconsistentes.',
        en: 'Growing enterprise platforms accumulate heavy queries, coupling between commercial and administrative modules, and integration failure points when external services time out or return inconsistent payloads.',
      },
      challenges: {
        es: [
          'Garantizar consistencia de datos entre flujos comerciales, administrativos y fiscales sin duplicar operaciones.',
          'Diagnosticar y resolver cuellos de botella en consultas SQL sobre tablas con alto volumen histórico.',
          'Evolucionar funcionalidades nuevas respetando restricciones operativas y compatibilidad hacia atrás.',
        ],
        en: [
          'Guaranteeing data consistency across commercial, administrative, and fiscal workflows without duplicating operations.',
          'Diagnosing and resolving SQL query bottlenecks on tables with high historical volume.',
          'Shipping new capabilities while respecting operational constraints and backward compatibility.',
        ],
      },
      personalContribution: {
        es: [
          'Desarrollo de lógica de negocio backend para módulos administrativos, comerciales y de facturación electrónica.',
          'Implementación y mantenimiento de integraciones entre sistemas externos e internos.',
          'Análisis y optimización de consultas SQL en PostgreSQL y MySQL y resolución de incidencias productivas.',
        ],
        en: [
          'Backend business logic development across administrative, commercial, and electronic invoicing modules.',
          'Implementation and maintenance of integrations across internal and external platforms.',
          'Analysis and optimization of SQL queries in PostgreSQL and MySQL alongside production incident resolution.',
        ],
      },
      engineeringDecisions: {
        es: [
          'Separar límites de responsabilidad entre el núcleo administrativo, la capa comercial y el servicio de comprobantes para facilitar el mantenimiento.',
          'Priorizar trazabilidad e idempotencia en integraciones críticas para poder auditar y reintentar operaciones fallidas de forma segura.',
          'Optimizar consultas e índices directamente donde el plan de ejecución mostraba contención, evitando complejidad innecesaria.',
        ],
        en: [
          'Establish clear responsibility boundaries between administrative core, commerce layer, and invoicing workflows to improve maintainability.',
          'Prioritize traceability and idempotency in critical integrations so failed operations can be audited and safely retried.',
          'Optimize queries and indexes directly where execution plans revealed contention instead of introducing unnecessary caching complexity.',
        ],
      },
      implementedSolution: {
        es: 'Se evolucionaron módulos ERP y de comercio electrónico mediante mejoras incrementales en servicios backend, validación estricta de transacciones, registro estructurado de eventos de integración y ajuste de consultas relacionales en PostgreSQL y MySQL.',
        en: 'ERP and e-commerce modules were evolved through incremental backend service improvements, strict transaction boundaries, structured integration event logging, and relational query tuning in PostgreSQL and MySQL.',
      },
      technologies: [
        'PHP',
        'Laravel',
        'PostgreSQL',
        'MySQL',
        'REST APIs',
        'Vue.js / React',
        'Docker',
      ],
      verifiableResults: {
        es: [
          'Mayor estabilidad operativa en flujos críticos de facturación, gestión administrativa y comercio.',
          'Consultas más predecibles y menor carga en base de datos en reportes y procesos transaccionales intervenidos.',
          'Integraciones mantenibles con mejor visibilidad ante errores de comunicación externa.',
        ],
        en: [
          'Improved operational stability across critical invoicing, administrative, and commerce workflows.',
          'More predictable query performance and reduced database load in tuned reports and transactional flows.',
          'Maintainable integrations with clearer observability when external dependencies fail.',
        ],
      },
      learnings: {
        es: [
          'En software empresarial, la claridad del modelo de datos y la observabilidad de las integraciones importan más que la sofisticación del framework.',
          'Resolver incidentes en producción enseña a diseñar límites transaccionales y mensajes de error pensados para quien opera el sistema.',
        ],
        en: [
          'In enterprise software, clarity in the data model and integration observability outweigh framework sophistication.',
          'Production incident work teaches you to design transaction boundaries and error states for the people operating the system.',
        ],
      },
    },
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((study) => study.slug === slug);
}

