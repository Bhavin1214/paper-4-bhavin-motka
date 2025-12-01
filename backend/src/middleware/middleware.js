import {
    extractHeaderLanguage,
    validateHeaderToken,
    decryption,
    sendApiResponse
} from "./PreMiddileware.js"
import statusCode from "../config/statusCode.js";

export const customMiddleware = (req, res, next) => {
    try {
        req.lang = extractHeaderLanguage(req);
        const isMultipart = req.headers["content-type"]?.includes("multipart/form-data");
        if (isMultipart) {
            if (req.body?.data) {
                req.body = decryption(req.body.data);  
            }
        } else {
            if (req.body && Object.keys(req.body).length > 0) {
                req.body = decryption(req.body);
            }
        }

        const publicRoutes = ["/api/v1/auth/register","/api/v1/auth/login"];
        if (publicRoutes.includes(req.path)) {
            return next();
        }
        req.user = validateHeaderToken(req);
        if (!req.user) {
            return sendApiResponse(
                req, res,
                statusCode.UNAUTHORIZED,
                { keyword: "TOKEN_MISSING_OR_INVALID", components: {} }
            )
        }
        next();
    } catch (error) {
        console.log(error);
        return sendApiResponse(
            req, res,
            statusCode.INTERNAL_SERVER_ERROR,
            { keyword: "INTERNAL_SERVER_ERROR", components: { message: error.message } },
            error
        )
    }
} 