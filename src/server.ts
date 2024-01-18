import express from "express";
import cors from "cors";
import { config } from "dotenv";
import mysql from "mysql2/promise";

config();

let conn: mysql.Connection | null = null;

// const connect = async () => {
//   conn = await mysql.createConnection({
//     host: process.env.DBHOST,
//     user: process.env.DBUSER,
//     password: process.env.DBPASS,
//     database: process.env.DBNAME,
//     port: Number(process.env.DBPORT),
//     connectionLimit: 10,
//   });
// };

const DBURL:any = process.env.DATABASE_URL;

const connection = async () => {
  conn = await mysql.createConnection(DBURL);
};




const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", async (req, res) => {
  if (!conn) await connection();
  const result :any = await conn?.query("SELECT * FROM users");
  res.json(result[0]);
});

app.listen(PORT,() => {
  console.log(`server on http://localhost:${PORT}`);
});
