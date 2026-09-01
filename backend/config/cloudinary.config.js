import "dotenv/config";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
// cloudinary object Will be needed while deleteing a listing to delete the image from cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// CloudinaryStorage is used to store the image in cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "StayConnect",
    allowedFormats: ["jpg", "jpeg", "png"],
  },
});

export { cloudinary, storage };
