# Chess Data Visualiser Project

## Requirements
- Node, Postgres 

## Setup
- `npm install`
- `createdb.exe -h localhost -p 5432 chess` (run from C:\Program Files\PostgreSQL\17\bin)
- `node createDbTables.js` (from Project dir)
- `psql.exe --db chess -U postgres "\copy people FROM 'C:\Users\georg\Dev\projects\ChessDataViz\test.csv' WITH DELIMITER ',' CSV HEADER"` (also from C:\Program Files\PostgreSQL\17\bin)

## Running
- To start the front end:
- Navigate to the project directory (C:\Users\georg\Dev\projects\ChessDataViz)
- `npm run dev` 
- To start the backend:
- Navigate to the backend folder (C:\Users\georg\Dev\projects\ChessDataViz\src\backend)
- `node index.js`