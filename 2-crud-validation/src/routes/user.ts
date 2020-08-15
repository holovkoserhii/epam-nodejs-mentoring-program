import express from "express";

import {
  logRequestInConsole,
  createUserError,
  createUserAttributesError
} from "../utils/middlewares";
import { logger } from "../logger";
import {
  handleAutosuggest,
  handleGetById,
  handleGetAll,
  handleCreateUser,
  handlePatchUser,
  handleUpdateUser,
  handleDeleteUser
} from "./service/service";

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

router.get("/autosuggest", logRequestInConsole, (req, res, next) => {
  try {
    const { answerList, usersDb } = handleAutosuggest(req);
    logger.info("autosuggest used");
    res.status(200).json({
      message: "Found successfully",
      users: answerList,
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get("/:id", logRequestInConsole, (req, res, next) => {
  try {
    const { user, usersDb } = handleGetById(req);
    logger.info("get user used");
    res.status(200).json({
      message: "Fetched successfully",
      user,
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get("/", logRequestInConsole, (req, res, next) => {
  try {
    const usersDb = handleGetAll();
    logger.info("get all users used");
    res.status(200).json({
      message: "Fetched successfully",
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.post("/", logRequestInConsole, createUserError, (req, res, next) => {
  try {
    const { user, usersDb } = handleCreateUser(req);
    logger.info("new user created");
    res.status(201).json({
      message: "Created successfully",
      user,
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.patch(
  "/:id",
  logRequestInConsole,
  createUserAttributesError,
  (req, res, next) => {
    try {
      const { user, usersDb } = handlePatchUser(req);
      logger.info("user updated");
      res.status(200).json({
        message: "Patched successfully",
        user,
        dbStateAfterOperation: usersDb
      });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

router.put(
  "/:id",
  logRequestInConsole,
  createUserAttributesError,
  (req, res, next) => {
    try {
      const { user, usersDb } = handleUpdateUser(req);
      logger.info("user updated");
      res.status(200).json({
        message: "Put successfully",
        user,
        dbStateAfterOperation: usersDb
      });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

router.delete("/:id", logRequestInConsole, (req, res, next) => {
  try {
    const { user, usersDb } = handleDeleteUser(req);
    logger.info("user softly deleted");
    res.status(200).json({
      message: "Deleted successfully",
      user,
      dbStateAfterOperation: usersDb
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

export default router;
