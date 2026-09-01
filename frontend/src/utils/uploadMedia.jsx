const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const CLOUDINARY_URL =
  `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`;

export const uploadMedia = async (file, onProgress) => {
  if (!file) {
    throw new Error("No file selected.");
  }

  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", CLOUDINARY_URL);

    xhr.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round(
          (event.loaded / event.total) * 100
        );

        onProgress(progress);
      }
    });

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const data = JSON.parse(xhr.responseText);

          resolve({
            type:
              data.resource_type === "video"
                ? "video"
                : "image",

            url: data.secure_url,

            publicId: data.public_id,
          });
        } catch {
          reject(new Error("Invalid Cloudinary response."));
        }
      } else {
        reject(new Error("Media upload failed."));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error during media upload."));
    };

    xhr.send(formData);
  });
};