export const userSchema = {
  type: "object",
  properties: {
    login: {
      type: "string",
      message: "When supplied, 'organizationId' must be"
    },
    password: {
      type: "string",
      pattern: "^(?:[0-9]+[a-zA-Z]|[a-zA-Z]+[0-9])[a-zA-Z0-9]*$"
    },
    age: {
      type: "integer",
      maximum: 130,
      minimum: 4
    }
  },
  required: ["login", "password", "age"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      login: "Login field must be a string",
      password:
        "Password field must contain at least one number (0-9) AND at least one letter (a-z / A-Z)",
      age: "Age field must be a number between 4 and 130"
    },
    type: "Request body should be an object",
    _: 'Request body must contain "login", "password", "age" fields only.'
  }
};
