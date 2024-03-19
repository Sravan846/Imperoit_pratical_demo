const userSchema = require("../model/user");
const bcrypt = require("bcrypt");
const json = require("jsonwebtoken");
const sendMail = require("../config/email");

module.exports = {
    userRegister: async (req, res) => {
        const { name, email, password, gender } = req.body;
        try {
            const checkEmailExist = await userSchema.find({ email });
            if (checkEmailExist.length > 0) {
                res.status(409).json({ err: "This email is already exist", isSuccess: false });
            } else {
                const hashPassword = await bcrypt.hash(password, 10);
                await userSchema.create({
                    name,
                    email,
                    gender,
                    password: hashPassword,
                    otp: null,
                    otpExpires: null,
                });
                res
                    .status(200)
                    .json({ message: "your are register successfully, please login", isSuccess: true });
            }
        } catch (error) {
            res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    userLogin: async (req, res) => {
        const { email, password } = req.body;
        try {
            const checkEmailExist = await userSchema.findOne({ email });
            if (checkEmailExist) {
                if (await bcrypt.compare(password, checkEmailExist.password)) {
                    const token = json.sign(
                        { id: checkEmailExist.id },
                        process.env.secrateKey,
                        {
                            expiresIn: "1h",
                        }
                    );
                    res.status(200).json({ message: "login successfully", name: checkEmailExist.name, token, isSuccess: true });
                } else {
                    res.status(401).json({ message: "password is not matched", isSuccess: false });
                }
            } else {
                res.status(400).json({ message: "email is not exist", isSuccess: false });
            }
        } catch (error) {
            res.status(500).json({ message: error.message, isSuccess: false })
        }
    },
    forgotPassowrd: async (req, res) => {
        try {
            const { email } = req.body;
            if (email) {
                const checkEmailExist = await userSchema.findOne({ email });
                if (checkEmailExist) {
                    let otpcode = Math.floor(Math.random() * 100000 + 1);
                    let date = new Date();
                    date.setTime(date.getTime() + 5 * 60 * 1000);
                    await userSchema.findByIdAndUpdate(checkEmailExist.id, {
                        otp: otpcode,
                        otpExpires: date,
                    });
                    sendMail(email, otpcode);
                    res.status(200).json({ message: "email is sended" });
                } else {
                    res.status(400).json({ message: "email is not exist" });
                }
            } else {
                res.status(400).json({ message: "Email is required" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    verifyOtp: async (req, res) => {
        const { otp, password } = req.body;
        try {
            let optexist = await userSchema.findOne({ otp });
            if (optexist) {
                var date = new Date();
                if (optexist.otpExpires > date) {
                    const hashPassword = await bcrypt.hash(password, 10);
                    await userSchema.findByIdAndUpdate(optexist.id, {
                        password: hashPassword,
                    });
                    res.status(200).json({ message: "Password is changed" });
                } else {
                    res.status(400).json({
                        message:
                            "The time is expired , please go to  hit  forgot password api again. ",
                    });
                }
            } else {
                res.status(400).json({ message: "This otp is not matched" });
            }
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};
