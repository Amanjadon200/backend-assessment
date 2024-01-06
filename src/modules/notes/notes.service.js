import {
  badResponse,
  internalServer,
  successResponse,
} from "../../../utils/response";
import User from "../user/models/user";
import Note from "./models";
import mongoose from "mongoose";

// create a post api with endpoint /notes:id/share share a note with another user for the authenticated user
export const shareNoteById = async (id, email) => {
  try {
    const note = await Note.findOne({ _id: id });
    if (!note) {
      return badResponse("Note not found", note);
    }
    const user = await User.findOne({ email });
    if (!user) {
      return badResponse("User not found", user);
    }
    const isObjectIdInArray = note.sharedUsers.some((objId) =>
      objId.equals(user._id)
    );
    if (isObjectIdInArray) {
      return badResponse("Note already shared with this user");
    }
    await Note.updateOne({ _id: id }, { $push: { sharedUsers: user._id } });
    return successResponse("Note shared successfully");
  } catch (error) {
    console.error("Error sharing note:", error);
    return internalServer(error.message);
  }
};
export const createNote = async (title, description, userId) => {
  try {
    const user_id = new mongoose.Types.ObjectId(userId);
    const note = await Note.create({
      title,
      description,
      userId: user_id,
    });
    console.log("Note created successfully:", note);
    return successResponse("Note created successfully", note);
  } catch (error) {
    console.error("Error creating note:", error);
    return internalServer(error.message);
  }
};
export const getNotesByUserId = async (userId) => {
  try {
    const user_id = new mongoose.Types.ObjectId(userId);
    const user = await User.findOne({ _id: user_id });
    if (!user) {
      return badResponse("User not found", user);
    }
    const notes = await Note.find({ userId: user_id });
    console.log("Notes retrieved successfully:", notes);
    return successResponse("Notes retrieved successfully", notes);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    return internalServer(error.message);
  }
};
export const getNoteById = async (id, userId) => {
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return badResponse("User not found", user);
    }
    const note_id = new mongoose.Types.ObjectId(id);
    const note = await Note.findOne({ _id: note_id, userId });
    if (!note) {
      return badResponse("Note not found", note);
    }
    console.log("Note retrieved successfully:", note);
    return successResponse("Note retrieved successfully", note);
  } catch (error) {
    console.error("Error retrieving note:", error);
    return internalServer(error.message, 500);
  }
};
export const updateNoteById = async (id, payload, userId) => {
  try {
    const note_id = new mongoose.Types.ObjectId(id);
    const note = await Note.findOneAndUpdate(
      { _id: note_id, userId },
      { ...payload },
      { new: true }
    );
    if (!note) {
      return badResponse("Note not updated", note);
    }
    console.log("Note updated successfully:", note);
    return successResponse("Note updated successfully", note);
  } catch (error) {
    console.error("Error updating note:", error);
    return internalServer(error.message);
  }
};

export const deleteNoteById = async (id, userId) => {
  try {
    const note_id = new mongoose.Types.ObjectId(id);
    const note = await Note.findOneAndDelete({ _id: note_id, userId });
    if (!note) {
      return badResponse("Note not deleted", note);
    }
    console.log("Note deleted successfully:", note);
    return successResponse("Note deleted successfully", note);
  } catch (error) {
    console.error("Error deleting note:", error);
    return internalServer(error.message);
  }
};

export const getNotesByTag = async (userId, tag) => {
  try {
    const user_id = new mongoose.Types.ObjectId(userId);
    const notes = await Note.find({
      userId: user_id,
      $text: { $search: tag },
    });
    console.log("Notes retrieved successfully:", notes);
    return successResponse("Notes retrieved successfully", notes);
  } catch (error) {
    console.error("Error retrieving notes:", error);
    return internalServer(error.message);
  }
};
