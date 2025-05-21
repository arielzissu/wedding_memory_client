export type TResourceType = "photo" | "video";

export interface ITelegramFile {
  fileId: string;
  messageId: number;
  thumbnail: string;
  caption: string;
  publicId: string;
  type: TResourceType;
  url: string;
  uploadCreator?: string;
}

export interface IR2File {
  fileName: string;
  url: string;
  type: TResourceType;
  metadata: {
    uploader: string;
    wedding_name: string;
    thumbnail_url: string;
  }
}

export interface ILocalUser {
  name: string;
  email: string;
  picture: string;
}

export interface IPeople {
  personId: string;
  faceCount: number;
  mediaItems: ITelegramFile[];
  sampleThumbnail: string;
}
