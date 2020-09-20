import uuid4 from "uuid4";
import { Op } from "sequelize";

import { User, Group, UserGroup } from "../interfaces";
import { UserModel } from "../models/User";
import { GroupModel } from "../models/Group";
import { UserGroupModel } from "../models/UserGroup";
import { log } from "util";

export const handleAutosuggest = async (
  loginSubstring: string,
  limit: string
) => {
  const users = await UserModel.findAll({
    where: {
      login: {
        [Op.substring]: loginSubstring
      }
    }
  });
  return users.slice(0, parseInt(limit, 10));
};

export const handleGetUserById = async (id: string) =>
  await UserModel.findByPk(id);

export const handleGetAllUsers = async () => await UserModel.findAll();

export const handleCreateUser = async (userDTO: Partial<User>) =>
  await UserModel.create({ ...userDTO, id: uuid4(), isDeleted: false });

export const handleUpdateUser = async (
  id: string,
  updatedUserParams: Partial<User>
) => {
  const [_, affectedRows] = await UserModel.update(updatedUserParams, {
    where: {
      id
    },
    returning: true
  });
  return affectedRows[0];
};

export const handleDeleteUser = async (id: string) => {
  const t = await UserModel.sequelize.transaction();
  try {
    const [_, affectedRows] = await UserModel.update(
      {
        isDeleted: true
      },
      {
        where: {
          id
        },
        returning: true,
        transaction: t
      }
    );
    const userGroups = await UserGroupModel.findAll({
      raw: true,
      where: {
        userIds: {
          [Op.contains]: [id]
        }
      }
    });
    userGroups.forEach(async ({ userIds, groupId }) => {
      const updatedUserIds = userIds.filter(userId => userId !== id);
      await UserGroupModel.update(
        {
          userIds: updatedUserIds
        },
        {
          where: {
            groupId
          }
        }
      );
    });
    await t.commit();
    return affectedRows[0];
  } catch (e) {
    await t.rollback();
  }
};

export const handleCreateGroup = async (groupDTO: Partial<Group>) => {
  const t = await UserModel.sequelize.transaction();
  try {
    const id = uuid4();
    await UserGroupModel.create(
      { groupId: id, userIds: [] },
      {
        transaction: t
      }
    );
    const group = await GroupModel.create(
      { ...groupDTO, id },
      {
        transaction: t
      }
    );
    await t.commit();
    return group;
  } catch (e) {
    await t.rollback();
  }
};

export const handleGetAllGroups = async () => await GroupModel.findAll();

export const handleGetGroupById = async (id: string) =>
  await GroupModel.findByPk(id);

export const handleUpdateGroup = async (
  id: string,
  updatedGroupParams: Partial<Group>
) => {
  const [_, affectedRows] = await GroupModel.update(updatedGroupParams, {
    where: {
      id
    },
    returning: true
  });
  return affectedRows[0];
};

export const handleDeleteGroup = async (id: string) => {
  const t = await UserModel.sequelize.transaction();
  try {
    await UserGroupModel.destroy({
      where: {
        groupId: id
      },
      transaction: t
    });
    const group = await GroupModel.destroy({
      where: {
        id
      },
      transaction: t
    });
    await t.commit();
    return group;
  } catch (e) {
    t.rollback();
  }
};

export const handleAddUsersToGroup = async ({
  groupId,
  userIds
}: UserGroup) => {
  const t = await UserModel.sequelize.transaction();
  try {
    const userGroup: UserGroup = await UserGroupModel.findByPk(groupId, {
      raw: true
    });
    const userIdsPresent: string[] = userGroup.userIds || [];
    const [_, affectedRows] = await UserGroupModel.update(
      { userIds: Array.from(new Set([...userIdsPresent, ...userIds])) },
      {
        where: { groupId },
        returning: true,
        transaction: t
      }
    );
    await t.commit();
    return affectedRows;
  } catch (e) {
    await t.rollback();
  }
};
