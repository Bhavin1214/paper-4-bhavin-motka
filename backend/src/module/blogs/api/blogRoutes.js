import express from "express"
import { createBlog } from "./blogController.js"
import upload from "../../../middleware/multer.js";

const router = express.Router();

router.use("/createBlog", upload.fields([
    { name: "images", maxCount: 1 }
]), createBlog)

export default router