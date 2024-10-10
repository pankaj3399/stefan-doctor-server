const Joi = require("joi");


const updateProfile = {
  body: Joi.object().keys({
    name: Joi.string(),
    gender: Joi.string(),
    age: Joi.number(),
  }).unknown(true)
};


module.exports = {
  updateProfile
};
