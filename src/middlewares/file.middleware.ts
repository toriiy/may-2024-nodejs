import { NextFunction, Request, Response } from "express";

import { avatarConfig } from "../configs/file.config";
import { ApiError } from "../errors/api.error";

class FileMiddleware {
  public isFileValid(req: Request, res: Response, next: NextFunction) {
    try {
      if (Array.isArray(req.files.avatar)) {
        throw new ApiError("Avtar must be a single file", 400);
      }

      const { mimetype, size } = req.files.avatar;

      if (size > 5 * 1024 * 1024) {
        throw new ApiError("Avatar has to be less than 5 mb", 413);
      }

      if (!avatarConfig.mimetype.includes(mimetype)) {
        throw new ApiError("Avatar has invalid file extension", 415);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const fileMiddleware = new FileMiddleware();
