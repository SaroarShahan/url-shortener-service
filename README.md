# url-shortener-service

URL shortener REST API built with TypeScript, Express, Sequelize, and PostgreSQL. It provides
authentication, role-based access control, request validation, file uploads, migrations, seed data,
and public short-code redirects.

## Docs

- [Getting Started](docs/getting-started.md)
- [Project Structure](docs/project-structure.md)
- [Scripts](docs/scripts.md)
- [API Reference](docs/api.md)
- [RBAC Guide](docs/rbac.md)
- [Docker Guide](docs/docker.md)

## Stack

- Node.js 24
- TypeScript
- Express
- Sequelize
- PostgreSQL
- JWT authentication via `jose`
- Password hashing with `bcrypt`
- Zod request validation
- Biome formatting and linting
- MinIO object storage for uploads

## Features

- User registration and login
- JWT-protected routes
- Role-based access control with roles and permissions
- URL creation, lookup, listing, deletion, and public redirects
- File upload support with MinIO
- Sequelize migrations and seeders
- Docker Compose development environment
- Health check endpoint

## Quick Start

For a complete first-run walkthrough, read [Getting Started](docs/getting-started.md). The short
version is below.

### Install dependencies

```bash
npm install
```

### Configure environment variables

```bash
cp .env.example .env
```

Update the database credentials and API settings in `.env`:

```env
DB_NAME=url_shortener
DB_USER=postgres
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432
DB_LOGGING=false
PORT=8000
CORSURL=http://localhost:3000
```

The API requires a running PostgreSQL database. MinIO is only required when using file uploads.
Do not commit `.env`; it contains local credentials and secrets.

### Run migrations and seed data

```bash
npm run migrate
npm run seed
```

The seeders create the default admin role, permissions, admin user, and example URLs. Set
`SEED_ADMIN_PASSWORD` before seeding to use a different local password.

### Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

The API uses `PORT` from `.env` and defaults to port `4000` when it is not set.

## License

MIT
