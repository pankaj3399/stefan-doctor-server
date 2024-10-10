const jwt = require("jsonwebtoken");
const config = require("../config/config");


const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  let payload = {userId: userId, 
                 exp: expires,
                 roles: type};
  var userToken =  jwt.sign(payload, secret);
  return userToken;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires =
    Math.floor(Date.now() / 1000) + config.jwt.accessExpirationMinutes * 60;

  const accessToken = generateToken(
    user._id,
    accessTokenExpires,
    user.roles
  );

  return {
    access: {
      token: accessToken,
      expires: new Date(accessTokenExpires * 1000),
    },
  };
};


module.exports = {
  generateToken,
  generateAuthTokens,
};