// users.openapi.ts

export const usersSchemas = {
  User: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      email: { type: "string", format: "email" },
      name: { type: "string", nullable: true },
      role: { type: "string" }, // Role enum côté Prisma, mais on laisse string côté OpenAPI
      createdAt: { type: "string", format: "date-time" },
      updatedAt: { type: "string", format: "date-time" },
    },
    required: ["id", "email", "role", "createdAt", "updatedAt"],
  },

  UsersListResponse: {
    type: "object",
    properties: {
      users: {
        type: "array",
        items: { $ref: "#/components/schemas/User" },
      },
      count: { type: "integer", format: "int32" },
    },
    required: ["users", "count"],
  },

  TeamMemberWithUser: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      teamId: { type: "string", format: "uuid" },
      userId: { type: "string", format: "uuid" },
      user: { $ref: "#/components/schemas/User" },
    },
    required: ["teamId", "userId", "user"],
  },

  UsersByTeamResponse: {
    type: "object",
    properties: {
      users: {
        type: "array",
        items: { $ref: "#/components/schemas/TeamMemberWithUser" },
      },
      count: { type: "integer", format: "int32" },
    },
    required: ["users", "count"],
  },

  CreateUserRequest: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 8 },
      name: { type: "string", nullable: true },
      role: { type: "string" }, // Role enum côté code
    },
    required: ["email", "password", "role"],
  },

  UpdateUserRequest: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      name: { type: "string", nullable: true },
      role: { type: "string" },
      newPassword: { type: "string", minLength: 8 },
    },
    // pas de required : update partiel
  },

  DeleteUserResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
    },
    required: ["success"],
  },

  // Pour les users, le controller renvoie directement `error.message` (string)
  UsersErrorResponse: {
    type: "string",
  },
};

export const usersPaths = {
  "/api/users": {
    get: {
      summary: "List all users",
      tags: ["Users"],
      responses: {
        "200": {
          description: "List of users",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersListResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new user",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateUserRequest" },
          },
        },
      },
      responses: {
        "201": {
          description: "User created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        "400": {
          description: "Missing password or invalid payload",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "409": {
          description: "User already exists (email unique constraint)",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
      },
    },
  },

  "/api/users/{id}": {
    get: {
      summary: "Get a user by ID",
      tags: ["Users"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": {
          description: "User found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        "400": {
          description: "Missing user ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
      },
    },

    patch: {
      summary: "Update an existing user",
      tags: ["Users"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/UpdateUserRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "User updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/User" },
            },
          },
        },
        "400": {
          description: "Missing user ID or no fields to update",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "409": {
          description: "Email already used by another user",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
      },
    },

    delete: {
      summary: "Delete a user",
      tags: ["Users"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": {
          description: "User deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DeleteUserResponse" },
            },
          },
        },
        "400": {
          description: "Missing user ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
      },
    },
  },

  "/api/users/by-team/{id}": {
    get: {
      summary: "List users by team ID",
      tags: ["Users"],
      parameters: [
        {
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string", format: "uuid" },
        },
      ],
      responses: {
        "200": {
          description: "List of team members with user details",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersByTeamResponse" },
            },
          },
        },
        "400": {
          description: "Missing team ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/UsersErrorResponse" },
            },
          },
        },
      },
    },
  },
};
