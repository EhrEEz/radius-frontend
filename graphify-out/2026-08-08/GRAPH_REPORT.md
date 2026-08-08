# Graph Report - radius-frontend  (2026-08-08)

## Corpus Check
- 83 files · ~37,915 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 305 nodes · 414 edges · 55 communities (20 shown, 35 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.73)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `07ed524c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- compress.py
- checkout/+page.svelte
- product.ts
- validate.py
- utils/index.ts
- Cavecrew Skill
- compilerOptions
- scripts
- eslint-config-prettier
- ShoppingCart
- devDependencies
- app.d.ts
- Svelte CLI Setup
- Graphify Rule
- __init__.py
- Caveman Stats Overview
- eslint
- eslint.config.js
- Lightbox.svelte
- @eslint/js
- eslint-plugin-svelte
- globals
- @lucide/svelte
- dompurify
- postgres
- prettier
- prettier-plugin-svelte
- prettier-plugin-tailwindcss
- svelte-check
- @sveltejs/adapter-auto
- @sveltejs/kit
- @sveltejs/vite-plugin-svelte
- swiper
- tailwind-merge
- tailwind-variants
- tailwindcss
- @tailwindcss/forms
- @tailwindcss/typography
- @types/node
- typescript
- vite
- prettier.config.js
- env.ts
- pnpm Workspace Build Config
- Svelte Logo Favicon
- Robots Crawler Policy

## God Nodes (most connected - your core abstractions)
1. `compress_file()` - 15 edges
2. `validate()` - 14 edges
3. `ShoppingCart` - 12 edges
4. `compilerOptions` - 12 edges
5. `detect_file_type()` - 9 edges
6. `scripts` - 9 edges
7. `should_compress()` - 8 edges
8. `main()` - 7 edges
9. `backup_dir_for()` - 6 edges
10. `benchmark_pair()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `Svelte CLI Setup` --conceptually_related_to--> `Postgres Database Service`  [INFERRED]
  README.md → compose.yaml
- `Svelte CLI Setup` --conceptually_related_to--> `SvelteKit App Template`  [INFERRED]
  README.md → src/app.html
- `Caveman Review Skill` --semantically_similar_to--> `Cavecrew Reviewer Subagent`  [INFERRED] [semantically similar]
  .agents/skills/caveman-review/SKILL.md → .agents/skills/cavecrew/SKILL.md
- `compress_file()` --calls--> `validate()`  [EXTRACTED]
  .agents/skills/caveman-compress/scripts/compress.py → .agents/skills/caveman-compress/scripts/validate.py
- `Cavecrew Decision Guide` --references--> `Cavecrew Skill`  [EXTRACTED]
  .agents/skills/cavecrew/README.md → .agents/skills/cavecrew/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Cavecrew Subagent Delegation Flow** — agents_skills_cavecrew_skill_md_cavecrew_investigator, agents_skills_cavecrew_skill_md_cavecrew_builder, agents_skills_cavecrew_skill_md_cavecrew_reviewer [EXTRACTED 1.00]
- **Caveman Token Optimization Suite** — agents_skills_caveman_skill_md_caveman_skill, agents_skills_caveman_compress_skill_md_caveman_compress_skill, agents_skills_caveman_commit_skill_md_caveman_commit_skill, agents_skills_caveman_review_skill_md_caveman_review_skill, agents_skills_caveman_stats_skill_md_caveman_stats_skill [EXTRACTED 1.00]

## Communities (55 total, 35 thin omitted)

### Community 0 - "compress.py"
Cohesion: 0.10
Nodes (33): main(), print_usage(), backup_dir_for(), build_compress_prompt(), build_fix_prompt(), call_claude(), compress_file(), first_nonblank_line() (+25 more)

### Community 1 - "checkout/+page.svelte"
Cohesion: 0.12
Nodes (10): AddToCartPayload, cart, CartItem, CartItemAttributes, discountAmount, handleSubmit(), nextStep(), shippingFee (+2 more)

### Community 2 - "product.ts"
Cohesion: 0.08
Nodes (11): Categories, Image, Price, Product, ProductCard, ProductVariant, RelatedSearch, VariantOption (+3 more)

### Community 3 - "validate.py"
Cohesion: 0.15
Nodes (23): benchmark_pair(), count_tokens(), main(), print_table(), Path, count_bullets(), extract_code_blocks(), extract_headings() (+15 more)

### Community 4 - "utils/index.ts"
Cohesion: 0.14
Nodes (4): WithElementRef, WithoutChild, WithoutChildren, WithoutChildrenOrChild

### Community 5 - "Cavecrew Skill"
Cohesion: 0.15
Nodes (16): Cavecrew Decision Guide, Cavecrew Builder Subagent, Cavecrew Investigator Subagent, Cavecrew Reviewer Subagent, Cavecrew Skill, Caveman Commit Overview, Caveman Commit Skill, Caveman Compress Overview (+8 more)

### Community 6 - "compilerOptions"
Cohesion: 0.13
Nodes (14): ./.svelte-kit/tsconfig.json, compilerOptions, allowJs, allowSyntheticDefaultImports, checkJs, esModuleInterop, forceConsistentCasingInFileNames, moduleResolution (+6 more)

### Community 7 - "scripts"
Cohesion: 0.14
Nodes (13): name, private, scripts, build, check, check:watch, dev, format (+5 more)

### Community 10 - "devDependencies"
Cohesion: 0.22
Nodes (9): clsx, devDependencies, clsx, svelte, @tailwindcss/vite, typescript-eslint, svelte, @tailwindcss/vite (+1 more)

### Community 11 - "app.d.ts"
Cohesion: 0.40
Nodes (4): App, IntrinsicElements, Locals, svelteHTML

### Community 12 - "Svelte CLI Setup"
Cohesion: 0.67
Nodes (3): Postgres Database Service, Svelte CLI Setup, SvelteKit App Template

## Knowledge Gaps
- **94 isolated node(s):** `gitignorePath`, `name`, `private`, `version`, `type` (+89 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **35 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `devDependencies` connect `devDependencies` to `scripts`, `eslint-config-prettier`, `eslint`, `@eslint/js`, `eslint-plugin-svelte`, `globals`, `@lucide/svelte`, `dompurify`, `postgres`, `prettier`, `prettier-plugin-svelte`, `prettier-plugin-tailwindcss`, `svelte-check`, `@sveltejs/adapter-auto`, `@sveltejs/kit`, `@sveltejs/vite-plugin-svelte`, `swiper`, `tailwind-merge`, `tailwind-variants`, `tailwindcss`, `@tailwindcss/forms`, `@tailwindcss/typography`, `@types/node`, `typescript`, `vite`?**
  _High betweenness centrality (0.050) - this node is a cross-community bridge._
- **Why does `ShoppingCart` connect `ShoppingCart` to `checkout/+page.svelte`?**
  _High betweenness centrality (0.023) - this node is a cross-community bridge._
- **Why does `validate()` connect `validate.py` to `compress.py`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **What connects `gitignorePath`, `name`, `private` to the rest of the system?**
  _94 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `compress.py` be split into smaller, more focused modules?**
  _Cohesion score 0.1036036036036036 - nodes in this community are weakly interconnected._
- **Should `checkout/+page.svelte` be split into smaller, more focused modules?**
  _Cohesion score 0.12418300653594772 - nodes in this community are weakly interconnected._
- **Should `product.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.07712765957446809 - nodes in this community are weakly interconnected._