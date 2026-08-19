export const hasPermission = (roles, permissionName) => {
  if (!roles || !Array.isArray(roles)) return false;

  return roles.some(
    (role) =>
      role.permissions &&
      role.permissions.some((p) => p.name === permissionName),
  );
};
