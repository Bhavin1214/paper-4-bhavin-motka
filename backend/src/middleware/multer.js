import multer from "multer";
import fs from "fs";

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "application/pdf"
];

const upload = (folderName) => {
  const uploadDir = `uploads/${folderName}/`;

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    }
  });

  const fileFilter = (req, file, cb) => {
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("INVALID_FILE_TYPE"), false);
    }
  };

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024
    }
  });
};

export default upload;
