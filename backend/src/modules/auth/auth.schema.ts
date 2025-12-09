// auth.openapi.ts

export const authSchemas = {
  LoginRequest: {
    type: "object",
    properties: {
      email: { type: "string", format: "email" },
      password: { type: "string", minLength: 12 },
    },
    required: ["email", "password"],
  },

  User: {
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      role: { type: "string" },
      name: { type: "string" },
    },
    required: ["id", "email", "role", "name"],
  },

  LoginSuccessResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", const: true },
      message: { type: "string" },
      user: { $ref: "#/components/schemas/User" },
    },
    required: ["success", "message", "user"],
  },

  LoginErrorResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", const: false },
      message: { type: "string" },
    },
    required: ["success", "message"],
  },

  LogoutResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
      message: { type: "string" },
    },
    required: ["success", "message"],
  },

  GetMeSuccessResponse: {
    type: "object",
    properties: {
      id: { type: "string" },
      email: { type: "string", format: "email" },
      role: { type: "string" },
      name: { type: "string" },
    },
    required: ["id", "email", "role", "name"],
  },

  GenericErrorResponse: {
    type: "object",
    properties: {
      success: { type: "boolean", const: false },
      message: { type: "string" },
    },
    required: ["success", "message"],
  },
};

export const authPaths = {
  "/api/auth/login": {
    post: {
      summary: "Login with email and password",
      tags: ["Auth"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/LoginRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Login successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginSuccessResponse" },
            },
          },
        },
        "401": {
          description: "Invalid credentials",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginErrorResponse" },
            },
          },
        },
      },
    },
  },

  "/api/auth/logout": {
    post: {
      summary: "Logout current user",
      tags: ["Auth"],
      responses: {
        "200": {
          description: "Logout successful",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LogoutResponse" },
            },
          },
        },
      },
    },
  },

  "/api/auth/me": {
    get: {
      summary: "Get current authenticated user",
      tags: ["Auth"],
      responses: {
        "200": {
          description: "Current user",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GetMeSuccessResponse" },
            },
          },
        },
        "404": {
          description: "User not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/GenericErrorResponse" },
            },
          },
        },
      },
    },
  },
};
