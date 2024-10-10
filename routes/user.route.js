const express = require("express");
const validate = require("../middlewares/validate");
const userValidation = require("../validations/user.validation");
const auth = require("../middlewares/auth");
const userController = require("../controllers/user.controller");
const router = express.Router();


const requetsBodyLog = (req, res, next) => {
    console.log('Request Body:', req.body);
    next();
}

router.put("/updateProfile",
    auth,
    requetsBodyLog,
    validate(userValidation.updateProfile),
    userController.updateProfile)


module.exports = router;