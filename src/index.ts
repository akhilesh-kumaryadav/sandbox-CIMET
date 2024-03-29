import express, { Request, Response, NextFunction } from "express";
import {graphqlHTTP} from "express-graphql";

import rest from "./rest";
import { apiAuthMiddleware } from './middleware/apiAuthMiddleware';
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/graphql", graphqlHTTP({
  schema : schema,
  rootValue : resolvers
}));

app.get("/", function (_req, res) {
  res.json({ data: "Read the README.md!" });
});

app.use(apiAuthMiddleware);

// Middleware for logging incoming requests
const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = new Date().getTime();
  res.on('finish', () => {  // Listen for the finish event to log once the response is done
    const duration = new Date().getTime() - start;
    console.log(`${req.method} ${req.path} - Status: ${res.statusCode} - Time: ${duration}ms`);
  });
  next();
};

app.use(requestLogger);
app.use("/rest", rest);

// Error handling middleware
app.use((err: Error, req: Request, res: Response) => {
  console.error(err.stack);  // Log the stack trace for debugging
  const status = res.statusCode !== 200 ? res.statusCode : 500;
  const message = err.message || 'Internal Server Error';
  console.log(`${req.method} ${req.path} - Error: ${message} - Status: ${status} - Time: ${new Date().toISOString()}`);
  res.status(status).send(message);
});

export const createApp = (port = 3000) => {
  app.listen(port, function () {
    console.log("Example app listening on port ! " + port);
  });
  return app;
};
