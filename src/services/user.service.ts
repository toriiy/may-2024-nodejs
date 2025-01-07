import { UploadedFile } from "express-fileupload";

import { FileItemTypeEnum } from "../enums/file-item-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserIncomplete } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { s3Service } from "./s3.service";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async getMe(tokenPayload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(tokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async deleteMe(tokenPayload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(tokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteMe(user._id);
    await tokenRepository.deleteAll(tokenPayload.userId);
  }

  public async updateMe(
    tokenPayload: ITokenPayload,
    body: IUserIncomplete,
  ): Promise<IUser> {
    const user = await userRepository.getById(tokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.updateMe(user._id, body);
  }

  public async uploadAvatar(
    tokenPayload: ITokenPayload,
    file: UploadedFile,
  ): Promise<IUser> {
    const user = await userRepository.getById(tokenPayload.userId);
    const avatar = await s3Service.uploadFile(
      file,
      FileItemTypeEnum.USER,
      user._id,
    );
    const updatedUser = await userRepository.updateMe(user._id, { avatar });
    if (user.avatar) {
      await s3Service.deleteFile(user.avatar);
    }
    return updatedUser;
  }

  public async deleteAvatar(tokenPayload: ITokenPayload) {
    const user = await userRepository.getById(tokenPayload.userId);
    await s3Service.deleteFile(user.avatar);
    await userRepository.updateMe(user._id, { avatar: "" });
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }
}

export const userService = new UserService();
