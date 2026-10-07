import { Response, Request, CookieOptions } from "express";

const COOKIE_NAME = "token";

const base: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    sameSite: "strict",
    path: "/",
};

export const setAuthCookie = (res: Response, token: string) => {
    res.cookie(COOKIE_NAME, token, base)
}

export const clearAuthCookie = (res: Response) => {
    res.clearCookie(COOKIE_NAME, base)
}

export const getAuthCookie = (req: Request): string | undefined => {
    return req.cookies?.[COOKIE_NAME];
}