import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

const validApiKeys: string[] = ['api_key_1', 'api_key_2'];

export const apiAuthMiddleware = (req: Request, res: Response, next: NextFunction): void => {
    const apiKey = req.headers['api-key'];

    if (!apiKey || !validApiKeys.includes(apiKey as string)) {
        next(createHttpError(401, 'Unauthorized'));
        return;
    }

    next();
};
