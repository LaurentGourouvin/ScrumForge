// roles.service.test.ts
import { describe, it, expect } from "vitest";
import * as RolesService from "../../../src/modules/roles/roles.service";

describe("Roles Service", () => {
  // -----------------------------------------------------
  // getAllRoles()
  // -----------------------------------------------------

  it("should return all available roles", () => {
    const roles = RolesService.getAllRoles();

    expect(Array.isArray(roles)).toBe(true);
    expect(roles.length).toBe(5);
    expect(roles).toEqual(["ADMIN", "ORGANIZATION_MANAGER", "PRODUCT_OWNER", "SCRUM_MASTER", "DEVELOPER"]);

    // tous uniques
    const unique = new Set(roles);
    expect(unique.size).toBe(roles.length);
  });

  // -----------------------------------------------------
  // isValidRole()
  // -----------------------------------------------------

  it("should return true for all valid roles", () => {
    const validRoles = RolesService.getAllRoles();

    validRoles.forEach((role) => {
      expect(RolesService.isValidRole(role)).toBe(true);
    });
  });

  it("should return false for invalid roles", () => {
    const invalidRoles = ["", "admin", "DEV", "MANAGER", "RANDOM_ROLE", "Scrum_Master"];

    invalidRoles.forEach((role) => {
      expect(RolesService.isValidRole(role)).toBe(false);
    });
  });
});
