import { ApiError } from "../errors/api.error";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserIncomplete } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async register(
    body: IUserIncomplete,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isEmailUnique(body.email);
    const password = await passwordService.hashPassword(body.password);
    const user = await userRepository.create({ ...body, password });
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async login(body: any): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(body.email);
    if (!user) {
      throw new ApiError("invalid email or password", 400);
    }
    const isPasswordCorrect = await passwordService.comparePassword(
      body.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("invalid email or password", 401);
    }
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }
}

export const authService = new AuthService();
