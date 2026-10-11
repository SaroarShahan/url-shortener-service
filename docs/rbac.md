# RBAC Guide

Role-based access control answers two questions for each protected request: who is making the request, and whether that user's role grants the required permission.

## Core tables

- `roles`
- `permissions`
- `role_permissions`
- `users.role_id`

A user has one role, and a role can have many permissions.

## Authentication flow

Protected requests include a bearer token. Authentication verifies the token and loads the user, role, and permission names. Authorization then checks the required permission before the controller runs.

```ts
hasPermission('create.url');
hasPermission('roles.update');
```

The seeded `admin` role bypasses individual permission checks. Other roles must have the required permission through `role_permissions`.

## Permission names

URL permissions include:

- `create.url`
- `get.url`
- `delete.url`

Other seeded permissions cover users, roles, permissions, and uploads. Follow the existing `module.action` naming convention when adding new permissions.

## Adding a protected action

1. Add the permission in a migration or seeder.
2. Assign it to the appropriate role through `role_permissions`.
3. Add `hasPermission('module.action')` to the route.
4. Document the permission in this guide and the API reference.
