const firebase = require("./firebase");
const User = require("./models/UserModel");

async function authMiddleware(req, res, next) {
  try {
    const headerToken = req.headers.authorization;
    if (!headerToken) {
      return res.status(401).send({ message: "No token provided" });
    }

    if (headerToken && headerToken.split(" ")[0] !== "Bearer") {
      res.status(401).send({ message: "Invalid token" });
    }

    const token = headerToken.split(" ")[1];
    const decodedToken = await firebase.auth().verifyIdToken(token);
    const { email } = decodedToken;
    const user = await User.findOne({ email: email });
    if (user) req.user = user;
    else {
      const newUser = new User({
        email: email,
        displayname: decodedToken.name.substring(0, 25),
        avatar: decodedToken.picture,
        username: decodedToken.name
          .replace(/ /g, "")
          .toLowerCase()
          .substring(0, 25),
      });
      await newUser.save();
      req.user = user;
    }
    next();
  } catch (err) {
    console.error("Error verifying token:", err);
    if (err.code === "auth/id-token-expired")
      res.status(401).json({ error: "Token Expired", code: err.code });
    else res.status(403).send({ message: "Could not authorize" });
  }
}

module.exports = authMiddleware;
