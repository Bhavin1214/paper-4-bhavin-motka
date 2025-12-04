import { prisma } from "../../../lib/prisma.js"
import { checkValidationRules, sendApiResponse } from "../../../middleware/PreMiddileware.js"
import SC from "../../../config/statusCode.js"
import { createBlogSchema, updateBlogSchema , DeleteBlogSchema } from "../validationRules.js"
import utils from "../../../middleware/util.js"

export const createBlog = async (req, res) => {
    try {
        const { valid, message } = checkValidationRules(req, createBlogSchema);
        if (!valid) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "VALIDATION_ERROR",
                components: {}
            }, message);
        }

        const { id } = req.user;

        const existUser = await prisma.user.findUnique({
            where: { id }
        });

        if (!existUser) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "USER_NOT_FOUND",
                components: {}
            });
        }

        const { title, content, CategoryId, tags } = req.body;

        const file = req.files?.images?.[0] || null;
        const imagePath = file ? file.path : null;

        const data = {
            title,
            content,
            author: { connect: { id } },
            Category: { connect: { id: CategoryId } }
        };

        if (Array.isArray(tags) && tags.length > 0) {
            data.tags = {
                connect: tags.map(tagId => ({ id: tagId }))
            };
        }

        if (imagePath) {
            data.image = imagePath;
        }

        const newBlog = await prisma.blog.create({ data });

        return sendApiResponse(req, res, SC.OK, {
            keyword: "BLOG_CREATED",
            components: {}
        }, newBlog);

    } catch (error) {
        console.log(error);
        return sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR",
            components: {}
        }, error);
    }
};


export const allBlog = async (req, res) => {
    try {
        const blogs = await prisma.blog.findMany({
            where: { isDeleted: false },
            include: {
                author: true,
                Category: true,
                tags: true,
                _count: true
            }
        });

        if (blogs.length === 0) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "BLOG_NOT_FOUND",
                components: {}
            });
        }

        return sendApiResponse(req, res, SC.OK, {
            keyword: "BLOG_FOUND",
            components: {}
        }, blogs);

    } catch (error) {
        console.log(error);
        return sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR",
            components: {}
        }, error);
    }
};


export const myBlogs = async (req, res) => {
    try {
        const { id } = req.user;

        const existUser = await prisma.user.findUnique({
            where: { id }
        });

        if (!existUser) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "USER_NOT_FOUND",
                components: {}
            });
        }

        const blogs = await prisma.blog.findMany({
            where: { authorId: id, isDeleted: false },
            include: {
                author: true,
                Category: true,
                tags: true,
                _count: true
            }
        });

        if (blogs.length === 0) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "BLOG_NOT_FOUND",
                components: {}
            });
        }

        return sendApiResponse(req, res, SC.OK, {
            keyword: "BLOG_FOUND",
            components: {}
        }, blogs);

    } catch (error) {
        console.log(error);
        return sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR",
            components: {}
        }, error);
    }
};


export const updateBlog = async (req, res) => {
    try {
        const { valid, message } = checkValidationRules(req, updateBlogSchema);
        if (!valid) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "VALIDATION_ERROR",
                components: {}
            }, message);
        }

        const { id } = req.user;
        const { blogId, title, content, CategoryId, tags } = req.body;

        const existUser = await prisma.user.findUnique({
            where: { id }
        });

        if (!existUser) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "USER_NOT_FOUND",
                components: {}
            });
        }

        const blog = await prisma.blog.findUnique({
            where: { id: blogId }
        });

        if (!blog || blog.authorId !== id || blog.isDeleted) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "YOU_ARE_NOT_ALLOWED_TO_UPDATE_THIS_BLOG",
                components: {}
            });
        }

        const file = req.files?.images?.[0] || null;
        const imagePath = file ? file.path : null;

        const data = {};

        if (title) data.title = title;
        if (content) data.content = content;

        if (CategoryId) {
            data.Category = { connect: { id: CategoryId } };
        }

        if (Array.isArray(tags)) {
            data.tags = {
                set: tags.map(tagId => ({ id: tagId }))
            };
        }

        if (imagePath) {
            data.image = imagePath;
        } else {
            data.image = blog.image;
        }

        const updatedBlog = await prisma.blog.update({
            where: { id: blogId },
            data
        });

        return sendApiResponse(req, res, SC.OK, {
            keyword: "BLOG_UPDATED",
            components: {}
        }, updatedBlog);

    } catch (error) {
        console.log(error);
        return sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR",
            components: {}
        }, error);
    }
};


export const deleteBlog = async (req, res) => {
    try {
        const { valid, message } = checkValidationRules(req, DeleteBlogSchema);
        if (!valid) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "VALIDATION_ERROR",
                components: {}
            }, message);
        }

        const { id } = req.user;
        const { blogId } = req.body;
        
        const existUser = await prisma.user.findUnique({
            where: { id }
        });

        if (!existUser) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "USER_NOT_FOUND",
                components: {}
            });
        }

        const blog = await prisma.blog.findUnique({
            where: { id: blogId }
        });

        if (!blog || blog.authorId !== id || blog.isDeleted) {
            return sendApiResponse(req, res, SC.BAD_REQUEST, {
                keyword: "YOU_ARE_NOT_ALLOWED_TO_DELETE_THIS_BLOG",
                components: {}
            });
        }

        await prisma.blog.update({
            where: { id: blogId },
            data: { isDeleted: true }
        });

        return sendApiResponse(req, res, SC.OK, {
            keyword: "BLOG_DELETED",
            components: {}
        });

    } catch (error) {
        console.log(error);
        return sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR",
            components: {}
        }, error);
    }
};

export const getBlogById = async (req, res) => {
    try {
        const { blogId } = req.params;

        const blog = await prisma.blog.findUnique({
            where: { id: blogId, isDeleted: false },
            include: {
                author: true,
                Category: true,
                tags: true
            }
        });

        if (!blog) {
            return sendApiResponse(req, res, SC.NOT_FOUND, {
                keyword: "BLOG_NOT_FOUND",
                components: {}
            });
        }

        return sendApiResponse(req, res, SC.OK, {
            keyword: "BLOG_FETCHED",
            components: {}
        }, blog);
    } catch (error) {
        console.log(error);
        return sendApiResponse(req, res, SC.INTERNAL_SERVER_ERROR, {
            keyword: "INTERNAL_SERVER_ERROR",
            components: {}
        }, error);
    }
}