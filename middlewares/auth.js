const jwt = require('jsonwebtoken');
const { User } = require("../models");
const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");


const auth = catchAsync(async (req, res, next) => {
  try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(' ')[1];
      const decoded = jwt.verify(token, config.jwt.secret);
      req.user = decoded;
      const user = await User.findById(req.user.userId);
      req.user = user
      let rolesCheck = (new Set(user.roles)).intersection(new Set(req.user.roles));
      if (!user || rolesCheck.size==0) 
          throw new ApiError(httpStatus.UNAUTHORIZED, "Please Authenticate")
  } catch (error) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Please Authenticate")
  }
  return next()
});


module.exports = auth;