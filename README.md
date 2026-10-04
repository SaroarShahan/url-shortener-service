# URL Shortener Service

A TypeScript URL shortener API built with Express and Sequelize.

## Features

- Express API with JSON request parsing
- JWT authentication
- User, role, and permission management
- URL creation, lookup, listing, and deletion
- Request validation with Zod
- PostgreSQL support through Sequelize
- Sequelize migrations and seeders
- Health check endpoint
- Environment variable support with `dotenv`

## Requirements

- Node.js `24.15.0`
- npm
- PostgreSQL

## Getting Started

Install dependencies:

```bash
npm install
```

Create the environment file:

```bash
cp .env.example .env
```

Update `.env` with your database credentials:

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

Run the database migrations and seed data:

```bash
npm run migrate
npm run seed
```

The seeders create the default admin role, permissions, admin user, and example URLs.
The default admin credentials are:

```text
Email: admin@example.com
Password: Admin@12345
```

Set `SEED_ADMIN_PASSWORD` before running the seeders to use a different password.

Start the development server:

```bash
npm run dev
```

Build and start the production server:

```bash
npm run build
npm start
```

The API uses `PORT` from `.env` and defaults to port `4000` when it is not set.

## Health Check

Once the server is running:

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

## API

Application routes are mounted under `/api/v1`.

### Authentication

```http
POST /api/v1/auth/register
POST /api/v1/auth/login
```

Use the returned token for protected endpoints:

```http
Authorization: Bearer <token>
```

### URLs

```http
GET    /api/v1/urls
POST   /api/v1/urls
GET    /api/v1/urls/:code
DELETE /api/v1/urls/:code
```

Fetching a URL by code redirects to its target URL:

```http
GET /api/v1/urls/docs
```

Create a URL:

```json
{
  "targetUrl": "https://sequelize.org/docs/v6/",
  "userId": 1
}
```

The response includes the generated `code` and a ready-to-use `shortUrl`, for example:

```json
{
  "code": "V1StGXR8_Z5jd",
  "targetUrl": "https://sequelize.org/docs/v6/",
  "shortUrl": "http://localhost:8000/api/v1/urls/V1StGXR8_Z5jd"
}
```

URL request rules:

- `code` is generated automatically with NanoID.
- `targetUrl` is required, must be a valid URL, and is limited to 100 characters.
- `userId` is optional and must be a positive integer or `null`.
- URL lookups and deletion use the generated URL code.
- List requests support `page`, `limit`, `sortBy`, and `orderBy=asc|desc`.

The create response includes the persisted short URL:

```json
{
  "code": "3xK9a",
  "shortUrl": "http://localhost:8080/3xK9a"
}
```

Set `SHORT_URL_BASE_URL` to the base URL that should be stored. If it is not set,
the service uses the local API URL:

```env
SHORT_URL_BASE_URL=http://localhost:8080
```

The stored short URL is available in the URL response and points directly to the
public short-code route:

```http
GET http://localhost:8080/docs
```

### Users, Roles, and Permissions

```http
GET    /api/v1/users
POST   /api/v1/users
GET    /api/v1/users/:id
PATCH  /api/v1/users/:id
DELETE /api/v1/users/:id

GET    /api/v1/roles
POST   /api/v1/roles
GET    /api/v1/roles/:id
PATCH  /api/v1/roles/:id
DELETE /api/v1/roles/:id

GET    /api/v1/permissions
POST   /api/v1/permissions
GET    /api/v1/permissions/:id
PATCH  /api/v1/permissions/:id
DELETE /api/v1/permissions/:id
```

Create, update, and delete operations for users, roles, and permissions require the
corresponding authenticated permission.

## Database Commands

Run all pending migrations:

```bash
npm run migrate
```

Check migration status:

```bash
npx sequelize-cli db:migrate:status
```

Undo the latest migration:

```bash
npm run migrate:undo
```

Undo all migrations:

```bash
npm run migrate:undo:all
```

Run all seeders:

```bash
npm run seed
```

Undo the latest seeder:

```bash
npm run seed:undo
```

Undo all seeders:

```bash
npm run seed:undo:all
```

Generate a migration:

```bash
npm run migration:gen -- add-example-table
```

Generate a model:

```bash
npm run model:gen -- User --attributes name:string,email:string
```

Sequelize CLI loads the TypeScript application configuration through
`sequelize.config.cjs`.

## Development Commands

```bash
npm run typecheck
npm run lint
npm run format
```

## Project Structure

```text
.
├── migrations/
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
│   ├── utils/
│   └── Index.ts
├── .env.example
├── .sequelizerc
├── package.json
├── sequelize.config.cjs
├── tsconfig.json
└── README.md
```

## License

MIT
