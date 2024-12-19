import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();
router.post(
  "/register",
  commonMiddleware.isBodyValid("create"),
  authController.register,
);

router.post("/login", commonMiddleware.isLoginBodyValid, authController.login);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

export const authRouter = router;
