import mysql2 from "mysql2/promise";

export const connection = mysql2.createPool({
  host: "127.0.0.1",
  user: "root",
  port: "3306",
  password: "root",
  database: "weconnect",
});
