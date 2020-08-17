import uuid4 from "uuid4";

import { dbUsers, User } from "../../dbMock";
import { validateUser, validateQuery } from "../../utils/ajvApi";

let usersDb: User[] = [...dbUsers];

const getUserById = (id: string): User | undefined =>
  usersDb.find(el => el.id === id);

const getUsersByLoginSubstring = (loginSubstring: string) =>
  usersDb.filter(user =>
    user.login.toLowerCase().includes(loginSubstring.toLowerCase())
  );

export const handleAutosuggest = (loginSubstring: string, limit: string) => {
  const answerList: User[] = getUsersByLoginSubstring(loginSubstring).slice(
    0,
    parseInt(limit, 10)
  );
  return { answerList, usersDb };
};

export const handleGetById = (id: string) => {
  const user: User = getUserById(id);
  if (!user) throw new Error("No user found");
  return { user, usersDb };
};

export const handleGetAll = () => usersDb;

export const handleCreateUser = (userDTO: Partial<User>) => {
  const user: User = { ...userDTO, id: uuid4(), isDeleted: false } as User;
  usersDb = [...usersDb, user];
  return { user, usersDb };
};

export const handlePatchUser = (updatedUserParams: Partial<User>) => {
  const { id } = updatedUserParams;
  usersDb = usersDb.map(user => {
    if (user.id === id) {
      return { ...user, ...updatedUserParams };
    }
    return user;
  });
  const user: User = getUserById(id);
  if (!user) throw new Error("No user found");
  return { user, usersDb };
};

export const handleUpdateUser = (updatedUserDTO: User) => {
  const { id } = updatedUserDTO;
  usersDb = [...usersDb.filter(user => user.id !== id), updatedUserDTO];
  const user: User = getUserById(id);
  if (!user) throw new Error("No user found");
  return { user, usersDb };
};

export const handleDeleteUser = (id: string) => {
  usersDb = usersDb.map(user => {
    if (user.id === id) {
      return { ...user, isDeleted: true };
    }
    return user;
  });
  const user: User = getUserById(id);
  if (!user) throw new Error("No user found");
  return { user, usersDb };
};
