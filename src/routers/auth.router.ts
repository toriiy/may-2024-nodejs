import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();
router.post(
  "/register",
  commonMiddleware.isBodyValid("create"),
  authController.register,
);
router.post("/login", authController.login);

export const authRouter = router;
