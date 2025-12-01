import express from "express"
import authRoute from "./src/module/auth/api/authRoute.js"
import blogRoutes from "./src/module/blogs/api/blogRoutes.js"

export const router = express.Router();
router.use("/auth",authRoute)
router.use("/blogs",blogRoutes)
