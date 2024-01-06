import * as notesService from "./notes.service.js";

export const shareNote = async (req, res) => {
  try {
    const id = req.params.id;
    const { email } = req.body;
    const data = await notesService.shareNoteById(id, email);
    res.send(data);
  } catch (error) {
    console.error("Error sharing note:", error);
    res.status(400).send(error);
  }
};
export const createNote = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.params.userId;
    const data = await notesService.createNote(title, description, userId);
    res.send(data);
  } catch (error) {
    console.error("Error creating note:", error);
    res.status(400).send(error);
  }
};
export const getNotes = async (req, res) => {
  try {
    const userId = req.params.userId;
    const data = await notesService.getNotesByUserId(userId);
    return res.send(data);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    res.status(400).send(error);
  }
};
export const getNote = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.userId;
    const data = await notesService.getNoteById(id, userId);
    res.send(data);
  } catch (error) {
    console.error("Error retrieving note:", error);
    res.status(400).send(error);
  }
};
export const updateNote = async (req, res) => {
  try {
    const id = req.params.id;
    const payload = req.body;
    const userId = req.body.userId;
    const data = await notesService.updateNoteById(id, payload, userId);
    return res.send(data);
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(400).send(error);
  }
};
export const deleteNote = async (req, res) => {
  try {
    const id = req.params.id;
    const userId = req.body.userId;
    const data = await notesService.deleteNoteById(id, userId);
    return res.send(data);
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(400).send(error);
  }
};

export const getNotesByTag = async (req, res) => {
  try {
    const userId = req.body.userId;
    const tag = req.query.tag;
    const data = await notesService.getNotesByTag(userId, tag);
    return res.send(data);
  } catch (error) {
    console.error("Error searching text:", error);
    res.status(400).send(error);
  }
};
