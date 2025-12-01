import dotenv from "dotenv"
dotenv.config({quiet:true});

const GLOBALS = {
    PORT: process.env.PORT,
    KEY: process.env.KEY,
    IV: process.env.IV,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};

export default GLOBALS