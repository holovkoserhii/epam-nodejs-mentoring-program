import Ajv from "ajv";
import { autosuggestQuerySchema } from "../schemas/autosuggestQuerySchema";
import { groupSchema } from "../schemas/groupSchema";
import { userGroupSchema } from "../schemas/userGroupSchema";
import { userSchema } from "../schemas/userSchema";

const ajv = new Ajv();
export const validateUser = ajv.compile(userSchema);
export const validateGroup = ajv.compile(groupSchema);
export const validateQuery = ajv.compile(autosuggestQuerySchema);
export const validateUserGroup = ajv.compile(userGroupSchema);
