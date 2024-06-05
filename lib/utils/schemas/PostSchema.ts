import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: [String],
      default: [],
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model('Post', PostSchema)