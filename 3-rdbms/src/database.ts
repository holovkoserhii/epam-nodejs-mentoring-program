import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  "users-table",
  "postgres",
  `${process.env.DATABASE_PASS}`,
  {
    host: "localhost",
    dialect: "postgres"
  }
);

db.authenticate()
  .then(() => console.log("Connection has been established successfully"))
  .catch(e => console.error("Unable to connect to the database:", e));

export { db };
