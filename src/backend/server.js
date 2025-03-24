import express from "express";
import sql from "./postgres.js";
import cors from "cors";
import { validateFilterParams } from "./middleware.js";

const port = 3000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

app.listen(port, () => {
  // Runs when the server starts (the file is run)
  console.log("Running on port 3000");
});

app.get("/test", async (req, res) => {
  //
  console.log("API hit");
  const [data] = await sql`SELECT * FROM game_data LIMIT 1;`;
  res.send(data);
});

app.get("/first-move", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const filters = [
    { name: "player", operator: "=" },
    { name: "yearStart", operator: ">" },
    { name: "yearEnd", operator: "<" },
    { name: "color", operator: "=" },
    { name: "opponent", operator: "=" },
    { name: "result", operator: "=" },
    { name: "moves", operator: ">" },
    { name: "player_elo", operator: ">" },
    { name: "opponent_elo", operator: ">" },
    { name: "site", operator: "=" },
    { name: "event", operator: "=" },
  ];

  const filterQuery =
    // "WHERE " +
    filters
      .filter((filter) => req.query?.[filter.name])
      .map(
        (filter) =>
          `${filter.name} ${filter.operator} ${req.query[filter.name]}`
      )
      .join(" AND ");
  console.log("🚀 ~ app.get ~ filterQuery:", filterQuery);

  const data = await sql`SELECT
        COUNT(SUBSTRING(lines, 0, 6)) AS count_opening_move,
        SUBSTRING(lines, 0, 6) AS opening_move
    FROM
        game_data
    WHERE 
        1=1
        ${req.query?.player ? sql`AND player = ${req.query.player}` : sql``}
        ${req.query?.yearStart ? sql`AND year > ${req.query.yearStart}` : sql``}
        ${req.query?.yearEnd ? sql`AND year < ${req.query.yearEnd}` : sql``}
        ${req.query?.color ? sql`AND color = ${req.query.color}` : sql``}
        ${
          req.query?.opponent
            ? sql`AND opponent = ${req.query.opponent}`
            : sql``
        }
        ${req.query?.result ? sql`AND result = ${req.query.result}` : sql``}
        ${req.query?.moves ? sql`AND moves > ${req.query.moves}` : sql``}
        ${
          req.query?.player_elo
            ? sql`AND player_elo > ${req.query.player_elo}`
            : sql``
        }
        ${
          req.query?.opponent_elo
            ? sql`AND opponent_elo > ${req.query.opponent_elo}`
            : sql``
        }
        ${req.query?.site ? sql`AND site = ${req.query.site}` : sql``}
        ${req.query?.event ? sql`AND event = ${req.query.event}` : sql``}
        GROUP BY
            SUBSTRING(lines, 0, 6)`;
  console.log("🚀 ~ app.get ~ data:", data);
  res.send(data);
});
