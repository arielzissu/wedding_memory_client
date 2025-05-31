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
    const anchor = document.createElement("a");
    anchor.href = imageUrl;
    anchor.download = fileName;
    anchor.target = "_blank"; // important for iPhone Safari
    anchor.rel = "noopener noreferrer";

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
  } catch (err) {
    console.error("Download failed:", err);
    alert("Failed to download. The file may be protected or blocked.");
  }
};
