import express from "express";
import { filterQuery } from "../utils/filterQuery.js";
import sql from "../postgres.js";
import { validateFilterParams } from "../middleware.js";

export const dashboardRouter = express.Router();

// First move endpoint
dashboardRouter.get("/first-move", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const data = await sql`SELECT * FROM (SELECT
        COUNT(SUBSTRING(lines, 0, 6)) AS count_opening_move,
        SUBSTRING(lines, 0, 6) AS opening_move
    FROM
        game_data
    WHERE 
        1=1
        ${filterQuery(req.query)}
        GROUP BY
            SUBSTRING(lines, 0, 6)) as subquery
            WHERE count_opening_move > 5`;
  // console.log("🚀 ~ dashboardRouter.get ~ data:", data);
  res.send(data);
});

// Result move endpoint
dashboardRouter.get("/outcome", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const data = await sql`SELECT
        COUNT(result) AS count_result,
        result
    FROM
        game_data
    WHERE 
        1=1
        ${filterQuery(req.query)}
        GROUP BY
            result`;
  // console.log("🚀 ~ dashboardRouter.get ~ data:", data);

  res.send(data);
});

// Result move endpoint
dashboardRouter.get("/wins-vs-length", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const data = await sql`SELECT
        COUNT(*) 
    FROM
        game_data
    WHERE 
        1=1
        ${filterQuery(req.query)}
        `;
  // console.log("🚀 ~ dataRouter.get ~ data:", data);

  res.send(data);
});
