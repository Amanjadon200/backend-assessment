import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it's modified or a new user
    if (!this.isModified("password")) {
      return next();
    }

    // Generate a salt and hash the password using bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);

    // Replace the plain text password with the hashed one
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});
userSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};
userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model("User", userSchema);

export default User;
