# Node Boilerplate

A minimal Node.js API boilerplate using Express, Sequelize, and environment-based database
configuration.

## Features

- Express app setup
- JSON request parsing
- Health check endpoint
- Sequelize configuration
- Sequelize CLI migration/model scripts
- Environment variable support with `dotenv`

## Requirements

- Node.js
- npm
- A SQL database supported by Sequelize

## Getting Started

Install dependencies:

```bash
npm install
```

Create your environment file:

```bash
cp .env.example .env
```

Update `.env` with your local database credentials:

```env
DB_NAME=node_boilerplate
DB_USER=
DB_PASSWORD=
DB_HOST=
DB_DIALECT=postgres
DB_PORT=5432
PORT=8080
```

Start the development server:

```bash
npm run dev
```

Start the production server:

```bash
npm start
```

By default, the server uses `PORT` from `.env`, or falls back to `4000`.

## Health Check

Once the server is running, check:

```http
GET /health
```

Example response:

```json
{
  "uptime": 12.34,
  "message": "OK",
  "timestamp": 1760000000000
}
```

## Database

Database settings are loaded from `.env` in:

- `src/config/db.js`
- `src/config/config.js`

The project currently includes the `pg` and `pg-hstore` packages for PostgreSQL. If you use
`DB_DIALECT=mysql`, install the MySQL driver too:

```bash
npm install mysql2
```

For PostgreSQL, set:

```env
DB_DIALECT=postgres
DB_PORT=5432
```

For MySQL, set:

```env
DB_DIALECT=mysql
DB_PORT=3306
```

## Sequelize Commands

Run migrations:

```bash
npm run migrate
```

Undo the latest migration:

```bash
npm run migrate:undo
```

Undo all migrations:

```bash
npm run migrate:undo:all
```

Generate a migration:

```bash
npm run migration:gen -- create-users
```

Generate a model:

```bash
npm run model:gen -- User --attributes name:string,email:string
```

## Project Structure

```text
.
├── .vscode/
├── migrations/
├── src/
│   ├── app.js
│   ├── config/
│   │   ├── config.js
│   │   └── db.js
│   ├── models/
│   │   └── index.js
│   ├── routes/
│   │   └── index.js
│   └── server.js
├── .env.example
├── .sequelizerc
├── package.json
└── README.md
```

## License

MIT
