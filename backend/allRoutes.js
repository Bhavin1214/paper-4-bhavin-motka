import express from "express"
import authRoute from "./src/module/auth/api/authRoute.js"
import blogRoutes from "./src/module/blogs/api/blogRoutes.js"
import categoryRoute from "./src/module/category/api/categoryRoute.js"
import tagRoute from "./src/module/tag/api/tagRoute.js"

export const router = express.Router();
router.use("/auth",authRoute)
router.use("/blogs",blogRoutes)
router.use("/category",categoryRoute)
router.use("/tags",tagRoute)