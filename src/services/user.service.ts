import { prisma } from "../lib/prisma";

export const userService = {
    getUserByEmailForAuth(email: string) {
        return prisma.user.findUnique({
            where: { email }
        });
    },

    createUser(email: string, passwordHash: string, name: string) {
        return prisma.user.create({
            data: { email, password: passwordHash, name }
        });
    },

    getUserById(id: number) {
        return prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
            }
        });
    },

    createRefreshToken(userId: number, refreshTokenHash: string) {
        return prisma.refreshToken.create({
            data: { userId, tokenHash: refreshTokenHash, expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7) }
        });
    },

    getRefreshTokenByHash(refreshTokenHash: string) {
        return prisma.refreshToken.findUnique({
            where: { tokenHash: refreshTokenHash }
        });
    },

    deleteRefreshTokenByHash(refreshTokenHash: string) {
        return prisma.refreshToken.deleteMany({
            where: { tokenHash: refreshTokenHash }
        });
    }
}