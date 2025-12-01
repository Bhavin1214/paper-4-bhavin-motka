import nodemailer from 'nodemailer';
import jwt from "jsonwebtoken"
import GLOBALS from "../config/constants.js";

const generateToken = (data) => {
    return jwt.sign(
        {
            id: data._id,
            email: data.email,
        },
        GLOBALS.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

const generateOTP = (length = 6) => {
    const OTP = Math.floor(10 ** (length - 1) + Math.random() * 9 * 10 ** (length - 1)).toString();
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);
    return { OTP, expiresAt }
}

export default {
    send_email,
    generateOTP,
    generateToken,
}