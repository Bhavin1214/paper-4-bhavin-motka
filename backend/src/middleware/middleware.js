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

        const publicRoutes = ["/api/v1/auth/register", "/api/v1/auth/login", "/api/v1/blogs/allBlog", "/api/v1/blogs/getBlogById/:blogId", "/api/v1/category/allCategories", "/api/v1/tags/allTags"];
        const bypass = publicRoutes.some(route => {
            if (route.includes(":")) {
                const base = route.split("/:")[0];
                return req.path.startsWith(base);
            }
            return route === req.path;
        });

        if (bypass) return next();

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