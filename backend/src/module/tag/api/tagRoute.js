import express from "express"
import { allTags } from "./tagController.js"

const router = express.Router();

router.get("/allTags", allTags)


export default router