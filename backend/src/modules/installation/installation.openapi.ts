export const installationSchemas = {
  InstallationRequest: {
    type: "object",
    properties: {
      adminEmail: { type: "string", format: "email" },
      adminPassword: { type: "string", minLength: 8 },
      instanceName: { type: "string", nullable: true },
    },
    required: ["adminEmail", "adminPassword"],
  },
  InstallationResponse: {
    type: "object",
    properties: {
      instanceName: { type: "string" },
      adminEmail: { type: "string", format: "email" },
      isInstalled: { type: "boolean" },
    },
    required: ["instanceName", "adminEmail", "isInstalled"],
  },
  InstallationStatusResponse: {
    type: "object",
    properties: {
      isInstalled: { type: "boolean" },
      instanceName: { type: "string", nullable: true },
    },
    required: ["isInstalled"],
  },
};

export const installationPaths = {
  "/api/installation/complete": {
    post: {
      summary: "Initial installation of the ScrumForge instance",
      tags: ["Installation"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/InstallationRequest" },
          },
        },
      },
      responses: {
        "201": {
          description: "Instance installed successfully",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InstallationResponse" },
            },
          },
        },
        "409": {
          description: "Instance already installed or users already exist",
        },
      },
    },
  },
  "/api/installation/status": {
    get: {
      summary: "Returns installation state",
      tags: ["Installation"],
      responses: {
        "200": {
          description: "Installation status",
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/InstallationStatusResponse" },
            },
          },
        },
      },
    },
  },
};
