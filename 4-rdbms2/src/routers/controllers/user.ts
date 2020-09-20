import express from "express";

import { User } from "../../interfaces";
import {
  logRequestInConsole,
  createGenericError,
  createUserAttributesError,
  validateQueryMiddleware,
  validateUserMiddleware,
  validateAllUserAttributesPresent
} from "../../middlewares";
import { logger } from "../../logger";
import {
  handleAutosuggest,
  handleGetUserById,
  handleGetAllUsers,
  handleCreateUser,
  handleUpdateUser,
  handleDeleteUser
} from "../../data-access/api";

const router = express.Router();

type QueryType = {
  loginSubstring: string;
  limit: string;
};

router.get(
  "/autosuggest",
  logRequestInConsole,
  validateQueryMiddleware,
  async (req, res, next) => {
    try {
      const { loginSubstring, limit } = req.query as QueryType;
      const answerList = await handleAutosuggest(loginSubstring, limit);
      logger.info("autosuggest used");
      res.status(200).json({
        users: answerList
      });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

router.get("/:id", logRequestInConsole, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await handleGetUserById(id);
    logger.info("get user used");
    res.status(200).json({
      user
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get("/", logRequestInConsole, async (req, res, next) => {
  try {
    const users = await handleGetAllUsers();
    logger.info("get all users used");
    res.status(200).json({
      users
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.post(
  "/",
  logRequestInConsole,
  createGenericError,
  validateUserMiddleware,
  async (req, res, next) => {
    try {
      const userDTO: Partial<User> = req.body;
      const user = await handleCreateUser(userDTO);
      logger.info("new user created");
      res.status(201).json({
        user
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
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUserParams: Partial<User> = req.body;
      const user = await handleUpdateUser(id, updatedUserParams);
      logger.info("user updated");
      res.status(200).json({
        user
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
  validateAllUserAttributesPresent,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedUserDTO: User = req.body;
      const user = await handleUpdateUser(id, updatedUserDTO);
      logger.info("user updated");
      res.status(200).json({
        user
      });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

router.delete("/:id", logRequestInConsole, async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await handleDeleteUser(id);
    logger.info("user softly deleted");
    res.status(200).json({
      user
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

export default router;
