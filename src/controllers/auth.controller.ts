import { Request, Response } from "express";
import { authService } from "../services/auth.service";

export const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        res.json(user);
    },

    register: async (req: Request, res: Response) => {
        const { email, password, name } = req.body;
        const user = await authService.register(email, password, name);
        res.json(user);
    }
}