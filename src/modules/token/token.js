import jwt from "jsonwebtoken";
import moment from "moment";
import config from "../../config/config";

export const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(
    config.jwt.accessExpirationMinutes,
    "minutes"
  );
  const accessToken = generateToken(user.id, accessTokenExpires, "access");

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
  };
};
const generateToken = (userId, expires, type) => {
  const payload = {
    sub: userId,
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, config.jwt.jwtSecret);
};
