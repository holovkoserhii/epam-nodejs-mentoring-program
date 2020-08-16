import express from "express";

import { User } from "../dbMock";
import {
  logRequestInConsole,
  createUserError,
  createUserAttributesError,
  validateQueryMiddleware,
  validateUserMiddleware
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

type QueryType = {
  loginSubstring: string;
  limit: string;
};

router.get(
  "/autosuggest",
  logRequestInConsole,
  validateQueryMiddleware,
  (req, res, next) => {
    try {
      const { loginSubstring, limit } = req.query as QueryType;
      const { answerList, usersDb } = handleAutosuggest(loginSubstring, limit);
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
  }
);

router.get("/:id", logRequestInConsole, (req, res, next) => {
  try {
    const { id } = req.params;
    const { user, usersDb } = handleGetById(id);
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

router.post(
  "/",
  logRequestInConsole,
  createUserError,
  validateUserMiddleware,
  (req, res, next) => {
    try {
      const { userDTO }: { userDTO: Partial<User> } = req.body;
      const { user, usersDb } = handleCreateUser(userDTO);
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
  }
);

router.patch(
  "/:id",
  logRequestInConsole,
  createUserAttributesError,
  (req, res, next) => {
    try {
      const updatedUserParams: Partial<User> = req.body;
      const { user, usersDb } = handlePatchUser(updatedUserParams);
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
      const updatedUserDTO: User = req.body;
      const { user, usersDb } = handleUpdateUser(updatedUserDTO);
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
    const { id } = req.params;
    const { user, usersDb } = handleDeleteUser(id);
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
