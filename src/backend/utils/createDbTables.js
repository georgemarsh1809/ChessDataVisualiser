import sql from "../postgres.js";

async function createDbTables() {
  await sql`CREATE TABLE game_data (
        player varchar(50),
        color varchar(50),
        opponent varchar(50),
        player_Elo smallint,
        opponent_Elo smallint,
        result varchar(50),
        event varchar(50),
        site varchar(50),
        date varchar(50),
        lines text,
        moves smallint,
        filename varchar(100),
        id serial,
        PRIMARY KEY (id)
    );`;

  await sql`COPY game_data (player,
color,
opponent,
player_Elo,
opponent_Elo,
result,
event,
site,
date,
lines,
moves,
filename) FROM 'C:/Users/Public/game_data.csv' delimiter ',' csv header;`;

  // COPY zip_codes FROM '/path/to/csv/ZIP_CODES.txt' WITH (FORMAT csv);

  sql.end();
}

createDbTables();
