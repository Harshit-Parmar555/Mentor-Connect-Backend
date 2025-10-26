import fs from "fs";
import { bucket } from "../configs/firebase";

// Interface for file object (typically from multer)
interface UploadedFile {
  path: string;
  originalname: string;
  mimetype: string;
  size: number;
  filename: string;
}

// Return type for upload function
interface UploadResult {
  publicUrl: string;
  fileName: string;
  fileSize: number;
  contentType: string;
}

const uploadToFirebase = async (file: UploadedFile): Promise<UploadResult> => {
  try {
    if (!file) {
      throw new Error("No file provided");
    }

    // Validate file properties
    if (!file.path || !file.originalname || !file.mimetype) {
      throw new Error("Invalid file object: missing required properties");
    }

    const localFilePath: string = file.path;
    const uniqueFileName: string = `${Date.now()}_${file.originalname}`;
    const firebaseFile = bucket.file(uniqueFileName);

    // Read and upload file
    const fileBuffer: Buffer = fs.readFileSync(localFilePath);

    await firebaseFile.save(fileBuffer, {
      metadata: {
        contentType: file.mimetype,
        metadata: {
          originalName: file.originalname,
          uploadedAt: new Date().toISOString(),
        },
      },
    });

    // Make file publicly accessible
    await firebaseFile.makePublic();
    const publicUrl: string = firebaseFile.publicUrl();

    // Clean up local file
    fs.unlinkSync(localFilePath);

    return {
      publicUrl,
      fileName: uniqueFileName,
      fileSize: file.size,
      contentType: file.mimetype,
    };
  } catch (error: unknown) {
    console.error("Error uploading file:", error);

    // Type-safe error handling
    if (error instanceof Error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    throw new Error("Upload failed: Unknown error occurred");
  }
};

export { uploadToFirebase };
export type { UploadedFile, UploadResult };
