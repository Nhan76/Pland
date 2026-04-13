# PLAND

PLAND is a Next.js landing app for an AI-driven crypto portfolio command center. The current frontend positions the product around disciplined portfolio reviews, explainable AI reasoning, and portfolio-level risk guardrails.

## Project Structure

- `package/`: active Next.js app.
- `package/markdown/blog/Project_Propose.md`: product brief and source-of-truth positioning.
- root `package.json`: convenience scripts that proxy into `package/`.

## Development

Install dependencies from the app directory:

```bash
cd package
corepack pnpm install
```

Start the development server:

```bash
corepack pnpm dev
```

Run validation:

```bash
corepack pnpm lint
corepack pnpm build
```

## Notes

- App package name: `pland`
- Root workspace package name: `pland-root`
- Landing copy and branding have been aligned to `PLAND`


