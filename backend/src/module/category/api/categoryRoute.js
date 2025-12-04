import express from "express"
import { allCategories } from "./categoryController.js"

const router = express.Router();

router.get("/allCategories", allCategories)


export default router