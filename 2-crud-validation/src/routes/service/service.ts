import Ajv from "ajv";
import uuid4 from "uuid4";

import { userSchema, autosuggestQuerySchema } from "../../utils/schemas";
import { dbUsers, User } from "../../dbMock";

const ajv = new Ajv();
const validateUser = ajv.compile(userSchema);
const validateQuery = ajv.compile(autosuggestQuerySchema);

type QueryType = {
  loginSubstring: string;
  limit: string;
};

let usersDb: User[] = [...dbUsers];

const getUserById = (id: string): User | undefined =>
  usersDb.find(el => el.id === id);

const getUsersByLoginSubstring = (loginSubstring: string) =>
  usersDb.filter(user =>
    user.login.toLowerCase().includes(loginSubstring.toLowerCase())
  );

export const handleAutosuggest = req => {
  const isQueryValid = validateQuery(req.query);
  if (!isQueryValid) throw new Error(validateQuery.errors[0].message);

  const { loginSubstring, limit } = req.query as QueryType;
  const answerList: User[] = getUsersByLoginSubstring(loginSubstring).slice(
    0,
    parseInt(limit, 10)
  );
  return { answerList, usersDb };
};

export const handleGetById = req => {
  const { id } = req.params;
  const user: User = getUserById(id);
  if (!user) throw new Error("No user found");
  return { user, usersDb };
};

export const handleGetAll = () => usersDb;

export const handleCreateUser = req => {
  const isUserValid = validateUser(req.body);
  if (!isUserValid) throw new Error(validateUser.errors[0].message);
  const user: User = { ...req.body, id: uuid4(), isDeleted: false };
  usersDb = [...usersDb, user];
  return { user, usersDb };
};

export const handlePatchUser = req => {
  const updatedUserParams: Partial<User> = req.body;
  const { id } = req.params;
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

export const handleUpdateUser = req => {
  const updatedUser = req.body;
  const { id } = req.params;
  usersDb = [...usersDb.filter(user => user.id !== id), updatedUser];
  const user: User = getUserById(id);
  if (!user) throw new Error("No user found");
  return { user, usersDb };
};

export const handleDeleteUser = req => {
  const { id } = req.params;
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
