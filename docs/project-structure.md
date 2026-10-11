# Project Structure

This project follows a layered Express architecture. Routes receive requests, middleware handles cross-cutting concerns, controllers coordinate request handling, and services contain application logic backed by repositories and Sequelize models.

## Repository layout

```text
.
├── .env.example
├── .sequelizerc
├── Dockerfile
├── Dockerfile.dev
├── README.md
├── biome.json
├── docker-compose.yml
├── migrations/
├── package.json
├── seeders/
├── src/
│   ├── config/
│   ├── constants/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── respository/
│   ├── routes/
│   ├── services/
│   ├── types/
│   ├── utils/
│   ├── validations/
│   ├── app.ts
│   ├── Index.ts
│   └── server.ts
├── tsconfig.json
└── package-lock.json
```

## Application source

- `src/config/` - environment configuration and Sequelize initialization.
- `src/constants/` - shared application codes, HTTP status codes, and logger contexts.
- `src/controllers/` - HTTP-facing controllers that call services and format responses.
- `src/middlewares/` - authentication, authorization, validation, rate limiting, uploads, and error handling.
- `src/models/` - Sequelize model definitions and associations.
- `src/respository/` - query builders and database repositories grouped by users, roles, permissions, and URLs.
- `src/routes/` - route definitions mounted under `/api/v1` plus the public short-code route.
- `src/services/` - application and business logic grouped by domain.
- `src/types/` - shared TypeScript types and Express request declarations.
- `src/utils/` - errors, responses, JWT, logging, authorization, storage, and controller helpers.
- `src/validations/` - Zod schemas for request bodies, parameters, and query values.

## Database directories

`migrations/` contains ordered Sequelize schema changes for permissions, roles, users, URLs, and short URLs. `seeders/` creates RBAC data, an admin user, and example URLs.

## Request flow

```text
Client
  -> src/server.ts
  -> src/app.ts
  -> src/routes/
  -> src/middlewares/
  -> src/controllers/
  -> src/services/
  -> src/respository/ or src/models/
  -> PostgreSQL / MinIO
```
