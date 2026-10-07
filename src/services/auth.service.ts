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
        return {
            accessToken,
            id: user.id,
            email: user.email,
            name: user.name
        };
    },

    register: async (email: string, password: string, name: string) => {
        const user = await userService.createUser(email, await hashPassword(password), name);
        const accessToken = jwtLib.signAccessToken(user.id);
        return {
            accessToken,
            id: user.id,
            email: user.email,
            name: user.name
        };
    }
}