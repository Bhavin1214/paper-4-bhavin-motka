import express from "express"
import { allBlog, createBlog, deleteBlog, getBlogById, myBlogs, updateBlog } from "./blogController.js"
import upload from "../../../middleware/multer.js";

const router = express.Router();

router.post("/createBlog", upload.fields([
    { name: "images", maxCount: 1 }
]), createBlog)

router.post("/updateBlog", upload.fields([
    { name: "images", maxCount: 1 }
]), updateBlog)

router.post("/deleteBlog",deleteBlog)

router.get("/allBlog", allBlog)
router.get("/myBlogs", myBlogs)
router.get("/getBlogById/:blogId", getBlogById)

export default router