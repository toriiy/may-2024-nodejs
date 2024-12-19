import { ApiError } from "../errors/api.error";
import { IUser, IUserIncomplete } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("Email is already in use", 409);
    }
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async deleteById(userId: string): Promise<void> {
    await userRepository.deleteById(userId);
  }

  public async updateById(
    userId: string,
    body: IUserIncomplete,
  ): Promise<IUser> {
    return await userRepository.updateById(userId, body);
  }
}

export const userService = new UserService();
