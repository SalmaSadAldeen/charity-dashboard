export const hasPermission = (roles, permissionName) => {
  if (!roles || !Array.isArray(roles)) return false;

  // بيبحث داخل كل الدوريات عن البيرمشن المطلوب
  return roles.some(
    (role) =>
      role.permissions &&
      role.permissions.some((p) => p.name === permissionName),
  );
};
