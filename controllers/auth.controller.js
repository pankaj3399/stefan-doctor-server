const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const AuthResponse = require("../entities/AuthResponse");
const { authService, userService, tokenService } = require("../services");


/**
 * register user
 */
const register = catchAsync(async (req, res) => {
  let user = await userService.createUser(req.body);
  let tokens = await tokenService.generateAuthTokens(user);
  let response = new AuthResponse(user, tokens)
  res.status(httpStatus.CREATED).send(response);
});


/**
 * login user
 */
const login = catchAsync(async (req, res) => {
  let {email, password} = req.body;
  let user = await authService.loginUserWithEmailAndPassword(email, password);
  let tokens = await tokenService.generateAuthTokens(user);
  let response = new AuthResponse(user, tokens)
  res.status(httpStatus.OK).send(response);
});

/**
 * trigger password reset
 * generate otp, send email and update in db
 */
const triggerPasswordReset = catchAsync(async (req, res) => {
  let {email} = req.body;
  let response = await authService.triggerPasswordReset(email);
  res.status(httpStatus.NO_CONTENT).send(response);
})

/**
 * validate password reset otp and reset password
 */
const passwordReset = catchAsync(async (req, res) => {
  let {email, password, otp} = req.body;
  let response = await authService.passwordReset(email, password, otp);
  res.status(httpStatus.OK).send(response)
})

/**
 * return user object for logged in user
 */
const authenticatedUser = catchAsync(async (req, res) =>  {
  res.status(httpStatus.OK).send(req.user)
})


module.exports = {
  register,
  login,
  triggerPasswordReset,
  passwordReset,
  authenticatedUser
};