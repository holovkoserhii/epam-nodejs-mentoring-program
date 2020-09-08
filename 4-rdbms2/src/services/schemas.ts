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

export const autosuggestQuerySchema = {
  properties: {
    loginSubstring: {
      type: "string"
    },
    limit: {
      type: "string",
      pattern: "^[1-9][0-9]*$"
    }
  },
  required: ["loginSubstring", "limit"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      limit: "Limit must consist of digits only"
    },
    _: 'Query string must contain "loginSubstring", "limit" only.'
  }
};

export const groupSchema = {
  type: "object",
  properties: {
    name: {
      type: "string"
    },
    permissions: {
      type: "array",
      items: {
        type: "string",
        enum: ["READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"]
      }
    }
  },
  required: ["name", "permissions"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      name: "Name field must be a string",
      permissions:
        'Permission field must be the array of strings, one of the following: "READ", "WRITE", "DELETE", "SHARE", "UPLOAD_FILES"'
    },
    type: "Request body should be an object",
    _: 'Request body must contain "name", "permissions" fields only.'
  }
};

export const userGroupSchema = {
  type: "object",
  properties: {
    groupId: {
      type: "string"
    },
    userIds: {
      type: "array",
      items: {
        type: "string"
      }
    }
  },
  required: ["groupId", "userIds"],
  additionalProperties: false,
  errorMessage: {
    properties: {
      groupId: "Please specify the group id",
      userIds:
        "Please specify the array of user ids you want to associate with the group"
    },
    type: "Request body should be an object",
    _: 'Request body must contain "groupId", "userIds" fields only.'
  }
};
