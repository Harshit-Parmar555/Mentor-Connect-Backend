// Importing necessary modules
import admin, { ServiceAccount } from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount: ServiceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID as string,
  privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
    /\\n/g,
    "\n"
  ),
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
};

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET as string,
  });
}

export const auth = admin.auth();
export const bucket = admin.storage().bucket();
export default admin;
