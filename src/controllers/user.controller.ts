import type { Request, Response } from "express";
import { userService } from "../services/user.service";

export const userController = {
    getAll: async (req: Request, res: Response) => {
        const users = await userService.getAll();
        res.json(users);
    }
}