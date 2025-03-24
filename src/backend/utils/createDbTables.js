import sql from "../postgres.js";
import path from "path";
async function createDbTables() {
  console.log(path.resolve("./data/game_data.csv"));

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
        year smallint,
        lines text,
        moves smallint,
        filename varchar(100),
        id serial,
        PRIMARY KEY (id)
    );`;

  // game_data location on george's machine: 'C:/Users/Public/game_data.csv'
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
    filename) FROM '/Users/henry/Projects/ChessDataVisualiser/data/game_data.csv'\
     delimiter ',' csv header;`;

  sql.end();
}

createDbTables();
