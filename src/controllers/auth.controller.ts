import { NextFunction, Request, Response } from "express";

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
      const body = req.body as any;
      const result = await authService.login(body);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async re() {}
}

export const authController = new AuthController();
