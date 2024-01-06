import { generateAuthTokens } from "../token/token.js";
import bcrypt from "bcrypt";
import User from "./models/user.js";
import { badResponse, successResponse } from "../../../utils/response/index.js";

const signUp = async (userData) => {
  try {
    const user = await User.findOne({ email: userData.email });
    if (user) {
      return badResponse("User already exists", user);
    }
    const result = await User.create(userData);
    console.log("User signed up successfully:", result.insertedId);
    return successResponse("User signed up successfully", { _id: result._id });
  } catch (error) {
    console.error("Error signing up user:", error);
    return internalServer(error.message);
  }
};

const login = async (email, password) => {
  try {
    // Find the user by email in the "users" collection
    const user = await User.findOne({ email });

    if (!user) {
      return badResponse("User not found", user);
    }
    // Check if the password is correct
    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return badResponse("Invalid credentials");
    }
    // Generate a token with user data
    const token = await generateAuthTokens(user);
    return successResponse("User logged in successfully", { user, token });
  } catch (error) {
    console.error("Error logging in:", error);
    return internalServer(error.message);
  }
};

export { signUp, login };
