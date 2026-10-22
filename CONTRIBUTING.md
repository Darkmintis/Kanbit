# Contributing to Kanbit

Thanks for helping improve Kanbit.

## Ground rules

- Keep the product **honest**: no AI claims, no fake download history charts
- Prefer small, focused PRs
- Match existing TypeScript, Tailwind, and component style
- Public Play Store signals only — do not add private Console / paid data APIs unless discussed first

## Setup

```bash
npm install
npm run dev
```

Before opening a PR:

```bash
npm run lint
npm run build
```

## What to work on

Good first areas:

- UI / dashboard polish
- Search UX and error states
- Caching or rate limiting for scrape endpoints
- Docs and accessibility

## Pull requests

1. Fork and create a branch from `main`
2. Make your change with a clear commit message
3. Ensure lint + build pass
4. Open a PR describing **what** and **why**

## Security / abuse

If you find a security issue in the hosted deploy path, prefer a private report to [Darkmintis](https://darkmintis.dev) rather than a public issue with an exploit write-up.

## License

By contributing, you agree your contributions are licensed under the MIT License.
