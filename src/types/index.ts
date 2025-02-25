import { ResourceType } from "cloudinary";

export interface ICloudinaryFile {
  url: string;
  publicId: string;
  type: ResourceType;
  thumbnail: string;
}
