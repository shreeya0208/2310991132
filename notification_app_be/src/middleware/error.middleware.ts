import { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

export const errorMiddleware = (err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'internal server error';

    logger.error('middleware', `error caught in middleware: ${message}`);

    res.status(statusCode).json({
        success: false,
        message
    });
};
