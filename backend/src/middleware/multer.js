import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/jpg",
    "application/pdf"
];

const documentStorage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folder = "uploads/documents";

        return {
            folder,
            allowed_formats: ["jpg", "jpeg", "png", "pdf"],
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}`,
            resource_type: "auto",
        };
    },
});

const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("INVALID_FILE_TYPE"), false);
    }
};

const upload = multer({
    storage: documentStorage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024,
    }
});

export default upload;
