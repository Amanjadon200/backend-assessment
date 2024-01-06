import config from "../../config/config";
import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers["in-auth-token"];
    if (!token) {
      throw new Error("Token is required");
    }
    jwt.verify(token, config.jwt.jwtSecret);
    next();
  } catch (error) {
    console.error("Error authenticating user:", error);
    return res.status(401).json({
      message: error.message,
      statusCode: "401",
    });
  }
};
