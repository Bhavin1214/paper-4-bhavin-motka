import { prisma } from "../../../lib/prisma.js"
import {  sendApiResponse } from "../../../middleware/PreMiddileware.js"
import SC from "../../../config/statusCode.js"

export const allTags = async (req, res) => {
    try {
        const tags = await prisma.tag.findMany({});

        if (tags.length === 0) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "TAG_NOT_FOUND",
                components: {}
            });
        }

        return sendApiResponse(req, res, SC.OK, {
            keyword: "TAG_FOUND",
            components: {}
        }, tags);

    } catch (error) {
        console.log(error);
        return sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR",
            components: {}
        }, error);
    }
}