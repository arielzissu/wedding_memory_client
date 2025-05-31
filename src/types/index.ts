export type TResourceType = "photo" | "video";

export interface IR2File {
  fileName: string;
  url: string;
  type: TResourceType;
  metadata: {
    uploader: string;
    wedding_name: string;
    thumbnail_url: string;
  };
}

export interface ILocalUser {
  name: string;
  email: string;
  picture: string;
}

export interface IPeople {
  personId: string;
  faceCount: number;
  mediaFiles: IR2File[];
  sampleThumbnail: string;
}

export interface IUploadStatusResponse {
  uploadId: string;
  status: string;
  totalFiles: number;
  processedFiles: number;
  error: any;
  updatedAt: Date;
  uploaderEmail: string;
  weddingName: string;
}
