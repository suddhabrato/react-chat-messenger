const Conversation = require("../models/ConversationModel");
const User = require("../models/UserModel");
const Message = require("../models/MessageModel");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const ConversationController = {
  getConversations: async (req, res) => {
    try {
      const conversations = await Conversation.find({
        _id: { $in: req.user.conversations },
      })
        .populate("participants")
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 } },
          populate: { path: "author", select: "displayname" },
          perDocumentLimit: 1,
        })
        .sort("-updatedAt");

      let newConversations = [];
      for (let conversation of conversations) {
        const convo = await Conversation.findById(conversation._id).populate(
          "messages"
        );
        let unseenMessageCount = 0;

        for (const message of convo.messages) {
          const seenByUser = message.seen.some(
            (viewer) => viewer.viewer.toString() === req.user._id.toString()
          );

          if (
            !seenByUser &&
            message.author._id.toString() !== req.user._id.toString()
          )
            unseenMessageCount++;
        }
        newConversations.push({
          ...conversation.toObject(),
          unseenMessageCount: unseenMessageCount,
        });
      }

      res.json({ conversations: newConversations });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getConversationByParticpantLookup: async (req, res) => {
    try {
      const { recipients } = req.body;

      const searchParticipants = recipients.map(
        (id) => new mongoose.Types.ObjectId(id)
      );

      if (!recipients.includes(req.user._id.toString()))
        recipients.push(req.user._id);

      const lookedUpConversation = await Conversation.findOne({
        $and: [
          { _id: { $in: req.user.conversations } },
          { type: "Individual" },
          {
            $expr: {
              $eq: [
                { $setEquals: ["$participants", searchParticipants] },
                true,
              ],
            },
          },
        ],
      })
        .populate("participants")
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 } },
          populate: { path: "author", select: "displayname" },
          perDocumentLimit: 1,
        });

      res.json(lookedUpConversation);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getMessages: async (req, res) => {
    try {
      const { convId } = req.params;
      const messages = await Conversation.findOne({
        $and: [{ _id: convId }, { _id: { $in: req.user.conversations } }],
      })
        .select("messages")
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "author seen.viewer",
            select: "displayname avatar",
          },
        });

      res.json(messages);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createMessage: async (req, res) => {
    try {
      const { recipients, convId, text, media, type } = req.body;

      if (!text.trim() && media.length === 0)
        return res.status(400).json({ msg: "Cannot Create Blank Message" });

      if (type === "Group") {
        if (!convId)
          return res
            .status(400)
            .json({ msg: "Unable to locate group conversation" });

        const conversation = await Conversation.findOne({
          $and: [{ _id: convId }, { _id: { $in: req.user.conversations } }],
        });

        if (!conversation)
          return res
            .status(400)
            .json({ msg: "Group Conversation does not exist" });

        const message = new Message({
          author: req.user._id,
          recipients: conversation.participants,
          seen: [{ viewer: req.user._id, viewedAt: new Date() }],
          text,
          media,
        });

        const savedMessage = await message.save();

        await Conversation.findByIdAndUpdate(conversation._id, {
          $push: { messages: savedMessage._id },
        });

        await savedMessage.populate({
          path: "author",
          select: "displayname avatar",
        });

        await savedMessage.populate({
          path: "seen.viewer",
          select: "displayname",
        });

        const newConversation = await Conversation.findById(conversation._id)
          .populate("participants")
          .populate({
            path: "messages",
            options: { sort: { createdAt: -1 } },
            populate: { path: "author", select: "displayname" },
            perDocumentLimit: 1,
          });

        res.status(201).json({
          savedMessage,
          conversation: newConversation,
        });
      } else if (type === "Individual") {
        if (
          !recipients ||
          (recipients.length === 1 &&
            recipients[0] === req.user._id.toString()) ||
          (recipients.length === 2 &&
            recipients[0] !== req.user._id.toString() &&
            recipients[1] !== req.user._id.toString()) ||
          recipients.length > 2
        )
          return res.status(400).json({ msg: "Invalid message participants" });

        if (!recipients.includes(req.user._id.toString()))
          recipients.push(req.user._id);

        let conversation = null;

        if (!convId) {
          const searchParticipants = recipients.map(
            (id) => new mongoose.Types.ObjectId(id)
          );
          const lookedUpConversation = await Conversation.findOne({
            $and: [
              { _id: { $in: req.user.conversations } },
              { type: "Individual" },
              {
                $expr: {
                  $eq: [
                    { $setEquals: ["$participants", searchParticipants] },
                    true,
                  ],
                },
              },
            ],
          });

          console.log("looked", lookedUpConversation);

          if (lookedUpConversation) conversation = lookedUpConversation;
          else {
            const newConversation = new Conversation({
              participants: recipients,
              type: "Individual",
              messages: [],
            });

            conversation = await newConversation.save();

            await User.updateMany(
              { _id: { $in: recipients } },
              { $push: { conversations: conversation._id } }
            );
          }
        } else {
          conversation = await Conversation.findById(convId);
        }

        const message = new Message({
          author: req.user._id,
          recipients: conversation.participants,
          seen: [{ viewer: req.user._id, viewedAt: new Date() }],
          text,
          media,
        });

        const savedMessage = await message.save();

        await Conversation.findByIdAndUpdate(conversation._id, {
          $push: { messages: savedMessage._id },
        });

        await savedMessage.populate({
          path: "author",
          select: "displayname avatar",
        });

        await savedMessage.populate({
          path: "seen.viewer",
          select: "displayname",
        });

        const newConversation = await Conversation.findById(conversation._id)
          .populate("participants")
          .populate({
            path: "messages",
            options: { sort: { createdAt: -1 } },
            populate: { path: "author", select: "displayname" },
            perDocumentLimit: 1,
          });

        res.status(201).json({
          savedMessage,
          conversation: newConversation,
        });
      } else {
        return res.status(400).json({ msg: "Unknown Conversation Type" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  createGroupConversation: async (req, res) => {
    try {
      const { participants, title, avatar } = req.body;
      if (!title || title.trim().length === 0)
        return res.status(400).json({ msg: "Group Name cannot be blank" });

      if (
        !participants ||
        (participants.length === 1 &&
          participants[0] === req.user._id.toString())
      )
        return res.status(400).json({ msg: "Invalid Group Participants" });

      if (!participants.includes(req.user._id.toString()))
        participants.push(req.user._id);

      const newGroupConversation = new Conversation({
        participants,
        title,
        avatar,
        type: "Group",
        messages: [],
      });

      const returnedGroupConvo = await newGroupConversation.save();

      await User.updateMany(
        { _id: { $in: participants } },
        { $push: { conversations: returnedGroupConvo._id } }
      );

      const newConversation = await Conversation.findById(
        returnedGroupConvo._id
      )
        .populate("participants")
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 } },
          populate: { path: "author", select: "displayname" },
          perDocumentLimit: 1,
        });

      res.status(201).json({ returnedGroupConvo: newConversation });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteMessage: async (req, res) => {
    try {
      const { msgId } = req.params;
      const { conversation } = req.query;

      const message = await Message.findById(msgId);
      if (!message)
        return res.status(400).json({ msg: "Message could not be found" });

      if (message.author._id.toString() !== req.user._id.toString())
        return res.status(401).json({
          msg: "You do not have authorization to delete this message",
        });

      if (message.media && message.media.length > 0) {
        await Promise.all(
          message.media.map(async (media) => {
            await cloudinary.uploader.destroy(media.publicId);
          })
        );
      }

      await Message.deleteOne({ _id: msgId });

      await Conversation.findByIdAndUpdate(
        conversation,
        {
          $pull: { messages: msgId },
        },
        { timestamps: false }
      );

      const newConversation = await Conversation.findById(conversation)
        .populate("participants")
        .populate({
          path: "messages",
          options: { sort: { createdAt: -1 } },
          populate: { path: "author", select: "displayname" },
          perDocumentLimit: 1,
        });

      res.status(200).json({
        msg: "Message deleted successfully",
        conversation: newConversation,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  },

  markMessageAsSeen: async (req, res) => {
    const messageId = req.params.id;
    const userId = req.user._id;

    try {
      const message = await Message.findById(messageId);

      if (!message) {
        return res.status(404).json({ error: "Message not found" });
      }
      if (
        message.seen.find(
          (user) => user.viewer.toString() === userId.toString()
        )
      ) {
        return res
          .status(400)
          .json({ error: "Message already marked as seen" });
      }

      message.seen.push({ viewer: userId, viewedAt: new Date() });
      await message.save();

      await message.populate({
        path: "author",
        select: "displayname avatar",
      });

      await message.populate({
        path: "seen.viewer",
        select: "displayname",
      });

      return res.status(200).json({ message });
    } catch (error) {
      console.error("Error marking message as seen:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  },
};

module.exports = ConversationController;
