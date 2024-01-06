import express from "express";
import cors from "cors";
import routes from "./routes";
import authLimiter from "./modules/utils/rateLimiter";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authLimiter, routes);

export default app;
