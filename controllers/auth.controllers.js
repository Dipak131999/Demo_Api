const validation = require("../_helper/validation");
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");
const { authService } = require("../services");
const jwt = require("jsonwebtoken");
const authConfig = require("../config/auth.config");

const loginUser = async (req, res) => {
  const payload = {
    email: req.body.email,
    password: req.body.password,
  };

  const resData = await authService.loginUser(payload);

  if (resData.statusCode == httpStatus.OK) {
    const accessToken = await generateToken(resData);

    Object.assign(resData, {
      accessToken: accessToken,
    });

    return res.status(resData.statusCode).json(resData);
  } else {
    return res.status(resData.statusCode).json({
      message: resData.message,
      statusCode: resData.statusCode,
    });
  }
};

const registerUser = async (req, res) => {
  const payload = {
    name: req.body.name,
    email: req.body.email,
    mobileNumber: req.body.mobileNumber,
    password: await bcrypt.hashSync(req.body.password, 10),
    address: req.body.address,
    isActive: true,
  };

  const validationResult = validation.registerUser.validate(payload);

  if (validationResult.error) {
    return res.status(httpStatus.BAD_REQUEST).json({
      message: validationResult.error.message,
      statusCode: httpStatus.BAD_REQUEST,
    });
  }

  const resData = await authService.registerUser(payload);
  return res.status(resData.statusCode).json(resData);
};

const generateToken = async (userData) => {
  return await jwt.sign(
    {
      id: userData.data.id,
      roleKey: "User",
    },
    authConfig.accessTokenSecret,
    {
      algorithm: "HS256",
      expiresIn: authConfig.accessTokenExpire,
    }
  );
};

module.exports = {
  loginUser,
  registerUser,
  generateToken,
};
