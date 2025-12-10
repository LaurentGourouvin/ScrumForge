export function formatRole(role: string) {
  return role
    .toLowerCase()
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function mapRolesToOptions(roles: string[]) {
  return roles.map((role) => ({
    label: formatRole(role),
    value: role,
  }));
}
