import postgres from "postgres";

// const PSQL_DB_PW = import.meta.env.PSQL_DB_PW // Currently doesn't work
// doesnt work as thats a vite thing. Use process.env.PSQL_DB_PW instead

const sql = postgres({
  db: "chess",
  // commented out to work on henry's machine
  user: "postgres",
  password: "Drum&Bass420!",
}); // will use psql environment variables

export default sql;
