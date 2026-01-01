import dotenv from "dotenv";
dotenv.config();

export const testConfig = {
  debug: process.env.DEBUG === "true",
  persistDb: process.env.TEST_PERSIST_DB === "true",
  database: {
    host: "localhost",
    port: 5441,
    dbname: "scrumforge_test",
    user: "scrumforge_test",
    password: "scrumforge_test",
  },
};

export const getDatabaseUrl = () => {
  const { host, port, dbname, user, password } = testConfig.database;
  return `postgresql://${user}:${password}@${host}:${port}/${dbname}?schema=public`;
};

export const logTestConfig = () => {
  if (testConfig.debug) {
    console.log("🔍 [TEST CONFIG]", {
      debug: testConfig.debug,
      persistDb: testConfig.persistDb,
      databaseUrl: getDatabaseUrl(),
    });
  }
};
