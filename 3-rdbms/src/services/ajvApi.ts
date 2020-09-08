import Ajv from "ajv";
import { userSchema, autosuggestQuerySchema } from "./schemas";

const ajv = new Ajv();
export const validateUser = ajv.compile(userSchema);
export const validateQuery = ajv.compile(autosuggestQuerySchema);
