import CryptLib from "cryptlib";
import localizify from "localizify";
import jwt from "jsonwebtoken"
import { ZodError } from "zod";

import english from "../language/en.js";
import GLOBALS from "../config/constants.js";

export const extractHeaderLanguage = (req) => {
    try {
        const language =
            req.headers["accept-language"] && req.headers["accept-language"].trim() !== ""
                ? req.headers["accept-language"]
                : "en";
        return language
    } catch (error) {
        console.log("Error while extracting language:", error);
        return "en";
    }
};


const { default: local } = localizify;
const { t } = localizify;

const dictionaries = { en: english };

export const getMessage = (reqLang, keyword, components = {}) => {
    try {
        const lang = reqLang && dictionaries[reqLang] ? reqLang : "en";
        const dictionary = dictionaries[lang];

        local.add(lang, dictionary).setLocale(lang);
        const returnMessage = t(keyword, components);
        return returnMessage;
    } catch (error) {
        console.log("Error while getting message:", error);
        return keyword;
    }
};

const shakey = CryptLib.getHashSha256(GLOBALS.KEY, 32);

export const encryption = (data) => {
    try {
        const response = CryptLib.encrypt(
            JSON.stringify(data, (_, v) => (typeof v === "bigint" ? parseInt(v) : v)),
            shakey,
            GLOBALS.IV
        );
        return response.toString();
    } catch (error) {
        console.log("Error while encryption:", error);
        return null;
    }
};

export const decryption = (body) => {
    try {
        if (body && Object.keys(body).length !== 0) {
            var decrypted = CryptLib.decrypt(body, shakey, GLOBALS.IV);
            decrypted = JSON.parse(decrypted);
        }
        return decrypted;
    } catch (error) {
        console.log("Error while decryption:", error);
        decrypted = {};
        return decrypted;
    }
};

export const validateHeaderToken = (req) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) return null;

        const token = authHeader.split(" ")[1];
        if (!token) return null;

        const decoded = jwt.verify(token, GLOBALS.JWT_SECRET);
        // if (!isValidObjectId(decoded.id)) return null;

        return decoded;
    } catch (error) {
        console.error("Token validation error:", error.message);
        return null;
    }
};


export const checkValidationRules = (req, schema) => {
    try {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            const messages = result.error.issues.map(err => err.message);
            return { valid: false, message: messages };
        }

        return { valid: true, value: result.data };
    } catch (error) {
        console.error("Validation error:", error);
        return { valid: false, message: ["Validation failed"] };
    }
};



export const sendApiResponse = (req, res, statusCode, responseMessage, responseData = null) => {
    try {
        const formedMsg = getMessage(req.lang, responseMessage.keyword, responseMessage.components);

        const responsePayload = {
            Code: statusCode,
            message: formedMsg,
            ...(responseData !== null && { data: responseData }),
        };

        const encryptedResponse = encryption(responsePayload);
        return res.status(statusCode).send(encryptedResponse);
    } catch (error) {
        console.error("Error while sending API response:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};