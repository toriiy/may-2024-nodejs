import { ApiError } from "../errors/api.error";
import { IBody } from "../interfaces/body.interface";
import { IUserIncomplete } from "../interfaces/incomplete.user.interface";
import { IParams } from "../interfaces/params.interface";
import { IUser } from "../interfaces/user.interface";
import { readFile, writeFile } from "../services/fs.service";

class UserRepository {
  public async getList(): Promise<IUser[]> {
    return JSON.parse(await readFile());
  }

  public async create(user: Partial<IUserIncomplete>): Promise<IUser> {
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
    const users = JSON.parse(await readFile());
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      name: user.name,
      email: user.email,
      password: user.password,
    };
    users.push(newUser);
    await writeFile(users);
    return newUser;
  }

  public async getById(params: IParams): Promise<IUser> {
    const users = JSON.parse(await readFile());
    const user = users.find((user: IUser) => user.id === Number(params.userId));
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return user;
  }

  public async deleteById(params: IParams) {
    const users = JSON.parse(await readFile());
    const filteredUsers = users.filter(
      (user: IUser) => user.id !== Number(params.userId),
    );
    await writeFile(filteredUsers);
  }

  public async updateById(params: IParams, body: IBody) {
    if (!body.name || body.name.length < 3) {
      throw new ApiError(
        "Name is required and should be minimum 3 symbols",
        400,
      );
    }
    if (!body.email || !body.email.includes("@")) {
      throw new ApiError("Email is invalid", 400);
    }
    if (!body.password || body.password.length < 8) {
      throw new ApiError(
        "assword is required and should be minimum 8 symbols",
        400,
      );
    }
    const users = JSON.parse(await readFile());
    for (const user of users) {
      if (user.id === Number(params.userId)) {
        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
      }
    }
    await writeFile(users);
  }
}

export const userRepository = new UserRepository();
