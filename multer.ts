import { randomUUID } from "crypto";
import mime from "mime";
import multer from "multer";

const MAX_FILE_SIZE = 6 * 1024 * 1024;
const ACCEPTED_FILE_EXTENSIONS = ["image/jpeg", "image/png"];

const fileFilter : multer.Options["fileFilter"] = (request, file, callback) => {
    if (ACCEPTED_FILE_EXTENSIONS.includes(file.mimetype)) {
        callback (null, true);
    } else {
        callback (new Error ("uploaded file must be a png or jpeg image"))
    }
}

export const multerOptions = {
    fileFilter,
    limits: {
        fileSize: MAX_FILE_SIZE
    }
};

const storage = multer.diskStorage ({
    destination: "uploads/",
    filename: (request, file, callback) => {
        callback (null, getFileName (file.mimetype));
    }
})

const getFileName = (mimeType: string) => {
    return "" + randomUUID () + "." + mime.getExtension (mimeType);
}

export const initMulter = () => {
    return multer ({storage});
}