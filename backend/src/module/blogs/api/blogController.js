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

        const existUser = await prisma.user.findUnique({
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

        const images = req.files?.images?.[0];

        const newBlog = await prisma.blog.create({
            data: {
                title,
                content,
                author: {
                    connect: { id }
                },
                Category: {
                    connect: { id:CategoryId }
                },
                tags: {
                    connect: tags.map(tagId => ({ id: tagId }))
                },
                image: images.path,
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