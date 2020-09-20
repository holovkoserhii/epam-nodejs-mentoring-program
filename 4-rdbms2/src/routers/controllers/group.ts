import express from "express";

import { Group, UserGroup } from "../../interfaces";
import {
  logRequestInConsole,
  createGenericError,
  createGroupAttributesError,
  validateGroupMiddleware,
  validateAllGroupAttributesPresent,
  validateUserGroupMiddleware
} from "../../middlewares";
import { logger } from "../../logger";
import {
  handleGetGroupById,
  handleGetAllGroups,
  handleCreateGroup,
  handleUpdateGroup,
  handleDeleteGroup,
  handleAddUsersToGroup
} from "../../data-access/api";

const router = express.Router();

router.get("/:id", logRequestInConsole, async (req, res, next) => {
  try {
    const { id } = req.params;
    const group = await handleGetGroupById(id);
    logger.info("get group used");
    res.status(200).json({
      group
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

router.get("/", logRequestInConsole, async (req, res, next) => {
  try {
    const groups = await handleGetAllGroups();
    logger.info("get all groups used");
    res.status(200).json({
      groups
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
  validateGroupMiddleware,
  async (req, res, next) => {
    try {
      const groupDTO: Partial<Group> = req.body;
      const group = await handleCreateGroup(groupDTO);
      logger.info("new group created");
      res.status(201).json({
        group
      });
    } catch (error) {
      error.status = 400;
      next(error);
    }
  }
);

router.post(
  "/addUsersToGroup",
  logRequestInConsole,
  createGenericError,
  validateUserGroupMiddleware,
  async (req, res, next) => {
    try {
      const userGroupDTO: UserGroup = req.body;
      const userGroup = await handleAddUsersToGroup(userGroupDTO);
      logger.info("the user added to the group");
      res.status(201).json({
        userGroup
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
  createGroupAttributesError,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedGroupParams: Partial<Group> = req.body;
      const group = await handleUpdateGroup(id, updatedGroupParams);
      logger.info("group updated");
      res.status(200).json({
        group
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
  validateAllGroupAttributesPresent,
  validateGroupMiddleware,
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const updatedGroupDTO: Group = req.body;
      const group = await handleUpdateGroup(id, updatedGroupDTO);
      logger.info("group updated");
      res.status(200).json({
        group
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
    const deletedGroupsNumber: number = await handleDeleteGroup(id);
    logger.info("group hard deleted");
    res.status(200).json({
      deletedGroupsNumber
    });
  } catch (error) {
    error.status = 400;
    next(error);
  }
});

export default router;
