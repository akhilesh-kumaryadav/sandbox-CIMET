import { Request, Response, NextFunction } from 'express';

export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = new Date().getTime();
  res.on('finish', () => {  // Listen for the finish event to log once the response is done
    const duration = new Date().getTime() - start;
    console.log(`${req.method} ${req.path} - Status: ${res.statusCode} - Time: ${duration}ms`);
  });
  next();
};

export const requestErrorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);  // Log the stack trace for debugging
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'Internal Server Error';
  console.log(`${req.method} ${req.path} - Error: ${message} - Status: ${status} - Time: ${new Date().toISOString()}`);
  next();
  //res.status(status).send(message);
}