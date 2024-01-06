import config from "./config/config";
import app from "./app";
import db from "./modules/db/index.js";

app.listen(3000, () => {
  console.log("Listening on port at", config.port);
});
