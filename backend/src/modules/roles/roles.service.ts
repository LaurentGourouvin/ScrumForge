import { Role } from "../../../prisma/generated/prisma/enums";

/**
 * Returns all available roles in the system.
 *
 * @returns {Role[]} Array of all roles
 *
 */
export function getAllRoles(): Role[] {
  return ["ADMIN", "ORGANIZATION_MANAGER", "PRODUCT_OWNER", "SCRUM_MASTER", "DEVELOPER"] as Role[];
}

/**
 * Checks if a given string is a valid role.
 *
 * @param {string} role - The role to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidRole(role: string): role is Role {
  const validRoles: Role[] = getAllRoles();
  return validRoles.includes(role as Role);
}
