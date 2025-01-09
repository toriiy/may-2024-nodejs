import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import {
  IChangePassword,
  IForgotPassword,
  ISetForgotPassword,
  IUserIncomplete,
} from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IUserIncomplete;
      const result = await authService.register(body);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as Partial<IUserIncomplete>;
      const result = await authService.login(body);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const refreshTokenPayload = req.res.locals
        .refreshTokenPayload as ITokenPayload;
      const refreshToken = req.res.locals.refreshToken as string;
      const result = await authService.refresh(
        refreshTokenPayload,
        refreshToken,
      );
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.res.locals.accessToken as string;
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      await authService.logout(accessToken, tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async logoutAll(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      await authService.logoutAll(tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body as IForgotPassword;
      await authService.forgotPassword(body);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async SetForgotPassword(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const payload = req.res.locals.payload as ITokenPayload;
      const body = req.body as ISetForgotPassword;
      const actionToken = req.res.locals.actionToken as string;
      await authService.SetForgotPassword(payload, body, actionToken);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async verifyEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.payload as ITokenPayload;
      const actionToken = req.res.locals.actionToken as string;
      await authService.verifyEmail(payload, actionToken);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const payload = req.res.locals.tokenPayload as ITokenPayload;
      const body = req.body as IChangePassword;
      await authService.changePassword(body, payload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
