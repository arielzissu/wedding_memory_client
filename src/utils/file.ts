import snackbarStore from "stores/snackbarStore";
import { isIOS } from "../constants/app";

export const downloadFile = async (
  imageUrl: string,
  fileName: string,
  previewForIOS?: (url: string) => void
) => {
  try {
    if (isIOS) {
      snackbarStore.show("Tap and hold the image to save it to your device.");
      previewForIOS?.(imageUrl);
      return;
    }

    snackbarStore.show("Downloading...");
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

    snackbarStore.show("Download complete!");
  } catch (err) {
    console.error("Download failed:", err);
    snackbarStore.show(
      "Failed to download. The file may be protected or blocked.",
      "error"
    );
  }
};

// export const downloadFile = async (
//   imageUrl: string,
//   fileName: string,
//   notify?: (message: string) => void
// ) => {
//   try {
//     if (isIOS) {
//       // notify?.("Please tap and hold the image to save it to your device.");
//       snackbarStore.show("Upload complete!");
//       window.open(imageUrl, "_blank", "noopener,noreferrer");
//     } else {
//       // Android / Desktop
//       // notify?.("Downloading...");
//       snackbarStore.show("Downloading...");
//       const response = await fetch(imageUrl, { mode: "cors" });
//       if (!response.ok) throw new Error("File fetch failed");

//       const blob = await response.blob();
//       const blobUrl = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = blobUrl;
//       link.download = fileName;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       window.URL.revokeObjectURL(blobUrl);
//       // notify?.("Download complete!");
//       snackbarStore.show("Download complete!");
//     }
//   } catch (err) {
//     console.error("Download failed:", err);
//     snackbarStore.show(
//       "Failed to download. The file may be protected or blocked.",
//       "error"
//     );
//   }
// };

export const getPollUploadsStatusIntervalTime = (totalSize: number): number => {
  // Less than 0.1 GB:
  if (totalSize < 100 * 1024 * 1024) {
    return 1000;
  }
  // Less than 0.3 GB:
  if (totalSize < 300 * 1024 * 1024) {
    return 3000;
  }
  // Less than 0.5 GB:
  if (totalSize < 500 * 1024 * 1024) {
    return 5000;
  }
  // Less than 1 GB:
  if (totalSize < 1024 * 1024 * 1024) {
    return 8000;
  }
  // More than 1 GB:
  return 10000;
};
