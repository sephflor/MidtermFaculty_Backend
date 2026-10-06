const app = require("./app");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("========================================");
  console.log(" Faculty Management System API");
  console.log("========================================");
  console.log(
    `Server:  http://localhost:${PORT}`
  );
  console.log(
    `Swagger: http://localhost:${PORT}/docs`
  );
  console.log(
    `Health:  http://localhost:${PORT}/api/v1/health`
  );
  console.log("========================================");
});