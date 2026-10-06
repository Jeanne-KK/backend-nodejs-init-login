import type { User } from "../types/user.types.ts";
import { prisma } from "../lib/prisma";

export const userService = {
    getAll() {
        return prisma.user.findMany();
    }
}