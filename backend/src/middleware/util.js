import jwt from "jsonwebtoken"
import GLOBALS from "../config/constants.js";

const generateToken = (data) => {
    return jwt.sign(
        {
            id: data.id,
            email: data.email,
        },
        GLOBALS.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

export default {
    generateToken,
}