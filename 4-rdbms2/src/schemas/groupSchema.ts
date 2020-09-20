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
