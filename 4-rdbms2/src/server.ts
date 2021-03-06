import express from "express";
import userRouter from "./routers/controllers/user";
import groupsRouter from "./routers/controllers/group";
import dotenv from "dotenv";
import "./logger";
dotenv.config();

const app = express();

app.use(express.json());
app.use("/users", userRouter);
app.use("/groups", groupsRouter);
app.use((err, req, res, next) => {
  res.status(err.status).json({ error: err.message });
});

const port = process.env.PORT;
const host = process.env.HOST;

app.listen(port, () => {
  console.log(`listening for requests on port ${host}:${port}`);
});
