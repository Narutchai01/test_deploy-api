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
    connectionLimit: 10,
  });
};

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/getuser", async (req, res) => {
  res.send("Hello sur!");
});

app.get("/getsurveyor", async (req, res) => {
  await connect();
  const result: any = await conn?.query("SELECT * FROM Surveyor");
  res.status(200).send(result[0]);
});

app.listen(PORT,() => {
  console.log(`server on http://localhost:${PORT}`);
});
