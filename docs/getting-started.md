# Getting Started

This guide takes you from a fresh checkout to a running local URL shortener. Complete the steps in order: install dependencies, configure PostgreSQL, run migrations and seeders, and start the API.

## Requirements

- Node.js 24
- npm
- PostgreSQL
- MinIO, if you use the upload endpoint

## Install dependencies

```bash
npm install
```

## Configure environment variables

```bash
cp .env.example .env
```

Set the database credentials, JWT secret, and API settings in `.env`:

```env
DB_NAME=url_shortener
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=localhost
DB_DIALECT=postgres
DB_PORT=5432
JWT_SECRET=replace-with-a-local-secret
PORT=8080
CORSURL=http://localhost:3000
SHORT_URL_BASE_URL=http://localhost:8080
```

MinIO settings are optional and only needed for uploads:

```env
MINIO_USE_SSL=false
MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=minioadmin
MINIO_SECRET_KEY=minioadmin
MINIO_BUCKET=url-shortener
```

Keep credentials and production secrets outside source control.

## Create the database

Create the database named by `DB_NAME` before running migrations:

```bash
createdb -U postgres url_shortener
```

If it already exists, continue to migrations.

## Run migrations and seeders

```bash
npm run migrate
npm run seed
```

The seeders create permissions, the `admin` role, role-permission mappings, an admin user, and example URLs. Set `SEED_ADMIN_PASSWORD` before seeding to use a different local password.

## Start the server

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm start
```

The API starts on `PORT`, or falls back to `4000`.

## Health check

```http
GET http://localhost:8080/health
```

The health endpoint does not require authentication and returns uptime, an `OK` message, and a timestamp.

## First authenticated request

Register or use the seeded admin account, then send the returned token to a protected endpoint:

```http
Authorization: Bearer <access-token>
```

See the [API Reference](api.md) for endpoint paths and the [RBAC Guide](rbac.md) for permission behavior.

## Quality checks

```bash
npm run typecheck
npm run lint
npm run build
```

## Troubleshooting

- **Database connection refused:** confirm PostgreSQL is running and `DB_HOST`, `DB_PORT`, and credentials are correct.
- **Migration authentication failed:** verify `DB_USER` and `DB_PASSWORD`.
- **Port already in use:** change `PORT` and use that port in requests.
- **Upload fails:** start MinIO and verify the `MINIO_*` values and multipart `file` field.
