import mongoose from "mongoose";
import { Schema } from "mongoose";
const notesSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    sharedUsers: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

notesSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.sharedUsers;
  return obj;
};
notesSchema.index({ userId: 1 });
notesSchema.index({ description: "text" });
const Note = mongoose.model("Notes", notesSchema);
export default Note;
