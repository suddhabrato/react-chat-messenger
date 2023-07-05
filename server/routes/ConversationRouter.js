const router = require("express").Router();
const authMiddleware = require("../auth-middleware");
const ConversationController = require("../controllers/ConversationController");

router.get("/", authMiddleware, ConversationController.getConversations);

router.get("/:convId", authMiddleware, ConversationController.getMessages);

router.post(
  "/lookup",
  authMiddleware,
  ConversationController.getConversationByParticpantLookup
);

router.post(
  "/newMessage",
  authMiddleware,
  ConversationController.createMessage
);

router.post(
  "/newGroupConversation",
  authMiddleware,
  ConversationController.createGroupConversation
);

router.patch(
  "/message/:id",
  authMiddleware,
  ConversationController.markMessageAsSeen
);

router.delete(
  "/message/:msgId",
  authMiddleware,
  ConversationController.deleteMessage
);

module.exports = router;
