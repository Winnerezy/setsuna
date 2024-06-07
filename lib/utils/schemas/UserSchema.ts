import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    followers: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    following: {
      type: [mongoose.Types.ObjectId],
      default: [],
    },
    authToken: {
      type: String,
      default: "",
      required: true,
    },
    profilephoto: {
      type: String
    }
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model("User", UserSchema);