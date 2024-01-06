export const successResponse = (message, data) => {
  return {
    message,
    statusCode: "200",
    data,
  };
};
export const badResponse = (message, data) => {
  return {
    message,
    statusCode: "400",
    data,
  };
};
export const internalServer = (message, data) => {
  return {
    message,
    statusCode: "500",
    data,
  };
};
