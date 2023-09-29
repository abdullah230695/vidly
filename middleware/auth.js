const jwt = require("jsonwebtoken");

const auth = function (req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).send("Invalid authentication, No token provided");

  try {
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token provided");
  }
};

module.exports = auth;
