import { DataTypes } from "sequelize";
import { groupsDb } from "../database";

export const GroupModel = groupsDb.define(
  "group",
  {
    name: {
      type: DataTypes.STRING
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    permissions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    }
  },
  {
    timestamps: false
  }
);
