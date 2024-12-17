import { IUser, IUserIncomplete } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(user: IUserIncomplete): Promise<IUser> {
    return await userRepository.create(user);
  }

  public async getById(userId: string): Promise<IUser> {
    return await userRepository.getById(userId);
  }

  public async deleteById(userId: string): Promise<void> {
    return await userRepository.deleteById(userId);
  }

  public async updateById(
    userId: string,
    body: IUserIncomplete,
  ): Promise<IUser> {
    return await userRepository.updateById(userId, body);
  }
}

export const userService = new UserService();
