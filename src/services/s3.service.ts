import { randomUUID } from "node:crypto";
import path from "node:path";

import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { UploadedFile } from "express-fileupload";

import { config } from "../configs/config";
import { FileItemTypeEnum } from "../enums/file-item-type.enum";

class S3Service {
  constructor(
    private readonly client = new S3Client({
      region: config.awsRegion,
      credentials: {
        accessKeyId: config.awsAccessKey,
        secretAccessKey: config.awsSecretKey,
      },
    }),
  ) {}

  public async uploadFile(
    file: UploadedFile,
    itemType: FileItemTypeEnum,
    itemId: string,
  ): Promise<string> {
    try {
      const filePath = this.buildPath(itemType, itemId, file.name);
      await this.client.send(
        new PutObjectCommand({
          Bucket: config.awsS3BucketName,
          Key: filePath,
          Body: file.data,
          ContentType: file.mimetype,
          ACL: "public-read",
        }),
      );
      return filePath;
    } catch (error) {
      console.error("Error upload: ", error);
    }
  }

  private buildPath(
    itemType: FileItemTypeEnum,
    itemId: string,
    fileName: string,
  ): string {
    return `${itemType}/${itemId}/${randomUUID()}${path.extname(fileName)}`; // use only template string
  }

  public async deleteFile(key: string): Promise<void> {
    try {
      await this.client.send(
        new DeleteObjectCommand({
          Bucket: config.awsS3BucketName,
          Key: key,
        }),
      );
    } catch (error) {
      console.error("Error upload: ", error);
    }
  }
}

export const s3Service = new S3Service();
