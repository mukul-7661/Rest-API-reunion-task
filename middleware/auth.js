const JwtService = require("../services/JwtService");

const auth = async (req, res, next) => {
  let authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json("Error detected");
  } else {
    const token = authHeader.split(" ")[1];

    try {
      const { _id, role } = await JwtService.verify(token);

      const user = {
        _id,
        role,
      };

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json("Error detected");
      // return next(CustomErrorHandler.unAuthorized());
    }
  }
};

module.exports = auth;
