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


adding the api:
go in sql editor and write new query
add new route into server.js
copy query into sql block
anything that is a parameter eg name goes into ${}

calling the api:
add new useEffect into app.jsx
call you api in new useeffect
add new value into store.js for new data
go into dashboard.js and retreive that data
pass data as a param into graph react component

### other graphs to make:
- ! win percentage vs game length (move count, 0-20, 21-40, 41-60, 61-80, 81-100, 100+)
- ! games played vs year
- ! win % vs year 
- win percentage vs opponent elo //  oppoent elo vs result (scatter graph)
- avg move count vs result 
- games played vs event 
- move count vs year 

