const otpService = require("../services/otp.service");

exports.otpLogin = (req,res,next) =>{
    otpService.sendOTP(req.body,(error,results) => {
        if(error){
            return res.status(400).send(
                {
                message : "error",
                data : error
               }

            );
        }
        return res.status(200).send(
            {
            message : "Success",
            data : results
           }

        );

    }
);
};

exports.verifyOTP = (req,res,next) =>{
    otpService.verifyOTP(req.body,(error,results) => {
        if(error){
            return res.status(400).send(
                {
                message : "You entered wrong OTP",
                data : error
               }

            );
        }
        return res.status(200).send(
            {
            message : "Success",
            data : results
           }

        );

    }
);
};

