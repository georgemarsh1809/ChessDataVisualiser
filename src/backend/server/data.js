import express from "express";
import { filterQuery } from "../utils/filterQuery.js";
import sql from "../postgres.js";
import { validateFilterParams } from "../middleware.js";

export const dataRouter = express.Router();

dataRouter.get("/total-games-count", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const data = await sql`SELECT 
        COUNT(player)
      FROM 
        game_data
      WHERE 
        1=1
        ${req.query?.player ? sql`AND player like ${req.query.player}` : sql``}

  `;
  res.send(data);
});

dataRouter.get("/get-moves", async (req, res, next) => {
  validateFilterParams(req, res, next);

  const data = await sql`SELECT 
        lines
      FROM 
        game_data
      WHERE 
        1=1
        ${req.query?.id ? sql`AND id = ${req.query.id}` : sql``}

  `;
  res.send(data);
});

// API call for getting all games for a certain player to be displayed in data tab
dataRouter.get("/all-game-data", async (req, res, next) => {
  validateFilterParams(req, res, next);
  const offset = req.query?.pageNumber ? 10 * req.query.pageNumber : 1;

  const data = await sql`SELECT
    opponent, 
    site, 
    event, 
    year, 
    result,
    id
FROM
  game_data
WHERE 
  1=1
  ${filterQuery(req.query)}
  ORDER BY  
      year DESC
  LIMIT 10
  OFFSET ${req.query?.pageNumber ? sql`${offset}` : sql``}`;

  res.send(data);
});
