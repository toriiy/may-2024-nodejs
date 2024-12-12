import { IBody } from "../interfaces/body.interface";
import { IUserIncomplete } from "../interfaces/incomplete.user.interface";
import { IParams } from "../interfaces/params.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(): Promise<IUser[]> {
    return await userRepository.getList();
  }

  public async create(user: Partial<IUserIncomplete>): Promise<IUser> {
    return await userRepository.create(user);
  }

  public async getById(params: Partial<IParams>): Promise<IUser> {
    return await userRepository.getById(params);
  }

  public async deleteById(params: Partial<IParams>): Promise<void> {
    return await userRepository.deleteById(params);
  }

  public async updateById(
    params: Partial<IParams>,
    body: IBody,
  ): Promise<void> {
    return await userRepository.updateById(params, body);
  }
}

export const userService = new UserService();
