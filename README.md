# Chess Data Visualiser Project

## Requirements📋

- Node, Postgres

## Setup🛠️

- `npm install`
- `createdb.exe -h localhost -p 5432 chess` (run from C:\Program Files\PostgreSQL\17\bin)
- `node createDbTables.js` (from Project dir)
- `psql.exe --db chess -U postgres "\copy people FROM 'C:\Users\georg\Dev\projects\ChessDataViz\test.csv' WITH DELIMITER ',' CSV HEADER"` (also from C:\Program Files\PostgreSQL\17\bin)

## Running🔥

- To start the front end:
- Navigate to the project directory (C:\Users\georg\Dev\projects\ChessDataViz)
- `npm run dev`
- To start the backend:
- Navigate to the backend folder (C:\Users\georg\Dev\projects\ChessDataViz\src\backend)
- `node server.js`

## Database Link📈

- https://www.kaggle.com/datasets/liury123/chess-game-from-12-top-players

SELECT count(\*)
FROM game_data
WHERE lines LIKE '1. e4%' AND player LIKE 'Tal';

select \*
from game_data
group by lines

SELECT left(lines,5) as id
FROM game_data
WHERE player like 'Tal'
GROUP BY left(lines,5);

+-------------+-------------------------+
| OperationId | Error |
+-------------+-------------------------+
| 1 | MajorCategoryX:DetailsP |
| 2 | MajorCategoryX:DetailsQ |
| 3 | MajorCategoryY:DetailsR |
+-------------+-------------------------+

SELECT
COUNT(SUBSTRING(lines, 0, 5) AS opening_move)
FROM game_data
GROUP BY SUBSTRING(lines, 0, 5)

SELECT
COUNT(SUBSTRING(lines, 0, 6)) AS count_opening_move,
SUBSTRING(lines, 0, 6) AS opening_move,
coalesce(CAST(SUBSTRING(date, 0, 5) AS integer), 0) AS year_int,
FROM game_data
WHERE player like 'Tal' AND year_int > 1982
GROUP BY SUBSTRING(lines, 0, 6)
