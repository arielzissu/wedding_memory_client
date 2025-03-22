import { ResourceType } from "cloudinary";
import { ICloudinaryFile } from "../../types";
import { request } from "utils/api";

export const fetchPhotos = async (
  relevantFile: string,
  userEmail?: string
): Promise<{
  images: ICloudinaryFile[];
  videos: ICloudinaryFile[];
}> => {
  return await request({
    uri: `/cloudinary/photos`,
    method: "GET",
    params: {
      uploadCreator: userEmail,
      relevantFolder: relevantFile,
    },
  });
};

export const getDownloadedFolderAssets = async (
  folderPath: string
): Promise<{ downloadPath: string }> => {
  return await request({
    uri: `/cloudinary/download-folder-assets`,
    method: "GET",
    params: {
      folderPath,
    },
  });
};

export const uploadPhotos = async (
  formData: FormData,
  relevantFile: string,
  userEmail: string
) => {
  return await request({
    uri: `/cloudinary/upload`,
    method: "POST",
    data: formData,
    params: {
      uploadCreator: userEmail,
      relevantFolder: relevantFile,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePhoto = async (
  publicId: string,
  resourceType: ResourceType
) => {
  return await request({
    uri: `/cloudinary/photo`,
    method: "DELETE",
    data: {
      publicId,
      resourceType,
    },
  });
};
