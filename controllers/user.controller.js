const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const { authService } = require("../services");
const UserResponse  = require("../entities/UserResponse");


const updateProfile = catchAsync(async (req, res) => {
  let {name, gender, age } = req.body;

  name = name!=null ? name : req.user.name
  gender = gender!=null ? gender : req.user.gender
  age = age!=null ? age : req.user.age


  let userId =  req.user._id;
  let user = await authService.updateProfile(userId, name, gender, age);
  let response = new UserResponse(user, null)
  res.status(httpStatus.OK).send(response);
})


module.exports = {
  updateProfile
};