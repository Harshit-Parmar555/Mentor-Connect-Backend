// Importing necessary modules
import multer from "multer";
import { Request } from "express";

// Custom interface extending Express Request for better typing
interface MulterRequest extends Request {
  file?: Express.Multer.File;
  files?:
    | Express.Multer.File[]
    | { [fieldname: string]: Express.Multer.File[] };
}

// Type for multer callback functions
type MulterCallback = (error: Error | null, result?: any) => void;

// Allowed file types configuration
const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "audio/mpeg",
] as const;

// File size limit (15MB)
const MAX_FILE_SIZE = 15 * 1024 * 1024;

// Multer middleware for file uploading
const storage = multer.diskStorage({
  destination: (
    req: MulterRequest,
    file: Express.Multer.File,
    cb: MulterCallback
  ): void => {
    cb(null, "./public");
  },
  filename: (
    req: MulterRequest,
    file: Express.Multer.File,
    cb: MulterCallback
  ): void => {
    const uniquename: string = `${Date.now()}_${file.originalname}`;
    cb(null, uniquename);
  },
});

const fileFilter = (
  req: MulterRequest,
  file: Express.Multer.File,
  cb: MulterCallback
): void => {
  const allowedTypes: readonly string[] = ALLOWED_MIME_TYPES;

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    const error = new Error(
      "Only images (JPEG, PNG, GIF) and MP3 audio files are allowed"
    );
    error.name = "INVALID_FILE_TYPE";
    cb(error, false);
  }
};

const uploadMedia = multer({
  storage: storage,
  limits: {
    fileSize: MAX_FILE_SIZE,
    files: 1, // Maximum number of files
  },
  fileFilter: fileFilter,
});

// Export types for use in other files
export type { MulterRequest };
export { uploadMedia, ALLOWED_MIME_TYPES, MAX_FILE_SIZE };
