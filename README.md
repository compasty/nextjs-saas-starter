# Next.js SaaS Starter

A production-oriented SaaS starter built with Next.js App Router, Supabase, and Tailwind CSS. It provides a practical foundation for authentication, protected app pages, pricing pages, legal documents, file storage, and basic task management.

## Features

1. Email/password authentication with Supabase
2. OAuth provider setup docs for Google and GitHub
3. Protected application layout under `/app`
4. User settings, MFA setup, and MFA verification pages
5. File upload, download, sharing, and deletion with Supabase Storage
6. Example task management table backed by Supabase
7. Pricing configuration defined in TypeScript constants
8. Legal document pages for privacy, terms, and refund policies
9. Cookie consent and analytics integration hooks

## Tech Stack

1. Next.js 16 App Router
2. React 19
3. TypeScript
4. Supabase Auth, Database, and Storage
5. Tailwind CSS
6. Radix UI primitives
7. ESLint flat config

## Getting Started

Install dependencies:

```bash
pnpm install
```

Create a local environment file:

```bash
cp .env.template .env.local
```

Update the Supabase values in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```text
src/app        App Router pages, layouts, and route handlers
src/components Shared UI and feature components
src/lib        Supabase clients, pricing config, types, and utilities
docs           Provider setup and project documentation
supabase       Database migration files
```

## Configuration

Environment variables are reserved for deployment-specific values, secrets, provider settings, and feature switches. Product display data such as pricing tiers lives in code so it can be typed, reviewed, and refactored safely.

Theme selection is controlled by `NEXT_PUBLIC_THEME` in `.env.local`:

```env
NEXT_PUBLIC_THEME=theme-saas
```

Available themes:

1. `theme-blue`: Clean blue primary palette with slate neutrals and indigo accents. Best for developer tools, B2B SaaS, dashboards, and products that need a neutral, trustworthy interface.
2. `theme-saas`: Pink rose primary palette with slate neutrals and violet accents. This is the default theme, designed for a modern SaaS landing page with a warmer brand feel.
3. `theme-saas2`: Sage green primary palette with warm gray neutrals and terracotta accents. Good for calm, editorial, wellness, education, and productivity products.
4. `theme-saas3`: Ocean blue primary palette with sandy neutrals and coral accents. Works well for data products, travel, marketplace, and consumer SaaS experiences that need a brighter visual tone.
5. `theme-purple`: Purple primary palette with neutral gray surfaces and pink accents. Suitable for AI tools, creative products, analytics, and premium feature-heavy applications.
6. `theme-green`: Bright green primary palette with warm stone neutrals and amber accents. Best for finance, sustainability, growth, operations, and status-driven dashboards.

Pricing tiers are defined in:

```text
src/lib/pricing.ts
```

OAuth provider setup guides are available in:

```text
docs/GOOGLE_AUTH_SETUP.md
docs/GITHUB_AUTH_SETUP.md
```
