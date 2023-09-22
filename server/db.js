import mysql from "mysql";
import dotenv from "dotenv";

dotenv.config();
/*
const connection = mysql.createConnection({
  host: `/cloudsql/${process.env.host}`,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
  socketPath: `/cloudsql/${process.env.host}`,
});
*/

const connection = mysql.createConnection({
  host: process.env.host,
  user: process.env.user,
  password: process.env.password,
  database: process.env.database,
});

export default connection;
