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
