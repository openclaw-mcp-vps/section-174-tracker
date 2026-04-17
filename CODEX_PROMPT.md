# Build Task: section-174-tracker

Build a complete, production-ready Next.js 15 App Router application.

PROJECT: section-174-tracker
HEADLINE: Track Section 174 tax impact for software companies
WHAT: A calculator that tracks how Section 174 tax changes affect your software company's cash flow. Input your R&D expenses and see the 5-year amortization impact on your taxes and runway.
WHY: Since 2022, software companies can't deduct R&D expenses immediately—they must spread them over 5 years. This quietly destroys cash flow for profitable companies who suddenly owe massive tax bills on 'phantom' income.
WHO PAYS: CFOs and founders at profitable software companies with $500K+ annual R&D spend. Especially those who got blindsided by their 2022 tax bill and need to model the ongoing impact.
NICHE: business-tools
PRICE: $$19/mo

ARCHITECTURE SPEC:
A Next.js SaaS app with a Section 174 tax calculator that models R&D expense amortization impact on cash flow and runway. Users input their R&D expenses and get detailed projections showing tax obligations, cash flow effects, and runway calculations over 5 years.

PLANNED FILES:
- app/page.tsx
- app/calculator/page.tsx
- app/dashboard/page.tsx
- app/api/auth/[...nextauth]/route.ts
- app/api/webhooks/lemonsqueezy/route.ts
- components/Calculator.tsx
- components/ResultsChart.tsx
- components/PricingCard.tsx
- lib/calculations.ts
- lib/auth.ts
- lib/lemonsqueezy.ts
- types/calculator.ts

DEPENDENCIES: next, react, typescript, tailwindcss, next-auth, prisma, @prisma/client, recharts, zod, lucide-react, @lemonsqueezy/lemonsqueezy.js

REQUIREMENTS:
- Next.js 15 with App Router (app/ directory)
- TypeScript
- Tailwind CSS v4
- shadcn/ui components (npx shadcn@latest init, then add needed components)
- Dark theme ONLY — background #0d1117, no light mode
- Lemon Squeezy checkout overlay for payments
- Landing page that converts: hero, problem, solution, pricing, FAQ
- The actual tool/feature behind a paywall (cookie-based access after purchase)
- Mobile responsive
- SEO meta tags, Open Graph tags
- /api/health endpoint that returns {"status":"ok"}
- NO HEAVY ORMs: Do NOT use Prisma, Drizzle, TypeORM, Sequelize, or Mongoose. If the tool needs persistence, use direct SQL via `pg` (Postgres) or `better-sqlite3` (local), or just filesystem JSON. Reason: these ORMs require schema files and codegen steps that fail on Vercel when misconfigured.
- INTERNAL FILE DISCIPLINE: Every internal import (paths starting with `@/`, `./`, or `../`) MUST refer to a file you actually create in this build. If you write `import { Card } from "@/components/ui/card"`, then `components/ui/card.tsx` MUST exist with a real `export const Card` (or `export default Card`). Before finishing, scan all internal imports and verify every target file exists. Do NOT use shadcn/ui patterns unless you create every component from scratch — easier path: write all UI inline in the page that uses it.
- DEPENDENCY DISCIPLINE: Every package imported in any .ts, .tsx, .js, or .jsx file MUST be
  listed in package.json dependencies (or devDependencies for build-only). Before finishing,
  scan all source files for `import` statements and verify every external package (anything
  not starting with `.` or `@/`) appears in package.json. Common shadcn/ui peers that MUST
  be added if used:
  - lucide-react, clsx, tailwind-merge, class-variance-authority
  - react-hook-form, zod, @hookform/resolvers
  - @radix-ui/* (for any shadcn component)
- After running `npm run build`, if you see "Module not found: Can't resolve 'X'", add 'X'
  to package.json dependencies and re-run npm install + npm run build until it passes.

ENVIRONMENT VARIABLES (create .env.example):
- NEXT_PUBLIC_LEMON_SQUEEZY_STORE_ID
- NEXT_PUBLIC_LEMON_SQUEEZY_PRODUCT_ID
- LEMON_SQUEEZY_WEBHOOK_SECRET

After creating all files:
1. Run: npm install
2. Run: npm run build
3. Fix any build errors
4. Verify the build succeeds with exit code 0

Do NOT use placeholder text. Write real, helpful content for the landing page
and the tool itself. The tool should actually work and provide value.
