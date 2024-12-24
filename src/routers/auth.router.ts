import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();
router.post(
  "/register",
  commonMiddleware.isBodyValid("create"),
  commonMiddleware.isEmailUnique,
  authController.register,
);

router.post("/login", commonMiddleware.isLoginBodyValid, authController.login);

router.post(
  "/refresh",
  authMiddleware.checkRefreshToken,
  authController.refresh,
);

router.delete(
  "/logout",
  authMiddleware.checkAccessToken,
  authController.logout,
);

router.delete(
  "/logout/all",
  authMiddleware.checkAccessToken,
  authController.logoutAll,
);

export const authRouter = router;
