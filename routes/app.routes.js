const express = require("express");
const router = express.Router();
const otpController = require("../controllers/otp.controller");

router.post("/otp-login", otpController.otpLogin);
router.post("/otp-verify", otpController.verifyOTP);

module.exports = router;
