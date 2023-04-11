const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");
const httpStatus = require("http-status");


const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, authConfig.accessTokenSecret, async (err, user) => {
      if (err) {
        const errorRes = {};
        errorRes.message = "Token Expire";
        errorRes.statusCode = httpStatus.FORBIDDEN;
        delete errorRes.data;
        return res.status(httpStatus.FORBIDDEN).json(errorRes);
      }

      req.user = user;
      next();
    });
  } else {
    const errorRes = {};
    errorRes.message = "Uunauthorized";
    errorRes.statusCode = httpStatus.UNAUTHORIZED;
    delete errorRes.data;
    return res.status(httpStatus.UNAUTHORIZED).json(errorRes);
  }
};

module.exports = [authenticateJWT];
