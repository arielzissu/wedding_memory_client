// import canvas from "canvas";
import { isIOS } from "../constants/app";

export const downloadFile = async (imageUrl: string, fileName: string) => {
  console.log("imageUrl: ", imageUrl);
  console.log("fileName: ", fileName);

  try {
    if (isIOS) {
      // iOS Safari doesn't support blob downloads reliably
      const link = document.createElement("a");
      link.href = imageUrl;
      link.target = "_blank"; // opens in new tab for long-press saving
      link.rel = "noopener noreferrer";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // Android, desktop — use blob to force download
      const response = await fetch(imageUrl, { mode: "cors" });
      if (!response.ok) throw new Error("File fetch failed");

      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    }
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download. The file may be protected or blocked.");
  }
};
