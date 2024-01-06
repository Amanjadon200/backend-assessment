import rateLimit from "express-rate-limit";
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minute
  max: 20, // limit each IP to 20 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});
export default authLimiter;
