import { IPeople, ITelegramFile } from "../../types";
import { request } from "utils/api";

export const fetchPhotos = async (
  relevantFile: string,
  userEmail?: string
): Promise<ITelegramFile[]> => {
  return await request({
    uri: `/telegram-storage/photos`,
    method: "GET",
    params: {
      uploadCreator: userEmail,
      relevantFolder: relevantFile,
    },
  });
};

export const fetchPeople = async (): Promise<IPeople[]> => {
  return await request({
    uri: `/telegram-storage/people`,
    method: "GET",
  });
};



export const uploadPhotos = async (
  formData: FormData,
  relevantFile: string,
  userEmail: string
) => {
  return await request({
    uri: `/telegram-storage/upload`,
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

export const deletePhoto = async (messageId: number, userEmail: string) => {
  return await request({
    uri: `/telegram-storage/photo`,
    method: "DELETE",
    data: {
      messageId,
      userEmail,
    },
  });
};
