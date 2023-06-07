const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    displayname: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 25,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    avatar: {
      type: String,
      default:
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png",
    },
    conversations: [{ type: mongoose.Types.ObjectId, ref: "Conversation" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
