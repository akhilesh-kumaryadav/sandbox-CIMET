import express from "express";
import {graphqlHTTP} from "express-graphql";

import rest from "./rest";
import { apiAuthMiddleware } from './middleware/apiAuth/apiAuthMiddleware';
import schema from "./graphql/schema";
import resolvers from "./graphql/resolvers";
import {requestLogger, requestErrorLogger} from "./middleware/Logging/requestLogger"

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Middleware for API authentication
app.use(apiAuthMiddleware);

// Middleware for logging incoming requests
app.use(requestLogger)

// API routes
app.use("/rest", rest);

// GraphQL operation route
app.use("/graphql", graphqlHTTP({
  schema : schema,
  rootValue : resolvers
}));

// Root route
app.get("/", function (_req, res) {
  res.json({ data: "Read the README.md!" });
});

// Error handling middleware
app.use(requestErrorLogger);

// Creation of Express App
export const createApp = (port = 3000) => {
  app.listen(port, function () {
    console.log("Example app listening on port ! " + port);
  });
  return app;
};
