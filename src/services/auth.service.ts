import { config } from "../configs/config";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { EmailTypeEnum } from "../enums/email-type.enum";
import { ApiError } from "../errors/api.error";
import { ITokenPair, ITokenPayload } from "../interfaces/token.interface";
import {
  IChangePassword,
  IForgotPassword,
  ISetForgotPassword,
  IUser,
  IUserIncomplete,
} from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { passwordRepository } from "../repositories/password.repository";
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
    await passwordRepository.create({ _userId: user._id, password });
    const token = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.EMAIL_VERIFICATION,
    );
    await actionTokenRepository.create({
      _userId: user._id,
      token,
      type: ActionTokenTypeEnum.EMAIL_VERIFICATION,
    });
    await emailService.sendEmail(EmailTypeEnum.WELCOME, body.email, {
      name: user.name,
      frontUrl: config.frontUrl,
      actionToken: token,
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
      throw new ApiError("invalid email or password", 400);
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

  public async forgotPassword(body: IForgotPassword): Promise<void> {
    const user = await userRepository.getByEmail(body.email);
    if (!user) return;
    const token = tokenService.generateActionToken(
      {
        userId: user._id,
        role: user.role,
      },
      ActionTokenTypeEnum.FORGOT_PASSWORD,
    );
    await actionTokenRepository.create({
      _userId: user._id,
      token,
      type: ActionTokenTypeEnum.FORGOT_PASSWORD,
    });
    await emailService.sendEmail(EmailTypeEnum.FORGOT_PASSWORD, body.email, {
      name: user.name,
      frontUrl: config.frontUrl,
      actionToken: token,
    });
  }

  public async SetForgotPassword(
    payload: ITokenPayload,
    body: ISetForgotPassword,
    actionToken: string,
  ): Promise<void> {
    const password = await passwordService.hashPassword(body.password);
    const passwords = await passwordRepository.findById(payload.userId);
    for (const item of passwords) {
      const doesPasswordExist = await passwordService.comparePassword(
        body.password,
        item.password,
      );
      if (doesPasswordExist) {
        throw new ApiError("Your new password has to be unique", 409);
      }
    }
    await passwordRepository.create({
      _userId: payload.userId,
      password,
    });
    await userRepository.updateMe(payload.userId, { password });

    await Promise.all([
      actionTokenRepository.deleteByParams({ token: actionToken }),
      tokenRepository.deleteAll(payload.userId),
    ]);
  }

  public async verifyEmail(
    payload: ITokenPayload,
    actionToken: string,
  ): Promise<void> {
    await userRepository.updateMe(payload.userId, {
      isVerified: true,
    });
    await actionTokenRepository.deleteByParams({ token: actionToken });
  }

  public async changePassword(
    body: IChangePassword,
    payload: ITokenPayload,
  ): Promise<void> {
    const user = await userRepository.getById(payload.userId);
    const isPasswordCorrect = await passwordService.comparePassword(
      body.oldPassword,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Password is incorrect", 400);
    }
    const password = await passwordService.hashPassword(body.newPassword);
    const passwords = await passwordRepository.findById(payload.userId);
    for (const item of passwords) {
      const doesPasswordExist = await passwordService.comparePassword(
        body.newPassword,
        item.password,
      );
      if (doesPasswordExist) {
        throw new ApiError("Your new password has to be unique", 409);
      }
    }
    await passwordRepository.create({
      _userId: payload.userId,
      password,
    });
    await userRepository.updateMe(payload.userId, { password });
    await tokenRepository.deleteAll(payload.userId);
  }
}

export const authService = new AuthService();
