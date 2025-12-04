import { prisma } from "../../../lib/prisma.js"
import {  sendApiResponse } from "../../../middleware/PreMiddileware.js"
import SC from "../../../config/statusCode.js"

export const allCategories = async (req, res) => {
    try {
        
        const categories = await prisma.category.findMany({});
        
        if (categories.length === 0) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "CATEGORY_NOT_FOUND",
                components: {}
            });
        }

        return sendApiResponse(req, res, SC.OK, {
            keyword: "CATEGORY_FOUND",
            components: {}
        }, categories);

    } catch (error) {
        console.log(error);
        return sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR",
            components: {}
        }, error);
    }
}