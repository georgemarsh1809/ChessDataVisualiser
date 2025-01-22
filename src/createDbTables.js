import sql from "./backend/postgres.js";

async function createDbTables() {

    await sql`CREATE TABLE IF NOT EXISTS people (
        id smallint,
        name varchar(50),
        age smallint,
        PRIMARY KEY (id)
    );`;

    sql.end()
}

createDbTables()