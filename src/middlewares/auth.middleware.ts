import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { tokenRepository } from "../repositories/token.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public async checkAccessToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("No access token provided", 401);
      }
      const accessToken = header.split("Bearer ")[1];
      if (!accessToken) {
        throw new ApiError("No access token provided", 401);
      }

      const tokenPayload = tokenService.validateToken(accessToken, "access");
      const pair = await tokenRepository.findByParams({ accessToken });
      if (!pair) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.tokenPayload = tokenPayload;
      req.res.locals.accessToken = accessToken;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async checkRefreshToken(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> {
    try {
      const header = req.headers.authorization;
      if (!header) {
        throw new ApiError("No refresh token provided", 401);
      }
      const refreshToken = header.split("Bearer ")[1];
      if (!refreshToken) {
        throw new ApiError("No refresh token provided", 401);
      }
      const tokenPayload = tokenService.validateToken(refreshToken, "refresh");
      const pair = await tokenRepository.findByParams({ refreshToken });
      if (!pair) {
        throw new ApiError("Invalid token", 401);
      }
      req.res.locals.refreshTokenPayload = tokenPayload;
      req.res.locals.refreshToken = refreshToken;
      next();
    } catch (e) {
      next(e);
    }
  }
}

export const authMiddleware = new AuthMiddleware();
