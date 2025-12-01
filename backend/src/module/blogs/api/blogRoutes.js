import express from "express"
import { createBlog } from "./blogController.js"
import upload from "../../../middleware/multer.js";

const router = express.Router();

router.use("/createBlog",upload("images").single("images"),createBlog)

export default router