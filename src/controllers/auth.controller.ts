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
      const result = await authService.refresh(refreshTokenPayload);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
