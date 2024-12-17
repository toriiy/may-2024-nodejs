import { NextFunction, Request, Response } from "express";

import { IUserIncomplete } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await userService.getList();
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.body as IUserIncomplete;
      const result = await userService.create(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const result = await userService.getById(userId);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      await userService.deleteById(userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.params.userId;
      const body = req.body as IUserIncomplete;
      const user = await userService.updateById(userId, body);
      res.status(201).json(user);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
