import express from "express";
import notesRoutes from "../modules/notes/notes.route.js";
import userRoutes from "../modules/user/user.route.js";
const routes = express.Router();
const defaultRoutes = [
  {
    path: "/notes",
    route: notesRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
];
defaultRoutes.forEach((route) => {
  routes.use(route.path, route.route);
});
export default routes;
