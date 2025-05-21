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
  mediaItems: IR2File[];
  sampleThumbnail: string;
}
