import { Router } from "express";

import { userController } from "../controllers/user.controller";

const router = Router();

router.get("/", userController.getList);
router.post("/", userController.create);
router.get("/:userId", userController.getById);
router.delete("/:userId", userController.deleteById);
router.put("/:userId", userController.updateById);

export const userRouter = router;
