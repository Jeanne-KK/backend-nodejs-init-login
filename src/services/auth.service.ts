import { hashPassword, verifyPassword } from "../lib/crypto";
import { UnauthorizedError } from "../errors/AppError";
import { jwtLib } from "../lib/jwt";
import { userService } from "./user.service";

export const authService = {
    login: async (email: string, password: string) => {
        const user = await userService.getUserByEmailForAuth(email);
        if (!user) {
            throw new UnauthorizedError('Invalid email or password');
        }
        if (!(await verifyPassword(password, user.password))) {
            throw new UnauthorizedError('Invalid email or password');
        }
        const accessToken = jwtLib.signAccessToken(user.id);
        const refreshToken = jwtLib.signRefreshToken(user.id);
        const hashedRefreshToken = jwtLib.hashToken(refreshToken);
        await userService.createRefreshToken(user.id, hashedRefreshToken);
        return {
            accessToken,
            refreshToken,
            id: user.id,
            email: user.email,
            name: user.name
        };
    },

    register: async (email: string, password: string, name: string) => {
        const user = await userService.createUser(email, await hashPassword(password), name);
        const accessToken = jwtLib.signAccessToken(user.id);
        const refreshToken = jwtLib.signRefreshToken(user.id);
        const hashedRefreshToken = jwtLib.hashToken(refreshToken);
        await userService.createRefreshToken(user.id, hashedRefreshToken);
        return {
            accessToken,
            refreshToken,
            id: user.id,
            email: user.email,
            name: user.name
        };
    },

    me: async (userId: number) => {
        const user = await userService.getUserById(userId);
        if (!user) {
            throw new UnauthorizedError('Unauthorized');
        }
        return {
            id: user.id,
            email: user.email,
            name: user.name
        };
    },

    refreshAccessToken: async (refreshTokenFromCookie: string) => {
        let payload: { sub?: string };
        try {
            payload = jwtLib.verifyRefreshToken(refreshTokenFromCookie) as { sub?: string };
        } catch {
            throw new UnauthorizedError('Invalid or expired refresh token');
        }

        const userId = Number(payload.sub);
        if (!userId) {
            throw new UnauthorizedError('Invalid or expired refresh token');
        }

        const hashedRefreshToken = jwtLib.hashToken(refreshTokenFromCookie);
        const stored = await userService.getRefreshTokenByHash(hashedRefreshToken);
        // เช็คว่า refresh token นี้มีอยู่ในฐานข้อมูลหรือไม่ และตรงกับ user นี้หรือไม่
        if (!stored || stored.userId !== userId) {
            throw new UnauthorizedError('Invalid or expired refresh token');
        }
        // เช็คว่า refresh token นี้ยังใช้งานได้หรือไม่
        if (stored.expiresAt < new Date()) {
            await userService.deleteRefreshTokenByHash(hashedRefreshToken);
            throw new UnauthorizedError('Invalid or expired refresh token');
        }

        const user = await userService.getUserById(userId);
        if (!user) {
            throw new UnauthorizedError('Unauthorized');
        }

        const accessToken = jwtLib.signAccessToken(userId);
        return { accessToken };
    },

    logout: async (refreshTokenValue: string) => {
        const hashedRefreshToken = jwtLib.hashToken(refreshTokenValue);
        await userService.deleteRefreshTokenByHash(hashedRefreshToken);
    }
}