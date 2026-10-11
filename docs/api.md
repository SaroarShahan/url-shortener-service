# API Reference

Unless noted otherwise, combine the route path with the base URL:

```text
http://localhost:8080/api/v1
```

The public short-code route is outside this base path:

```text
http://localhost:8080/:code
```

## Request conventions

JSON requests must send `Content-Type: application/json`. Protected endpoints use:

```http
Authorization: Bearer <access-token>
```

Request bodies, parameters, and query values are validated with Zod.

## Auth

- `POST /auth/register` (rate limited)
- `POST /auth/login` (rate limited)

Login accepts `email` and `password`. The response token is required for protected requests.

## URLs

- `GET /urls` (authenticated, requires `get.url`)
- `POST /urls` (authenticated, rate limited, requires `create.url`)
- `GET /urls/:code` (public redirect, rate limited)
- `DELETE /urls/:code` (authenticated, requires `delete.url`)

Create a URL:

```json
{
  "targetUrl": "https://sequelize.org/docs/v6/",
  "userId": 1
}
```

The response includes a generated NanoID `code` and persisted `shortUrl`. Set `SHORT_URL_BASE_URL` to control that URL; otherwise the local base URL is used.

URL rules:

- `targetUrl` is required, must be valid, and is limited to 100 characters.
- `userId` is optional and must be a positive integer or `null`.
- List requests support `page`, `limit`, `sortBy`, and `orderBy=asc|desc`.
- Public lookups redirect to the target URL.

## Users, roles, and permissions

- Users: `GET|POST /users`, `GET|PATCH|DELETE /users/:id`
- Roles: `GET|POST /roles`, `GET|PATCH|DELETE /roles/:id`
- Permissions: `GET|POST /permissions`, `GET|PATCH|DELETE /permissions/:id`

Create, update, and delete operations require the corresponding authenticated permission. See the [RBAC Guide](rbac.md).

## Uploads

- `POST /uploads` (authenticated, requires `create.upload`)

Send the file as multipart form data using the `file` field. MinIO must be configured for uploads.

## Health check

- `GET /health`

The health endpoint is outside `/api/v1` and does not require authentication.

## Common status codes

- `200` - successful read, update, or redirect
- `201` - successful creation
- `400` - invalid request or validation failure
- `401` - missing or invalid token
- `403` - insufficient permission
- `404` - route or resource not found
- `429` - rate limit exceeded
- `500` - unexpected server error
