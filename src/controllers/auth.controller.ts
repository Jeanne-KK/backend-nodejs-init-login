import { Request, Response } from "express";
import { authService } from "../services/auth.service";
import { clearAuthCookie, getAuthCookie, setAuthCookie } from "../lib/cookie";
import { UnauthorizedError } from "../errors/AppError";

export const authController = {
    login: async (req: Request, res: Response) => {
        const { email, password } = req.body;
        const user = await authService.login(email, password);
        setAuthCookie(res, user.refreshToken);
        res.json({
            accessToken: user.accessToken,
            id: user.id,
            email: user.email,
            name: user.name
        });
    },

    register: async (req: Request, res: Response) => {
        const { email, password, name } = req.body;
        const user = await authService.register(email, password, name);
        setAuthCookie(res, user.refreshToken);
        res.json({
            accessToken: user.accessToken,
            id: user.id,
            email: user.email,
            name: user.name
        });
    },

    me: async (req: Request, res: Response) => {
        const userId = req.userId;
        if (!userId) {
            throw new UnauthorizedError('Unauthorized');
        }
        const user = await authService.me(userId);
        res.json(user);
    },

    refreshAccessToken: async (req: Request, res: Response) => {
        const refreshTokenFromCookie = getAuthCookie(req);
        if (!refreshTokenFromCookie) {
            throw new UnauthorizedError('Unauthorized');
        }
        const { accessToken } = await authService.refreshAccessToken(refreshTokenFromCookie);
        res.json({ accessToken });
    },

    logout: async (req: Request, res: Response) => {
        const refreshToken = getAuthCookie(req);
        if (refreshToken) {
            await authService.logout(refreshToken);
        }
        clearAuthCookie(res);
        res.status(204).send();
    }
}