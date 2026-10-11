# Scripts

Run commands from the repository root. Configure `.env` before running database commands.

## Development

```bash
npm run dev
npm run build
npm start
npm run typecheck
npm run lint
npm run format
```

`npm run dev` uses `tsx watch`. The build writes compiled output to `dist/`; `npm start` runs the compiled application.

## Sequelize commands

```bash
npm run migrate
npm run migrate:undo
npm run migrate:undo:all
npm run migration:gen -- create-example-table
npm run model:gen -- Example --attributes name:string
```

## Seeder commands

```bash
npm run seed
npm run seed:undo
npm run seed:undo:all
```

Set `SEED_ADMIN_PASSWORD` before `npm run seed` when you do not want the default local password.

## Recommended first-run sequence

```bash
npm install
cp .env.example .env
npm run migrate
npm run seed
npm run dev
```

For a clean local rebuild:

```bash
npm run seed:undo:all
npm run migrate:undo:all
npm run migrate
npm run seed
```
