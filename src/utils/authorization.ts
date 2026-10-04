import { AUTHORIZATION_POLICIES, USER_ROLES } from '../constants';

class Authorization {
  hasOwnership(user, ownerIdOrIds) {
    const ownerIds = Array.isArray(ownerIdOrIds) ? ownerIdOrIds : [ownerIdOrIds];

    return ownerIds.includes(user.id);
  }

  isOwnerOrAdmin(user, ownerIdOrIds) {
    if (user.role === USER_ROLES.ADMIN) {
      return true;
    }

    return this.hasOwnership(user, ownerIdOrIds);
  }

  matchesPolicy(user, ownerIdOrIds, policy) {
    return policy.allowAdmin
      ? this.isOwnerOrAdmin(user, ownerIdOrIds)
      : this.hasOwnership(user, ownerIdOrIds);
  }

  canEdit(user, ownerId, policy = AUTHORIZATION_POLICIES.OWNER_ONLY) {
    return this.matchesPolicy(user, ownerId, policy);
  }

  canDelete(user, ownerId, policy = AUTHORIZATION_POLICIES.OWNER_OR_ADMIN) {
    return this.matchesPolicy(user, ownerId, policy);
  }
}

export { Authorization };
