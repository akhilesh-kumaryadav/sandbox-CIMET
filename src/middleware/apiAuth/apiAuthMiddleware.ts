import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';

import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY: string = process.env.API_KEY || '';

export const apiAuthMiddleware = (req: Request, _res: Response, next: NextFunction): void => {
    const apiKey = req.headers['api-key'];

    if (!apiKey || (apiKey != API_KEY)) {
        next(createHttpError(401, 'Unauthorized'));
        return;
    }

    next();
};
