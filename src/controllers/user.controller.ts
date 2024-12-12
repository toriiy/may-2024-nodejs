import { NextFunction, Request, Response } from "express";

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
      const user = req.body;
      const result = await userService.create(user);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params;
      const result = await userService.getById(params);
      res.json(result);
    } catch (e) {
      next(e);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params;
      await userService.deleteById(params);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateById(req: Request, res: Response, next: NextFunction) {
    try {
      const params = req.params;
      const body = req.body;
      await userService.updateById(params, body);
      res.sendStatus(201);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
