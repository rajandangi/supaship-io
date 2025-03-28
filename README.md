# supaship.io (React + TypeScript + Vite)

## Quick start

Make sure docker is running, then:

```bash
git clone git@github.com:rajandangi/supaship-io.git && \
  cd supaship.io && \
  npm && \
  npm add -D supabase && \
  npm debug
```

^ Installs the app and runs e2e tests in debug mode. (Good for a quick overview of all the app does).

## Local Dev

Install the supabase cli (this needs to be done manually to get the cli bin):

```bash
npm add -D supabase
```

Start supabase (make sure docker is running). This will run in background without taking a terminal, use `npx supabase stop` to end it.

```bash
npm supabase start --debug
```

Start dev server:

```bash
npm run dev
```

To watch tailwind styles, run this in another terminal while developing:

```bash
 npx tailwindcss -i ./src/index.css -o ./dist/output.css --watch
```

## Prod Build

```bash
npm run build
```

## Deploy

Manual. Run build and then drop `/dist` into Netlify buccket
(Will automate later)

## e2e

Note: will drop all data from tables when you run it.

```bash
npm run test
```

To step through tests:

```bash
npm run debug
```