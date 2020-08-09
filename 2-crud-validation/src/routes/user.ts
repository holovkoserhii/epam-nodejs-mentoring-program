import express from "express";
import uuid4 from "uuid4";
import Ajv from "ajv";

import {
  logRequestInConsole,
  createUserError,
  createUserAttributesError
} from "../utils/middlewares";
import { dbUsers, User } from "../dbMock";
import { logger } from "../logger";
import { userSchema, autosuggestQuerySchema } from "../utils/schemas";

const ajv = new Ajv();
const validateUser = ajv.compile(userSchema);
const validateQuery = ajv.compile(autosuggestQuerySchema);

const router = express.Router();

/*
Couple of remarks: there are some features here I wouldn't use in a real project.
They were maid only for a purpose of this homework, for tracking and debugging (mentor check).
I know it is a bad practice.
1. In a real life for route for users would be e.g. /users/:id.
But for simplicity and a purpose of this homework I made it simple: /:id
2. A password is stored as is.
3. My db is a plain array.
4. After each request I send the current state of the whole db.
*/

let usersDb: User[] = [...dbUsers];

const getUserById = (id: string): User | undefined =>
  usersDb.find(el => el.id === id);

const getUsersByLoginSubstring = (loginSubstring: string) =>
  usersDb.filter(user =>
    user.login.toLowerCase().includes(loginSubstring.toLowerCase())
  );

type QueryType = {
  loginSubstring: string;
  limit: string;
};

router.get("/autosuggest", logRequestInConsole, (req, res) => {
  try {
    const isQueryValid = validateQuery(req.query);
    if (!isQueryValid) throw new Error(validateQuery.errors[0].message);

    const { loginSubstring, limit } = req.query as QueryType;
    const answerList: User[] = getUsersByLoginSubstring(loginSubstring).slice(
      0,
      parseInt(limit, 10)
    );
    logger.info("autosuggest used");
    res.status(200).json({
      message: "Found successfully",
      users: answerList,
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", logRequestInConsole, (req, res) => {
  try {
    const { id } = req.params;
    const user: User = getUserById(id);
    if (!user) throw new Error("No user found");
    logger.info("get user used");
    res.status(200).json({
      message: "Fetched successfully",
      user,
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/", logRequestInConsole, (req, res) => {
  logger.info("get all users used");
  res.status(200).json({
    message: "Fetched successfully",
    dbStateAfterOperation: usersDb
  });
});

router.post("/", logRequestInConsole, createUserError, (req, res) => {
  try {
    const isUserValid = validateUser(req.body);
    if (!isUserValid) throw new Error(validateUser.errors[0].message);
    const user: User = { ...req.body, id: uuid4(), isDeleted: false };
    usersDb = [...usersDb, user];
    logger.info("new user created");
    res.status(201).json({
      message: "Created successfully",
      user,
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.patch(
  "/:id",
  logRequestInConsole,
  createUserAttributesError,
  (req, res) => {
    try {
      const updatedUserParams: Partial<User> = req.body;
      const { id } = req.params;
      usersDb = usersDb.map(user => {
        if (user.id === id) {
          return { ...user, ...updatedUserParams };
        }
        return user;
      });
      logger.info("user updated");
      const user: User = getUserById(id);
      if (!user) throw new Error("No user found");
      res.status(200).json({
        message: "Patched successfully",
        user,
        dbStateAfterOperation: usersDb
      });
    } catch (error) {
      console.log(
        "Why don't I go to this block, if id exists and body is empty?"
      );
      res.status(400).json({ error: error.message });
    }
  }
);

router.put(
  "/:id",
  logRequestInConsole,
  createUserAttributesError,
  (req, res) => {
    try {
      const updatedUser = req.body;
      const { id } = req.params;
      usersDb = [...usersDb.filter(user => user.id !== id), updatedUser];
      logger.info("user updated");
      const user: User = getUserById(id);
      if (!user) throw new Error("No user found");
      res.status(200).json({
        message: "Put successfully",
        user,
        dbStateAfterOperation: usersDb
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.delete("/:id", logRequestInConsole, (req, res) => {
  try {
    const { id } = req.params;
    usersDb = usersDb.map(user => {
      if (user.id === id) {
        return { ...user, isDeleted: true };
      }
      return user;
    });
    const user: User = getUserById(id);
    if (!user) throw new Error("No user found");
    logger.info("user softly deleted");
    res.status(200).json({
      message: "Deleted successfully",
      user,
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
