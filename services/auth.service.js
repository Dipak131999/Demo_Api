const db = require("../models/index");
const tblUsers = db.Users;
const httpStatus = require("http-status");
const bcrypt = require("bcrypt");

const loginUser = async (payload) => {
  try {
    const userDetails = await tblUsers.findOne({ email: payload.email });

    const isPasswordValid = await bcrypt.compare(
      payload.password,
      userDetails.password
    );

    var resData = {};

    if (!userDetails || !isPasswordValid) {
      resData = {
        statusCode: httpStatus.UNAUTHORIZED,
        message: "Invalid email or password",
      };
      return resData;
    }

    resData = {
      statusCode: httpStatus.OK,
      message: "Login Successfully",
      data: userDetails,
    };

    return resData;
  } catch (error) {
    const errorRes = {};

    errorRes.message = error;
    errorRes.statusCode = httpStatus.BAD_REQUEST;

    return errorRes;
  }
};

const registerUser = async (payload) => {
  try {
    const res = await tblUsers.create(payload);
    const successRes = {};

    if (res != null) {
      successRes.message = "Success";
      successRes.statusCode = httpStatus.OK;
      successRes.data = res;
      return successRes;
    } else {
      errorRes.message = "Something Went Wrong";
      errorRes.statusCode = httpStatus.BAD_REQUEST;
      errorRes.data = {};
      return errorRes;
    }
  } catch (error) {
    const errorRes = {};

    errorRes.message = error.errors[0].message;
    errorRes.statusCode = httpStatus.BAD_REQUEST;

    return errorRes;
  }
};

module.exports = {
  loginUser,
  registerUser,
};
