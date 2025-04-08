import express from "express";
import sql from "../postgres.js";
import cors from "cors";
import { dataRouter } from "./data.js";
import { dashboardRouter } from "./dashboard.js";

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
  const [data] = await sql`SELECT * FROM game_data LIMIT 1;`;
  res.send(data);
});

app.use("/data", dataRouter);
app.use("/dashboard", dashboardRouter);
