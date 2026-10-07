import jwt from "jsonwebtoken";
import crypto from "crypto";
import { env } from "../config/env";

export const jwtLib = {
    signAccessToken: (userId: number) => {
        return jwt.sign({ sub: String(userId) }, env.accessSecret, { expiresIn: env.accessExpires, algorithm: "HS256" });
    },
    verifyAccessToken: (token: string) => {
        return jwt.verify(token, env.accessSecret, { algorithms: ["HS256"] });
    }
}