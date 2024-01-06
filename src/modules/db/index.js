import mongoose from "mongoose";
import config from "../../config/config";
let db;
const connect = () => {
  mongoose.connect(config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.info("Connected to MongoDB"));
};
connect();
export default db;
