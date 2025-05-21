import { isIOS } from "../constants/app";

export const downloadFile = async (imageUrl: string, fileName: string) => {
  try {
    if (isIOS) {
      window.open(imageUrl, "_blank");
    } else {
      const a = document.createElement("a");
      a.href = imageUrl;
      a.download = "photo.jpg";
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download. The file may be protected or blocked.");
  }
};
