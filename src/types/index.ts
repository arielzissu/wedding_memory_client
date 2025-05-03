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

export interface ILocalUser {
  name: string;
  email: string;
  picture: string;
}
