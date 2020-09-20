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
