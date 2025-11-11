import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString:
    "postgresql://neondb_owner:npg_o7Rn2wUrbxpj@ep-royal-violet-aecw6is6-pooler.c-2.us-east-2.aws.neon.tech/weconnect?sslmode=require&channel_binding=require",
  ssl: {
    rejectUnauthorized: false,
  },
});

export default pool;
