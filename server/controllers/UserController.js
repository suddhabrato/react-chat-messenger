const User = require("../models/UserModel");

const UserController = {
  searchUser: async (req, res) => {
    try {
      const users = await User.find({
        username: { $regex: req.query.username },
      })
        .limit(10)
        .select("displayname username avatar");

      res.json({ users });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).select("-conversations");
      if (!user) {
        return res.status(400).json({ msg: "requested user does not exist." });
      }
      res.json({ user });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { userUpdates } = req.body;
      const updatedUser = await User.findOneAndUpdate(
        { _id: req.user._id },
        userUpdates,
        { returnDocument: "after" }
      );
      res.json({ updatedUser, msg: "User profile updated successfully." });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = UserController;
