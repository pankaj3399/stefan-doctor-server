const express = require("express");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const router = express.Router();


const requetsBodyLog = (req, res, next) => {
    console.log('Request Body:', req.body);
    next();
}

router.post("/register", 
    requetsBodyLog,
    validate(authValidation.register),
    authController.register);

router.post("/login",  
    requetsBodyLog, 
    validate(authValidation.login),
        authController.login)

router.post("/triggerPasswordReset",
    requetsBodyLog,
    validate(authValidation.triggerPasswordReset),
    authController.triggerPasswordReset)

router.post("/resetPassword",
    requetsBodyLog,
    validate(authValidation.passwordReset),
    authController.passwordReset)

router.get("/isLoggedIn",
    requetsBodyLog,
    auth,
    authController.authenticatedUser)


module.exports = router;