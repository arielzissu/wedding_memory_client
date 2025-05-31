import { IPeople, IR2File, IUploadStatusResponse } from "../../types";
import { request } from "utils/api";

export const fetchPhotos = async (
  relevantFile: string,
  userEmail?: string
): Promise<{ success: boolean; photos: IR2File[] }> => {
  return await request({
    uri: `/r2/photos`,
    method: "GET",
    params: {
      uploadCreator: userEmail,
      weddingName: relevantFile,
    },
  });
};

export const fetchPeople = async (): Promise<IPeople[]> => {
  return await request({
    uri: `/r2/people`,
    method: "GET",
  });
};

export const uploadPhotos = async (
  formData: FormData,
  relevantFile: string,
  userEmail: string
) => {
  return await request({
    uri: `/r2/upload`,
    method: "POST",
    data: formData,
    params: {
      uploadCreator: userEmail,
      weddingName: relevantFile,
    },
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getUploadStatus = async (
  uploadId: string
): Promise<IUploadStatusResponse> => {
  return await request({
    uri: "/r2/upload-status",
    method: "GET",
    params: {
      uploadId,
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

export const deletePhoto = async (userEmail: string, fileName: string) => {
  return await request({
    uri: `/r2/photo`,
    method: "DELETE",
    data: {
      userEmail,
      fileName,
    },
  });
};
