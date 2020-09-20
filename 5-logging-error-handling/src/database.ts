import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const usersDb = new Sequelize(
  "users-groups",
  "postgres",
  `${process.env.DATABASE_PASS}`,
  {
    host: "localhost",
    dialect: "postgres"
  }
);

export const groupsDb = new Sequelize(
  "users-groups",
  "postgres",
  `${process.env.DATABASE_PASS}`,
  {
    host: "localhost",
    dialect: "postgres"
  }
);

export const usersGroupsDb = new Sequelize(
  "users-groups",
  "postgres",
  `${process.env.DATABASE_PASS}`,
  {
    host: "localhost",
    dialect: "postgres"
  }
);

usersDb
  .authenticate()
  .then(() => groupsDb.authenticate())
  .then(() =>
    console.log("Connection to all databases has been established successfully")
  )
  .catch(e => console.error("Unable to connect to the database:", e));
