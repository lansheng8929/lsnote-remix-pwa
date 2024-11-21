import imageCompression from "browser-image-compression";

export const compressImage = async (file) => {
  const options = {
    maxSizeMB: 1, // 最大图片大小（MB）
    maxWidthOrHeight: 1024, // 最大宽高
    useWebWorker: true,
  };
  try {
    const compressedFile = await imageCompression(file, options);
    return URL.createObjectURL(compressedFile); // 压缩后生成可用的 URL
  } catch (error) {
    console.error("Image compression error:", error);
  }
};
