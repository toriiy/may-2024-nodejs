import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUserIncomplete } from "../interfaces/user.interface";
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
      res.json(result);
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
}

export const authController = new AuthController();
