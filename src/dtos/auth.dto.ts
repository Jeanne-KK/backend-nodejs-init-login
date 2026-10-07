import { z } from "zod";

export const loginDto = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(4, "Password is required"),
});

export const registerDto = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(4, "Password is required"),
    name: z.string().min(1, "Name is required"),
});

export type LoginDto = z.infer<typeof loginDto>;
export type RegisterDto = z.infer<typeof registerDto>;