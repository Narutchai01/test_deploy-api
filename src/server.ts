import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mysql from "mysql2/promise";

config();

let conn = null as any;

const connect = async () => {
  conn = await mysql.createConnection({
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    port: Number(process.env.DBPORT),
  });
};

const app = express();
app.use(cors());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getsurveyor", async (req, res) => {
  await connect();
  const result: any = await conn?.query("SELECT * FROM Surveyor");
  res.send(result[0]);
});

app.listen(PORT, async () => {
  console.log(`server on http://localhost:${PORT}`);
});
