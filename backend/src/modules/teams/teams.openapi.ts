export const teamsSchemas = {
  Team: {
    type: "object",
    properties: {
      id: { type: "string", format: "uuid" },
      name: { type: "string" },
      description: { type: "string", nullable: true },
    },
    required: ["id", "name"],
  },

  TeamsListResponse: {
    type: "object",
    properties: {
      teams: {
        type: "array",
        items: { $ref: "#/components/schemas/Team" },
      },
      count: {
        type: "integer",
        format: "int32",
      },
    },
    required: ["teams", "count"],
  },

  TeamResponse: {
    type: "object",
    properties: {
      team: { $ref: "#/components/schemas/Team" },
    },
    required: ["team"],
  },

  CreateTeamRequest: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string", nullable: true },
    },
    required: ["name"],
  },

  UpdateTeamRequest: {
    type: "object",
    properties: {
      name: { type: "string" },
      description: { type: "string", nullable: true },
    },
    // pas de required : update partiel
  },

  DeleteTeamResponse: {
    type: "object",
    properties: {
      success: { type: "boolean" },
    },
    required: ["success"],
  },

  ErrorResponse: {
    type: "object",
    properties: {
      error: { type: "string" },
    },
    required: ["error"],
  },
};

export const teamsPaths = {
  "/api/teams": {
    get: {
      summary: "List all teams",
      tags: ["Teams"],
      responses: {
        "200": {
          description: "List of teams",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TeamsListResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
    post: {
      summary: "Create a new team",
      tags: ["Teams"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/CreateTeamRequest" },
          },
        },
      },
      responses: {
        "201": {
          description: "Team created successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TeamResponse" },
            },
          },
        },
        "400": {
          description: "Missing team name",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "409": {
          description: "Team name already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },

  "/api/teams/{id}": {
    get: {
      summary: "Get a team by ID",
      tags: ["Teams"],
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
          description: "Team found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/TeamResponse" },
            },
          },
        },
        "400": {
          description: "Missing team ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "404": {
          description: "Team not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },

    patch: {
      summary: "Update an existing team",
      tags: ["Teams"],
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
            schema: { $ref: "#/components/schemas/UpdateTeamRequest" },
          },
        },
      },
      responses: {
        "200": {
          description: "Team updated successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/Team" },
            },
          },
        },
        "400": {
          description: "Missing team ID or no fields to update",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "404": {
          description: "Team not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "409": {
          description: "Team name already exists",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },

    delete: {
      summary: "Delete a team",
      tags: ["Teams"],
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
          description: "Team deleted successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/DeleteTeamResponse" },
            },
          },
        },
        "400": {
          description: "Missing team ID",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "404": {
          description: "Team not found",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
        "500": {
          description: "Internal server error",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/ErrorResponse" },
            },
          },
        },
      },
    },
  },
};
