import { IUser, IUserIncomplete } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(user: IUserIncomplete): Promise<IUser> {
    return await User.create(user);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async deleteById(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }

  public async updateById(
    userId: string,
    body: IUserIncomplete,
  ): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, body, {
      returnDocument: "after",
    });
  }
}

export const userRepository = new UserRepository();
