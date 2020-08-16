import createError from "http-errors";

import { validateUser, validateQuery } from "./ajvApi";

export const logRequestInConsole = async (req, res, next) => {
  const message = req.method;
  console.log(`${message} method is executed - from self made logger`);
  next();
};

export const createUserError = async (req, res, next) => {
  if (!req.body)
    return next(
      createError(
        400,
        "Bad request. Please make sure you specify the user details"
      )
    );
  next();
};

export const createUserAttributesError = async (req, res, next) => {
  const { login, password, age } = req.body;
  if (!login && !password && !age) {
    return next(
      createError(
        400,
        "Bad request. You must specify one of three fields: login, password, age"
      )
    );
  }
  next();
};

export const validateQueryMiddleware = async (req, res, next) => {
  const isQueryValid = validateQuery(req.query);
  if (!isQueryValid) {
    return next(createError(400, validateQuery.errors[0].message));
  }
  next();
};

export const validateUserMiddleware = async (req, res, next) => {
  const isUserValid = validateUser(req.body);
  if (!isUserValid) {
    return next(createError(400, validateUser.errors[0].message));
  }
  next();
};
