const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema(
  {
    author: { type: mongoose.Types.ObjectId, ref: "User" },
    recipients: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    seen: [
      {
        viewer: { type: mongoose.Types.ObjectId, ref: "User" },
        viewedAt: Date,
      },
    ],
    text: String,
    media: Array,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
