const router = require("express").Router();
const authMiddleware = require("../auth-middleware");
const UserController = require("../controllers/UserController");

router.get("/search", authMiddleware, UserController.searchUser);

router.get("/:id", authMiddleware, UserController.getUser);

router.patch("/update", authMiddleware, UserController.updateUser);

module.exports = router;
