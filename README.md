# Troubleshooting missing @nuxt/vite-builder

[website Link](https://issuemode.com/issues/nuxt/framework/87594827)

### Clear current deps just in case

> rm -rf node_modules
> rm package-lock.json
> rm -rf .nuxt
> npm cache clear -f

### Install packages with the --legacy-peer-deps option

> npm i --legacy-peer-deps
> npm run dev

# Nuxt 3 Minimal Starter

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Checkout the [deployment documentation](https://v3.nuxtjs.org/docs/deployment) for more information.
