import jwt from "jsonwebtoken";
import { env } from "../config/env";
import crypto from "crypto";

export const jwtLib = {
    signAccessToken: (userId: number) => {
        return jwt.sign({ sub: String(userId) }, env.accessSecret, { expiresIn: env.accessExpires, algorithm: "HS256" });
    },
    verifyAccessToken: (token: string) => {
        return jwt.verify(token, env.accessSecret, { algorithms: ["HS256"] });
    },
    signRefreshToken: (userId: number) => {
        return jwt.sign({ sub: String(userId) }, env.refreshSecret, { expiresIn: env.refreshExpires, algorithm: "HS256" });
    },
    verifyRefreshToken: (token: string) => {
        return jwt.verify(token, env.refreshSecret, { algorithms: ["HS256"] });
    },
    hashToken: (token: string) => {
        return crypto.createHash('sha256').update(token).digest('hex');
    }
}