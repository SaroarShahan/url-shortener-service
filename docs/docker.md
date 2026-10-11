# Docker Guide

Docker Compose provides a development environment with the API and PostgreSQL.

## Requirements

- Docker Engine with Compose support
- Free host ports `8080` and `5432`

## Configure environment variables

Copy `.env.example` to `.env`. Compose overrides the API container's `DB_HOST` to `db` and `DB_PORT` to `5432`. The PostgreSQL container uses `DB_USER`, `DB_PASSWORD`, and `DB_NAME` from `.env`.

## Build and start

```bash
docker compose up --build -d
```

The API is available at `http://localhost:8080`.

## Run migrations and seed data

```bash
docker compose exec api npm run migrate
docker compose exec api npm run seed
```

## Logs and status

```bash
docker compose logs -f api
docker compose ps
```

## Stop containers

```bash
docker compose down
```

To remove the local PostgreSQL volume as well:

```bash
docker compose down -v
```

This permanently removes local database data.

## Typical flow

```bash
docker compose up --build -d
docker compose exec api npm run migrate
docker compose exec api npm run seed
docker compose logs -f api
```
