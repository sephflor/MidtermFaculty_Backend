const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");

const facultyRoutes = require("./routes/faculty.routes");
const healthRoutes = require("./routes/health.routes");

const app = express();

/*
    Middleware
*/
app.use(cors());

app.use(express.json());

/*
    OpenAPI Document
*/
const openapiPath = path.join(
  __dirname,
  "openapi.yaml"
);

const openapiDocument =
  YAML.load(openapiPath);

/*
    Swagger UI
*/
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(openapiDocument)
);

/*
    API Routes
*/

app.use(
  "/api/v1/health",
  healthRoutes
);

app.use(
  "/api/v1/faculty",
  facultyRoutes
);

/*
    Unknown Route
*/
app.use((req, res) => {
  res
    .status(404)
    .type("application/problem+json")
    .json({
      type: "https://example.com/problems/404",
      title: "Route Not Found",
      status: 404,
      detail: `The requested route ${req.originalUrl} does not exist.`,
      instance: req.originalUrl
    });
});

/*
    Global Error Handler
*/
app.use(
  (err, req, res, next) => {
    console.error(err);

    res
      .status(500)
      .type("application/problem+json")
      .json({
        type: "https://example.com/problems/500",
        title: "Internal Server Error",
        status: 500,
        detail:
          "An unexpected server error occurred.",
        instance: req.originalUrl
      });
  }
);

module.exports = app;