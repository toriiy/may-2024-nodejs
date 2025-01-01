import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ActionTokenTypeEnum } from "../enums/action-token-type.enum";
import { userValidator } from "../joi-validators/joi.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();
router.post(
  "/register",
  commonMiddleware.isBodyValid(userValidator.schemaCreate),
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

router.post(
  "/password/forgot",
  commonMiddleware.isBodyValid(userValidator.schemaForgotPassword),
  authController.forgotPassword,
);

router.put(
  "/password/forgot",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.FORGOT_PASSWORD),
  commonMiddleware.isBodyValid(userValidator.schemaSetForgotPassword),
  authController.SetForgotPassword,
);

router.put(
  "/password/change",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(userValidator.schemaChangePassword),
  authController.changePassword,
);

router.put(
  "/verify-email",
  authMiddleware.checkActionToken(ActionTokenTypeEnum.EMAIL_VERIFICATION),
  commonMiddleware.isBodyValid(userValidator.schemaVerifyEmail),
  authController.verifyEmail,
);

export const authRouter = router;
