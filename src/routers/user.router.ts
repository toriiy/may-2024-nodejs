import { Router } from "express";

import { userController } from "../controllers/user.controller";
import { userValidator } from "../joi-validators/joi.validator";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";

const router = Router();

router.get("/", userController.getList);

router.get("/me", authMiddleware.checkAccessToken, userController.getMe);

router.delete("/me", authMiddleware.checkAccessToken, userController.deleteMe);

router.put(
  "/me",
  authMiddleware.checkAccessToken,
  commonMiddleware.isBodyValid(userValidator.schemaUpdate),
  userController.updateMe,
);

router.post(
  "/me/avatar",
  authMiddleware.checkAccessToken,
  // fileMiddleware.isFileValid(),
  userController.uploadAvatar,
);

router.get(
  "/:userId",
  commonMiddleware.isIdValid("userId"),
  userController.getById,
);

export const userRouter = router;
