import { config } from "../configs/config";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserIncomplete } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(
    body: IUserIncomplete,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    const password = await passwordService.hashPassword(body.password);
    const user = await userRepository.create({ ...body, password });
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    await emailService.sendEmail(EmailTypeEnum.WELCOME, body.email, {
      name: user.name,
      frontUrl: config.frontUrl,
    });
    return { user, tokens };
  }

  public async login(
    body: Partial<IUserIncomplete>,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
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

  public async refresh(
    refreshTokenPayload: ITokenPayload,
    refreshToken: string,
  ): Promise<ITokenPair> {
    await tokenRepository.deleteByParams({ refreshToken });
    const tokens = tokenService.generateToken({
      userId: refreshTokenPayload.userId,
      role: refreshTokenPayload.role,
    });
    await tokenRepository.create({
      ...tokens,
      _userId: refreshTokenPayload.userId,
    });
    return tokens;
  }

  public async logout(
    accessToken: string,
    tokenPayload: ITokenPayload,
  ): Promise<void> {
    const user = await userRepository.getById(tokenPayload.userId);
    await tokenRepository.deleteByParams({ accessToken });
    await emailService.sendEmail(EmailTypeEnum.LOG_OUT, user.email, {
      name: user.name,
    });
  }

  public async logoutAll(tokenPayload: ITokenPayload): Promise<void> {
    await tokenRepository.deleteAll(tokenPayload.userId);
  }
}

export const authService = new AuthService();
