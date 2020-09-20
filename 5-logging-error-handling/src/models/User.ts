import { DataTypes } from "sequelize";
import { usersDb } from "../database";

export const UserModel = usersDb.define(
  "user",
  {
    login: {
      type: DataTypes.STRING
    },
    id: {
      type: DataTypes.UUID,
      primaryKey: true
    },
    password: {
      type: DataTypes.STRING
    },
    age: {
      type: DataTypes.INTEGER
    },
    isDeleted: {
      type: DataTypes.BOOLEAN
    }
  },
  {
    timestamps: false
  }
);

// populate table with values, but only once, during the initialization
UserModel.findAll().then(values => {
  if (!values.length) {
    UserModel.bulkCreate([
      {
        id: "6e059811-bee3-4d7b-8fe1-e4b506208706",
        login: "Britanica",
        password: "SDFfdgf546",
        age: 44,
        isDeleted: false
      },
      {
        id: "7cc94b34-5b61-41b0-83cb-3c6c571b4e36",
        login: "Brita",
        password: "SDFfdgf546",
        age: 33,
        isDeleted: false
      },
      {
        id: "d7b6af51-170a-4c0f-882f-2437b695b452",
        login: "Britani",
        password: "SDFfdgf546",
        age: 52,
        isDeleted: false
      },
      {
        id: "daa891e6-6376-46f8-ab74-c22fcc547a95",
        login: "Britan",
        password: "SDFfdgf546",
        age: 22,
        isDeleted: false
      },
      {
        id: "dd573e4d-45ef-4ff8-beb9-8a2997899ad9",
        login: "Britanic",
        password: "SDFfdgf546",
        age: 15,
        isDeleted: false
      },
      {
        id: "f4f4a21f-5f25-4a9a-873f-e3544196a06d",
        login: "Brit",
        password: "SDFfdgf546",
        age: 12,
        isDeleted: false
      }
    ])
      .then(() => console.log("populated successfully"))
      .catch(e => console.error(e));
  }
});
