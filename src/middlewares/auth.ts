import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../errors/AppError";
import { jwtLib } from "../lib/jwt";
import jwt from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const header = req.headers.authorization
    if(!header || !header.startsWith('Bearer ')) {
        throw new UnauthorizedError('Unauthorized');
    }
    const token = header.split(' ')[1];
    try {
        const decoded = jwtLib.verifyAccessToken(token);
        req.userId = Number(decoded.sub);
        next();
    } catch (error) {
        if(error instanceof jwt.TokenExpiredError) {
            throw new UnauthorizedError('Token expired');
        }
        throw new UnauthorizedError('Unauthorized');
    }
}