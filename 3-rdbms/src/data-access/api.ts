import uuid4 from "uuid4";
import { Op } from "sequelize";

import { User } from "../interfaces";
import { UserModel } from "../models/User";

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

export const handleGetById = async (id: string) => await UserModel.findByPk(id);

export const handleGetAll = async () => await UserModel.findAll();

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
  const [_, affectedRows] = await UserModel.update(
    {
      isDeleted: true
    },
    {
      where: {
        id
      },
      returning: true
    }
  );
  return affectedRows[0];
};
