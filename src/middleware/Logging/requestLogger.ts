import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = new Date().getTime();
  res.on('finish', () => {  // Listen for the finish event to log once the response is done
    const duration = new Date().getTime() - start;
    console.log(`${req.method} ${req.path} - Status: ${res.statusCode} - Time: ${duration}ms`);
  });
  next();
};