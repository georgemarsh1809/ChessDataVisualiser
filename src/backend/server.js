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

app.get("/total-games", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const data = await sql`SELECT 
        COUNT(player)
      FROM 
        game_data
      WHERE 
        1=1
        ${req.query?.player ? sql`AND player like ${req.query.player}` : sql``}
        
  `
  console.log("🚀 ~ app.get ~ totalGameData:", data);
  res.send(data)
})

// First move endpoint
app.get("/first-move", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const data = await sql`SELECT * FROM (SELECT
        COUNT(SUBSTRING(lines, 0, 6)) AS count_opening_move,
        SUBSTRING(lines, 0, 6) AS opening_move
    FROM
        game_data
    WHERE 
        1=1
        ${req.query?.player ? sql`AND player like ${req.query.player}` : sql``}
        ${req.query?.yearStart ? sql`AND year > ${req.query.yearStart}` : sql``}
        ${req.query?.yearEnd ? sql`AND year < ${req.query.yearEnd}` : sql``}
        ${req.query?.color ? sql`AND color = ${req.query.color}` : sql``}
        ${req.query?.opponent
      ? sql`AND opponent = ${req.query.opponent}`
      : sql``
    }
        ${req.query?.result ? sql`AND result = ${req.query.result}` : sql``}
        ${req.query?.moves ? sql`AND moves > ${req.query.moves}` : sql``}
        ${req.query?.player_elo
      ? sql`AND player_elo > ${req.query.player_elo}`
      : sql``
    }
        ${req.query?.opponent_elo
      ? sql`AND opponent_elo > ${req.query.opponent_elo}`
      : sql``
    }
        ${req.query?.site ? sql`AND site = ${req.query.site}` : sql``}
        ${req.query?.event ? sql`AND event = ${req.query.event}` : sql``}
        GROUP BY
            SUBSTRING(lines, 0, 6))
            WHERE count_opening_move > 5`;
  // console.log("🚀 ~ app.get ~ data:", data);
  res.send(data);
});

// Result move endpoint
app.get("/outcome", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const data = await sql`SELECT
        COUNT(result) AS count_result,
        result
    FROM
        game_data
    WHERE 
        1=1
        ${req.query?.player ? sql`AND player like ${req.query.player}` : sql``}
        ${req.query?.yearStart ? sql`AND year > ${req.query.yearStart}` : sql``}
        ${req.query?.yearEnd ? sql`AND year < ${req.query.yearEnd}` : sql``}
        ${req.query?.color ? sql`AND color = ${req.query.color}` : sql``}
        ${req.query?.opponent
      ? sql`AND opponent = ${req.query.opponent}`
      : sql``
    }
        ${req.query?.result ? sql`AND result = ${req.query.result}` : sql``}
        ${req.query?.moves ? sql`AND moves > ${req.query.moves}` : sql``}
        ${req.query?.player_elo
      ? sql`AND player_elo > ${req.query.player_elo}`
      : sql``
    }
        ${req.query?.opponent_elo
      ? sql`AND opponent_elo > ${req.query.opponent_elo}`
      : sql``
    }
        ${req.query?.site ? sql`AND site = ${req.query.site}` : sql``}
        ${req.query?.event ? sql`AND event = ${req.query.event}` : sql``}
        GROUP BY
            result`;
  console.log("🚀 ~ app.get ~ data:", data);
  console.log(req.query.player)

  res.send(data);

})