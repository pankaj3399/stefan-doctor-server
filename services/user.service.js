const { User } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const { ObjectId } = require('mongodb');


let getUserByEmail = async (email) => {
    let user = await User.findOne({email: email});
    return user;
}

let triggerPasswordReset = async (email, otp) => {
    let user = await User.findOne({email: email});
    let filter = { _id: user._id }
    
    await User.updateOne(filter, { $set: { passwordResetOtp: otp } })
    return user;
}

let resetPassword = async (email, password) => {
    let user = await User.findOne({email: email});
    let filter = { _id: user._id }
    await User.updateOne(filter, { $set: { password: password, passwordResetOtp: null } })
    return user;
}

let createUser = async (user) => {
     if (await User.isEmailTaken(user.email)){
         throw new ApiError(httpStatus.BAD_REQUEST, "Email already taken")
     }
     let newUser = await User.create(user);
    return newUser;
 }

let updateProfile = async (userId, name, gender, age) => {
    let filter = { _id: userId }
    await User.updateOne(filter, { $set: { 
        name: name,
        gender: gender,
        age: age, 
        } 
    })
    return await User.findOne({_id: userId})
}


module.exports = {
    getUserByEmail,
    createUser,
    triggerPasswordReset,
    resetPassword,
    updateProfile
 };