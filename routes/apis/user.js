const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user.controller');
const valid = require("../../middleware/validator");

router.post('/register', valid.registerSchema, userController.userRegister);
router.post('/login', valid.loginSchema, userController.userLogin);
router.post("/forgotPassowrd", userController.forgotPassowrd);
router.post("/verifyOtp", valid.otpValidator, userController.verifyOtp);

module.exports = router;
