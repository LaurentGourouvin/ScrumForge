export const rolesSchemas = {
  Role: {
    type: "string",
    enum: ["ADMIN", "ORGANIZATION_MANAGER", "PRODUCT_OWNER", "SCRUM_MASTER", "DEVELOPER"],
  },

  RolesListResponse: {
    type: "array",
    items: { $ref: "#/components/schemas/Role" },
  },
};

export const rolesPaths = {
  "/api/roles": {
    get: {
      summary: "List all available roles",
      tags: ["Roles"],
      responses: {
        "200": {
          description: "List of roles",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/RolesListResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
        },
      },
    },
  },
};
