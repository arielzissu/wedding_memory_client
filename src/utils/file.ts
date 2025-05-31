// import canvas from "canvas";
import { isIOS } from "../constants/app";

export const downloadFile = async (imageUrl: string, fileName: string) => {
  console.log("imageUrl: ", imageUrl);
  console.log("fileName: ", fileName);

  try {
    // if (isIOS) {
    //   window.open(imageUrl, "_blank");
    // } else {
    //   const a = document.createElement("a");
    //   a.href = imageUrl;
    //   a.download = "photo.jpg";
    //   document.body.appendChild(a);
    //   a.click();
    //   a.remove();
    // }
    ///////////////////
    // const img = new Image();
    // img.crossOrigin = "anonymous";
    // img.src = imageUrl;
    // img.onload = () => {
    //   const canvas = document.createElement("canvas");
    //   const ctx = canvas.getContext("2d");
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    //   if (ctx) {
    //     ctx.drawImage(img, 0, 0);
    //   } else {
    //     console.error("Failed to get 2D context from canvas.");
    //     return;
    //   }
    //   // for create tag anchor
    //   const a = document.createElement("a");
    //   a.download = `image-download`;
    //   a.href = canvas.toDataURL("image/png");
    //   a.click();
    // };
    ///////////////////
    const response = await fetch(imageUrl);
    console.log('response: ', response);
    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName || "photo.jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl); // cleanup
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download. The file may be protected or blocked.");
  }
};
