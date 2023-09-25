import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
});

// // or
// const pool = new Pool({
//   host: "127.0.0.1",
//   port: 5435,
//   user: "postgres",
//   password: "postgres",
//   database: "db_name",
// });

const db = drizzle(pool);
