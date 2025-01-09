import { FilterQuery } from "mongoose";

import {
  IUser,
  IUserIncomplete,
  IUserListQuery,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async getList(
    query: IUserListQuery,
  ): Promise<{ entities: IUser[]; total: number }> {
    const filterObj: FilterQuery<IUser> = { isDeleted: false };
    if (query.search) {
      filterObj.name = {
        $regex: query.search,
        $options: "i",
      };
    }
    const skip = query.limit * (query.page - 1);
    const order = query.order;
    const orderBy = query.orderBy;
    const [entities, total] = await Promise.all([
      User.find(filterObj)
        .limit(query.limit)
        .skip(skip)
        .sort({ [orderBy]: order }),
      User.countDocuments(filterObj),
    ]);
    return { entities, total };
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

  public async updateMe(userId: string, body: Partial<IUser>): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, body, {
      returnDocument: "after",
    });
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }
}

export const userRepository = new UserRepository();
