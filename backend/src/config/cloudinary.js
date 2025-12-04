import { v2 as cloudinary } from "cloudinary";
import GLOBALS from "./constants.js";

cloudinary.config({
    cloud_name: GLOBALS.CLOUDINARY_CLOUD_NAME,
    api_key: GLOBALS.CLOUDINARY_API_KEY,
    api_secret: GLOBALS.CLOUDINARY_API_SECRET,
});

export default cloudinary;