import snackbarStore from "stores/snackbarStore";
import { isIOS } from "../constants/app";

export const downloadFile = async (
  imageUrl: string,
  fileName: string,
  notify?: (message: string) => void
) => {
  try {
    if (isIOS) {
      notify?.("Please tap and hold the image to save it to your device.");
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    } else {
      // Android / Desktop
      notify?.("Downloading...");
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
      notify?.("Download complete!");
    }
  } catch (err) {
    console.error("Download failed:", err);
    snackbarStore.show(
      "Failed to download. The file may be protected or blocked.",
      "error"
    );
  }
};
