import express from "express";
import * as notesController from "./notes.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = express.Router();
router.post("/:id/share", authMiddleware, notesController.shareNote);
router.get("/", authMiddleware, notesController.getNotes);
router.get("/:id", authMiddleware, notesController.getNote);
router.put("/:id", authMiddleware, notesController.updateNote);
router.delete("/:id", authMiddleware, notesController.deleteNote);
router.post("/search", authMiddleware, notesController.getNotesByTag);
router.post("/:userId", authMiddleware, notesController.createNote);

export default router;
