const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10 MB
const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50 MB

const ALLOWED_IMAGES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const ALLOWED_VIDEOS = [
  "video/mp4",
  "video/webm",
  "video/quicktime",
];

export const validateMedia = (file) => {
  if (!file) {
    return {
      valid: false,
      message: "Invalid file.",
    };
  }

  if (file.type.startsWith("image/")) {
    if (!ALLOWED_IMAGES.includes(file.type)) {
      return {
        valid: false,
        message: "Only JPG, PNG and WebP images are allowed.",
      };
    }

    if (file.size > MAX_IMAGE_SIZE) {
      return {
        valid: false,
        message: "Image must be smaller than 10 MB.",
      };
    }

    return { valid: true };
  }

  if (file.type.startsWith("video/")) {
    if (!ALLOWED_VIDEOS.includes(file.type)) {
      return {
        valid: false,
        message: "Only MP4, WebM and MOV videos are allowed.",
      };
    }

    if (file.size > MAX_VIDEO_SIZE) {
      return {
        valid: false,
        message: "Video must be smaller than 50 MB.",
      };
    }

    return { valid: true };
  }

  return {
    valid: false,
    message: "Only images and videos are allowed.",
  };
};