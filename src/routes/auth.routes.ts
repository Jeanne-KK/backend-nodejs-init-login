import { Router } from "express";
import { authController } from "../controllers/auth.controller";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { loginDto, registerDto } from "../dtos/auth.dto";

const router = Router();

router.post("/login", validate(loginDto), authController.login);
router.post("/register", validate(registerDto), authController.register);
router.get("/me", auth, authController.me);
router.post("/access-token/refresh", authController.refreshAccessToken);
router.post("/logout", authController.logout);

export default router;