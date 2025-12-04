import dotenv from "dotenv"
dotenv.config({quiet:true});

const GLOBALS = {
    PORT: process.env.PORT,
    KEY: process.env.KEY,
    IV: process.env.IV,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
    CLOUDINARY_CLOUD_NAME:process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET,
};

export default GLOBALS