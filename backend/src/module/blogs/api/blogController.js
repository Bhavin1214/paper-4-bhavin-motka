import { prisma } from "../../../lib/prisma.js"
import { checkValidationRules, sendApiResponse } from "../../../middleware/PreMiddileware.js"
import SC from "../../../config/statusCode.js"
import { createBlogSchema } from "../validationRules.js"
import utils from "../../../middleware/util.js"

export const createBlog = async (req, res) => {
    try {
        const { valid, message } = checkValidationRules(req, createBlogSchema)
        if (!valid) {
            sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "VALIDATION_ERROR", components: {}
            }, message)
        }

        const { id } = req.user;
        const existUser = prisma.user.findUnique({
            where: {
                id: id
            }
        })
        if (!existUser) {
            sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "USER_NOT_FOUND", components: {}
            })
        }
        const { title, content, CategoryId, tags } = req.body;
        console.log(req.file);

        const images = req.file?.path || null;

        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                author: {
                    connect: { id }
                },
                Category:{
                    connect: { CategoryId }
                },
                tags,
                image: images,
            }
        })

        return sendApiResponse(req, res, SC.OK, {
            keyword: "BLOG_CREATED", components: {}
        }, newBlog)
    } catch (error) {
        console.log(error);
        sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR", components: {}
        }, error)
    }
}