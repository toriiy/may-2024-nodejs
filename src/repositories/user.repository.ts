import { IUser, IUserIncomplete } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return await User.find();
  }

  public async create(user: IUserIncomplete): Promise<IUser> {
    return await User.create(user);
  }

  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }

  public async deleteMe(userId: string): Promise<void> {
    await User.findByIdAndDelete(userId);
  }

  public async updateMe(userId: string, body: IUserIncomplete): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, body, {
      returnDocument: "after",
    });
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
}

export const userRepository = new UserRepository();
