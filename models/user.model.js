const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const config = require("../config/config");
const { roles } = require("../config/roles");


const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique:true,
    },
    password: {
      type: String,
      required: true, 
      trim: true,
    },
    roles:  {
      type: [String],
      enum: Object.values(roles),
      required: true,
    },
    passwordResetOtp: {
      type: Number,
      required: false
    },
    age: {
      type: Number,
      required: false
    },
    gender: {
      type: String,
      required: false
    }
  },
  {
    timestamps: true,
  }
);

userSchema.statics.isEmailTaken = async function (email) {
  let queryOutput = await this.find({email});
  if (queryOutput.length != 0) 
    return true
  return false;
};

// preprocessor when save is invoked. Only for password right now.
userSchema.pre("save", function (next) {
  let user = this;
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// Middleware for updating an existing user
userSchema.pre("updateOne", function (next) {
  const update = this.getUpdate();
  
  let newPassword = update['$set'].password
  if (newPassword) {
      bcrypt.genSalt(10, (err, salt) => {
          if (err) return next(err);
          bcrypt.hash(newPassword, salt, (err, hash) => {
              if (err) return next(err);
              update['$set'].password = hash;
              next();
          });
      });
  } else {
      next();
  }
});

userSchema.methods.isPasswordMatch = async function (password) {
  let isSame = await bcrypt.compare(password, this.password);
  return isSame;
};


userSchema.pre('updateOne', function(next) {
  const update = this.getUpdate();
  update['$set'].tags = [...new Set(update['$set'].tags)]
  next();
});


const User = mongoose.model("User", userSchema);
module.exports = {User};