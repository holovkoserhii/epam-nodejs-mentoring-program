import Ajv from "ajv";
import {
  userSchema,
  autosuggestQuerySchema,
  groupSchema,
  userGroupSchema
} from "./schemas";

const ajv = new Ajv();
export const validateUser = ajv.compile(userSchema);
export const validateGroup = ajv.compile(groupSchema);
export const validateQuery = ajv.compile(autosuggestQuerySchema);
export const validateUserGroup = ajv.compile(userGroupSchema);
