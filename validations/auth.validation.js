const Joi = require("joi");
const { password } = require("./custom.validation");
const { roles } = require("../config/roles");


const register = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password),
      name: Joi.string().required(),
      roles: Joi.array()
      .items(Joi.string().valid(
          roles.ADMIN,
          roles.GUEST,
          roles.DOCTOR,
          roles.PATIENT,
      ))
      .required()
}).unknown(true),
};

const login = {
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().custom(password)
}).unknown(true),
};

const triggerPasswordReset = {
  body: Joi.object().keys({
    email: Joi.string().required().email()
}).unknown(true),
};

const passwordReset = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    otp: Joi.number().required()
  }).unknown(true)
};


module.exports = {
  register,
  login,
  triggerPasswordReset,
  passwordReset
};