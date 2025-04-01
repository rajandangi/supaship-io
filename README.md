[![Netlify Status](https://api.netlify.com/api/v1/badges/8da12374-2b50-485f-bb7e-d0d3645c21cb/deploy-status)](https://app.netlify.com/sites/bejewelled-nougat-e64e4a/deploys)

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

# 📝 Notes

- `npx supabase migration new original-ddl` creates a migration file with the original DDL. This migration file can be used to recreate the database schema. DDL stands for Data Definition Language, which is a set of SQL commands that define the database structure.

- `npx supabase stop` stops the local instance of supabase server.

- `npx supabase start` starts the local instance of supabase server.

- __Supabase Auth UI__ is a pre-built UI component that allows you to easily add authentication to your application. It is built on top of Supabase's authentication API and provides a simple way to handle user sign-up, sign-in, and password recovery flows. You can customize the look and feel of the UI to match your application's design. https://supabase.com/docs/guides/auth/auth-helpers/auth-ui

- Command to create a migration file from your current local Supabase state: 
  ```bash
  npx supabase db diff --use-migra --file=<name of the migration>
  ```

- Reset the database completely (will clear all data):
  ```bash
  npx supabase db reset
  ```
- Apply only pending migrations:
  ```bash
  npx supabase migration up
  ```
- Checking list of migrations:
  ```bash
  npx supabase migration list
  ```
- [Row Level Security(RLS) in Supabase](https://supabase.com/docs/guides/database/postgres/row-level-security)

- Command to generate typscript types:
  ```bash
  npx supabase gen types typescript --local > ./src/database.types.ts
  ```
# Playwright E2E Testing
Playwright is a Node library which allows you to automate Chromium, Firefox and WebKit with a single API. It is built to enable cross-browser web automation that is reliable and capable of running on CI.
Playwright docs: https://playwright.dev/docs/intro

**To create Playwright in your repository, run:**

```bash
npm create playwright
```
