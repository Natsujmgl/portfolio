# Software Engineer Portfolio — Julio Miguel Giménez León

[![CI](https://github.com/Natsujmgl/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/Natsujmgl/portfolio/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-15-black.svg)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)

[Leer en Español](./README.es.md)

Software engineering portfolio for **Julio Miguel Giménez León**, designed for Engineering Managers and Technical Recruiters. It communicates real-world software engineering depth, legacy architecture modernization, application security, and AI-assisted development automation through structured, defensible technical case studies—without exposing proprietary corporate code.

---

## 🎯 What a Technical Recruiter or Engineering Manager Will Find

- **Two Reading Depths:** A clean 30-second profile overview (roles, verified timeline, categorized technical stack) and deep-dive technical case studies with original interactive educational diagrams.
- **Enterprise Case Studies (Zero Corporate Code Expose):**
  1. *Legacy Application Security Hardening:* OWASP Top 10 remediation, server-side access controls (IDOR/CSRF), and Checkmarx SAST triage on a PHP 5.3 / CakePHP 1.3 monolith.
  2. *Legacy System Modernization:* Progressive compatibility and dependency migration from Laravel 5.6 to Laravel 10 preserving operational business continuity.
  3. *AI-Powered Development Automation:* L3 incident triage pipeline with Jira intake, MCP tool orchestration, Spec-Driven Development (SDD), and mandatory human sign-off gates.
  4. *Enterprise Software Engineering:* High-reliability ERP business logic, electronic invoicing integrations, and relational database tuning in PostgreSQL & MySQL.
- **Production Engineering Standards:** Built with strict TypeScript, App Router, full bilingual internationalization (ES/EN), dark/light theme persistence, hardened HTTP security headers, and automated CI pipelines with Playwright E2E and Vitest unit coverage.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 15 (App Router) |
| UI & Language | React 19, TypeScript (`strict: true`) |
| Styling | Tailwind CSS + CSS design tokens |
| Internationalization | `next-intl` (`/es`, `/en`, `hreflang`, localized SEO) |
| Theme Engine | `next-themes` (Light, Dark, System) |
| Icons & Motion | `lucide-react`, `motion` (`prefers-reduced-motion` aware) |
| Testing & Quality | Vitest, React Testing Library, Playwright, ESLint, Prettier |
| Package Manager | `pnpm` |

## Prerequisites

- Node.js `>= 20.11.0`
- `pnpm >= 9.0.0`

## Installation & Local Development

1. Install dependencies:
   ```bash
   pnpm install
   ```
2. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
3. Configure personal links, email, and CV in `src/config/site.ts` (currently marked `status: 'pending'` to avoid fabricated URLs).
4. Start the development server (bound strictly to `127.0.0.1`):
   ```bash
   pnpm dev
   ```

## Environment Variables

| Variable | Description | Default |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical base URL for Open Graph, `sitemap.xml`, `robots.txt`, and `hreflang` | `http://127.0.0.1:3000` |

## Available Scripts

| Command | Purpose |
| --- | --- |
| `pnpm dev` | Run local dev server at `http://127.0.0.1:3000` |
| `pnpm build` | Build production bundle and static/localized routes |
| `pnpm start` | Start production server at `http://127.0.0.1:3000` |
| `pnpm lint` | Run ESLint with `--max-warnings=0` |
| `pnpm typecheck` | Run TypeScript compiler (`tsc --noEmit`) |
| `pnpm format` | Format source, messages, and tests with Prettier |
| `pnpm format:check` | Verify formatting |
| `pnpm test` | Run Vitest unit and component tests |
| `pnpm test:e2e` | Run Playwright end-to-end tests |

## Project Structure

```text
src/
  app/
    [locale]/            # Localized App Router pages (/es, /en)
      about/
      contact/
      experience/
      projects/
        [slug]/          # 9-section technical case study detail + interactive diagram
    robots.ts
    sitemap.ts
  components/
    layout/              # Header, Footer
    projects/            # CaseStudyCard, PublicProjectCard, diagrams/*
    sections/            # CopyEmailButton, ExperienceTimeline, TechnicalSkillsGrid, ExternalLinksList
    ui/                  # Badge, Card, Reveal, SectionHeading
  config/
    site.ts              # Centralized owner profile & external links (pending/active)
  content/
    case-studies/        # 4 structured private professional case studies (ES/EN)
    experience/          # Chronological experience & categorized technical skills
    projects/            # Separated public & open-source projects
  features/
    language/            # LanguageSwitcher (ES/EN)
    project-filters/     # ProjectFilterBar
    theme/               # ThemeProvider & ThemeToggle (Light/Dark/System)
  i18n/                  # next-intl routing, navigation, request config
  lib/                   # seo.ts, utils.ts
  styles/                # globals.css (CSS variables + reduced motion)
  types/                 # Strict TypeScript domain models
messages/
  es.json                # Default Spanish UI & metadata strings
  en.json                # English UI & metadata strings
tests/
  unit/                  # Vitest + React Testing Library specs
  e2e/                   # Playwright E2E specs
```

## Architectural Decisions

- **Server Components by default**: Pages and layout fetch/render structured bilingual content on the server; `'use client'` is isolated to interactive controls (`ThemeToggle`, `LanguageSwitcher`, `ProjectFilterBar`, `CopyEmailButton`, and interactive diagrams).
- **Clear separation between private work and public code**: Professional case studies present problem context, engineering decisions, and original educational diagrams without exposing corporate repositories or internal metrics.
- **No dynamic AI runtime translation**: All UI copy and case study content live in typed TypeScript data structures and `messages/{es,en}.json` for deterministic SEO and zero runtime latency.
- **Security headers**: `next.config.mjs` sets `Content-Security-Policy`, `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy`, and `Permissions-Policy`.

## How to Add Projects or Case Studies

- **Open-source / personal project**: Add an entry to `PUBLIC_PROJECTS` in `src/content/projects/index.ts` with `status: 'in-development' | 'active' | 'prototype'` and bilingual `es`/`en` fields.
- **Professional case study**: Add an entry to `CASE_STUDIES` in `src/content/case-studies/index.ts` including all 9 sections (`technicalContext` through `learnings`) in both `es` and `en`.

## How to Add Translations

1. Add matching keys to `messages/es.json` and `messages/en.json`.
2. To add a new locale, register its code in `src/i18n/routing.ts`, `src/middleware.ts`, `src/config/site.ts`, and `src/types/portfolio.ts`, then add `messages/<locale>.json`.

## Deployment (Vercel)

1. Import the repository into Vercel (framework preset: **Next.js**, install command: `pnpm install`, build command: `pnpm build`).
2. Set `NEXT_PUBLIC_SITE_URL` to your production HTTPS domain in Vercel Environment Variables.
3. Update pending personal links in `src/config/site.ts` before publishing.

## License

This project is licensed under the [MIT License](./LICENSE).

