import { ApiError } from "../errors/api.error";
import { IUser, IUserIncomplete } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(user: IUserIncomplete): Promise<IUser> {
    if (!user.name || user.name.length < 3) {
      throw new ApiError(
        "Name is required and should be minimum 3 symbols",
        400,
      );
    }
    if (!user.email || !user.email.includes("@")) {
      throw new ApiError("Email is invalid", 400);
    }
    if (!user.password || user.password.length < 8) {
      throw new ApiError(
        "Password is required and should be minimum 8 symbols",
        400,
      );
    }
    return await userRepository.create(user);
  }

  public async getById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async deleteById(userId: string): Promise<void> {
    return await userRepository.deleteById(userId);
  }

  public async updateById(
    userId: string,
    body: IUserIncomplete,
  ): Promise<IUser> {
    // if (!body.name || body.name.length < 3) {
    //   throw new ApiError(
    //     "Name is required and should be minimum 3 symbols",
    //     400,
    //   );
    // }
    // if (!body.email || !body.email.includes("@")) {
    //   throw new ApiError("Email is invalid", 400);
    // }
    // if (!body.password || body.password.length < 8) {
    //   throw new ApiError(
    //     "Password is required and should be minimum 8 symbols",
    //     400,
    //   );
    // }
    return await userRepository.updateById(userId, body);
  }
}

export const userService = new UserService();
