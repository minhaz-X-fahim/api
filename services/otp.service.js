const otpGenerator = require("otp-generator");
const crypto = require("crypto");

const key = "test1234"; // Secret key for hashing
const emailServices = require("../services/emailer.service");
const { error } = require("console");

async function sendOTP(params, callback) {
    
        // Generate a 6-digit OTP
        const otp = otpGenerator.generate(6, {
            digits: true,
            alphabets: false,
            upperCase: false,
            upperCaseAlphabets : false,
            specialChars: false,
            lowerCaseAlphabets : false
        });

        const ttl = 5 * 60 * 1000; // 5 minutes in milliseconds
        const expires = Date.now() + ttl; // Set expiry time
        const data = `${params.email}.${otp}.${expires}`; // Combine email, OTP, and expiry time

        // Create a hash for the OTP
        const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
        const fullHash = `${hash}.${expires}`; // Include expiry time in the hash

        // Send the OTP via email
        var model = {
            email: params.email,
            subject: "Verification code",
            body: `Dear Customer, Your OTP is ${otp}. It is valid for 5 minutes.\n\nDadah, don't share your otp with Teddy.`,
        };
        

        emailServices.sendEmail(model , (error,result) => {
            if(error){
                return callback(error);
            }
            return callback(null,fullHash);
        }
    );
}


async function verifyOTP(params,callback){
    let [hashValue,expires] = params.hash.split('.');
    let now = Date.now();

    if(now > parseInt(expires)){
        return callback ("OTP Expired");
    }

    let data = `${params.email}.${params.otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");
    if(newCalculatedHash === hashValue){
        return callback(null, "Success");

    }

    return callback("Invalid OTP");


}

module.exports = {
    sendOTP,
    verifyOTP
}