const httpStatus = require("http-status");
const userService = require("./user.service");
const randomstring = require('randomstring');
const ApiError = require("../utils/ApiError");
const nodemailer = require("nodemailer");
const config = require("../config/config");


const SUBJECT = "Password reset otp."
const SENDER_EMAIL = config.sender.email
const SENDER_PASSKEY = config.sender.passkey

const auth = nodemailer.createTransport({
  service: "gmail",
  secure : true,
  port : 465,
  auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSKEY
  }
});


const loginUserWithEmailAndPassword = async (email, password) => {
  let userObject = await userService.getUserByEmail(email);   
  if (userObject == null)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect `email` or `password`')
  if (await userObject.isPasswordMatch(password))
    return userObject;
  else 
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect `email` or `password`')
};

const updateProfile = async (userId, name, gender, age) => {
  let userObject = await userService.updateProfile(userId, name, gender, age)
    return userObject
}

const triggerPasswordReset = async (email) => {
  let userObject = await userService.getUserByEmail(email);
  if (userObject == null)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  otp = generateOtp();
  return sendEmail(email, otp)
          .then(_ => {
            userService.triggerPasswordReset(email, otp)
            return
          })
          .catch( err => { 
            throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Server error')
          })
}


const sendEmail = async (email, otp) => {
  const text = `Do not share your OTP with anyone. Your password reset OTP is:\n${otp}`;
  const receiver = emailReceiver(SENDER_EMAIL, email, SUBJECT, text);

  return new Promise((resolve, reject) => {
      auth.sendMail(receiver, (error, emailResponse) => {
          if (error) {
              console.error('Error sending email:', error);
              return reject(error);
          }
          resolve(emailResponse);
      });
  });
};

const emailReceiver = (from, to, subject, text) => {
    return {
      from : from,
      to : to,
      subject : subject,
      text : text
    }
}

const generateOtp = () => {
  return randomstring.generate({
    length: 6,
    charset: 'numeric'
  })
}



const passwordReset = async (email, password, passedOpt) => {
  let userObject = await userService.getUserByEmail(email);
  if (userObject == null)
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not found');
  if (userObject.passwordResetOtp != passedOpt) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid otp passed')
  }
  await userService.resetPassword(email, password);

  return {
    "email": userObject.email, 
    "message": "Password updated successfully."
  }
}

module.exports = {
  loginUserWithEmailAndPassword,
  triggerPasswordReset,
  passwordReset,
  updateProfile
};