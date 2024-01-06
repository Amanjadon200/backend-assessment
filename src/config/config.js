import "dotenv/config";
const config = {
  port: process.env.PORT,
  mongoUri: process.env.mongoUri,
  jwt:{
    jwtSecret: process.env.jwtSecret,
    accessExpirationMinutes:process.env.accessExpirationMinutes,
  }
};
export default config;
