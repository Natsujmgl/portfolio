# Portfolio de Ingeniería de Software — Julio Miguel Giménez León

[Read in English](./README.md)

Portfolio bilingüe (`es` predeterminado, `en` secundario) orientado a demostrar criterio de ingeniería de software, experiencia en sistemas empresariales backend, modernización legacy, seguridad aplicativa y automatización con IA — sin exponer código corporativo privado ni métricas confidenciales.

## Stack Tecnológico

| Capa | Tecnología |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| UI y Lenguaje | React 19, TypeScript (`strict: true`) |
| Estilos | Tailwind CSS + tokens CSS centralizados |
| Internacionalización | `next-intl` (`/es`, `/en`, `hreflang`, SEO localizado) |
| Temas | `next-themes` (Claro, Oscuro y Sistema) |
| Iconos y Animación | `lucide-react`, `motion` (respeta `prefers-reduced-motion`) |
| Testing y Calidad | Vitest, React Testing Library, Playwright, ESLint, Prettier |
| Gestor de paquetes | `pnpm` |

## Requisitos Previos

- Node.js `>= 20.11.0`
- `pnpm >= 9.0.0`

## Instalación y Desarrollo Local

1. Instalar dependencias:
   ```bash
   pnpm install
   ```
2. Copiar variables de entorno:
   ```bash
   cp .env.example .env.local
   ```
3. Configurar enlaces personales, correo y CV en `src/config/site.ts` (marcados como `status: 'pending'` para no inventar URLs).
4. Iniciar el servidor de desarrollo (vinculado estrictamente a `127.0.0.1`):
   ```bash
   pnpm dev
   ```

## Variables de Entorno

| Variable | Descripción | Valor por defecto |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL base canónica para Open Graph, `sitemap.xml`, `robots.txt` y `hreflang` | `http://127.0.0.1:3000` |

## Comandos Disponibles

| Comando | Propósito |
| --- | --- |
| `pnpm dev` | Servidor local en `http://127.0.0.1:3000` |
| `pnpm build` | Build de producción y generación de rutas localizadas |
| `pnpm start` | Servidor de producción en `http://127.0.0.1:3000` |
| `pnpm lint` | Ejecutar ESLint con `--max-warnings=0` |
| `pnpm typecheck` | Verificar tipos con TypeScript (`tsc --noEmit`) |
| `pnpm format` | Formatear código fuente, traducciones y tests con Prettier |
| `pnpm format:check` | Verificar formato con Prettier |
| `pnpm test` | Ejecutar tests unitarios y de componentes con Vitest |
| `pnpm test:e2e` | Ejecutar pruebas end-to-end con Playwright |

## Estructura del Proyecto

```text
src/
  app/
    [locale]/            # Rutas App Router localizadas (/es, /en)
      about/
      contact/
      experience/
      projects/
        [slug]/          # Detalle de caso técnico (9 secciones + diagrama interactivo)
    robots.ts
    sitemap.ts
  components/
    layout/              # Header, Footer
    projects/            # CaseStudyCard, PublicProjectCard, diagrams/*
    sections/            # CopyEmailButton, ExperienceTimeline, TechnicalSkillsGrid, ExternalLinksList
    ui/                  # Badge, Card, Reveal, SectionHeading
  config/
    site.ts              # Configuración centralizada de perfil y enlaces (pending/active)
  content/
    case-studies/        # 4 casos de estudio profesionales privados (ES/EN)
    experience/          # Trayectoria cronológica y habilidades categorizadas
    projects/            # Proyectos públicos / open source separados
  features/
    language/            # LanguageSwitcher (ES/EN)
    project-filters/     # ProjectFilterBar
    theme/               # ThemeProvider y ThemeToggle (Light/Dark/System)
  i18n/                  # Configuración de routing, navegación y carga de mensajes
  lib/                   # seo.ts, utils.ts
  styles/                # globals.css (variables CSS + reduced motion)
  types/                 # Contratos estrictos de TypeScript
messages/
  es.json                # Textos y metadatos en Español (idioma predeterminado)
  en.json                # Textos y metadatos en Inglés
tests/
  unit/                  # Tests unitarios y de componentes (Vitest + RTL)
  e2e/                   # Pruebas E2E (Playwright)
```

## Decisiones Arquitectónicas

- **Server Components por defecto**: Las páginas renderizan el contenido bilingüe en servidor; `'use client'` se limita a controles interactivos (`ThemeToggle`, `LanguageSwitcher`, `ProjectFilterBar`, `CopyEmailButton` y diagramas interactivos).
- **Separación explícita entre trabajo privado y público**: Los casos profesionales explican contexto, decisiones técnicas y diagramas educativos originales sin exponer código fuente corporativo ni métricas privadas.
- **Sin traducción dinámica por IA en runtime**: Todo el contenido reside en diccionarios estáticos y módulos tipados para garantizar SEO indexable y rendimiento predecible.
- **Headers de seguridad HTTP**: `next.config.mjs` configura `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy` y `Permissions-Policy`.

## Cómo Agregar Proyectos o Casos de Estudio

- **Proyecto público / personal**: Agregar un elemento en `PUBLIC_PROJECTS` dentro de `src/content/projects/index.ts` con `status: 'in-development' | 'active' | 'prototype'` y campos `es`/`en`.
- **Caso de estudio profesional**: Agregar un elemento en `CASE_STUDIES` dentro de `src/content/case-studies/index.ts` completando las 9 secciones obligatorias en `es` y `en`.

## Cómo Agregar Traducciones

1. Agregar claves equivalentes en `messages/es.json` y `messages/en.json`.
2. Para sumar un idioma adicional, registrar el código en `src/i18n/routing.ts`, `src/middleware.ts`, `src/config/site.ts` y `src/types/portfolio.ts`, y crear `messages/<idioma>.json`.

## Despliegue en Vercel

1. Importar el repositorio en Vercel (preset **Next.js**, comando de instalación `pnpm install`, comando de build `pnpm build`).
2. Configurar `NEXT_PUBLIC_SITE_URL` con el dominio HTTPS definitivo en las variables de entorno de Vercel.
3. Reemplazar los enlaces pendientes en `src/config/site.ts` antes de publicar.

## Licencia

Pendiente de definir — agregar el archivo `LICENSE` cuando se seleccione la licencia del repositorio.

