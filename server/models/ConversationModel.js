const mongoose = require("mongoose");
const { Schema } = mongoose;

const conversationSchema = new Schema(
  {
    participants: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    title: String,
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    type: {
      type: String,
      enum: {
        values: ["Group", "Individual"],
        message: "Not a valid conversation",
      },
      required: true,
    },
    messages: [{ type: mongoose.Types.ObjectId, ref: "Message" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Conversation", conversationSchema);
