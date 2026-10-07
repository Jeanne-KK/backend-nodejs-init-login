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
    }
}