// src/errors/AppError.ts
export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.isOperational = true;

        // จำเป็นเมื่อ target เป็น ES5 เพื่อให้ instanceof ทำงานถูกต้อง
        Object.setPrototypeOf(this, new.target.prototype);
        Error.captureStackTrace(this, this.constructor);
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Not found') {
        super(message, 404);
    }
}

export class ConflictError extends AppError {
    constructor(message = 'Conflict') {
        super(message, 409);
    }
}

export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized') {
        super(message, 401);
    }
}