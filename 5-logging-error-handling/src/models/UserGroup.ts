import { DataTypes, Model, BuildOptions } from "sequelize";
import { usersGroupsDb } from "../database";
import { UserGroup } from "../interfaces";

interface UserGroupModel extends Model {
  groupId: string;
  userIds: string[];
}

type UserGroupStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserGroupModel;
};

export const UserGroupModel: UserGroupStatic = usersGroupsDb.define(
  "users-groups",
  {
    userIds: {
      type: DataTypes.ARRAY(DataTypes.UUID)
    },
    groupId: {
      type: DataTypes.UUID,
      primaryKey: true
    }
  },
  {
    timestamps: false
  }
);
