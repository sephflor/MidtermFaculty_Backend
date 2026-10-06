const express = require("express");

const facultyService = require("../services/faculty.service");

const router = express.Router();

/*
    Problem Details Response
*/
function problemDetails(
  res,
  status,
  title,
  detail,
  instance
) {
  return res
    .status(status)
    .type("application/problem+json")
    .json({
      type: `https://example.com/problems/${status}`,
      title: title,
      status: status,
      detail: detail,
      instance: instance
    });
}

/*
    Validate Faculty Data
*/
function validateFaculty(data) {
  const errors = [];

  if (!data.employeeId) {
    errors.push("employeeId is required.");
  }

  if (!data.firstName) {
    errors.push("firstName is required.");
  }

  if (!data.lastName) {
    errors.push("lastName is required.");
  }

  if (!data.email) {
    errors.push("email is required.");
  } else {
    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(data.email)) {
      errors.push(
        "email must be a valid email address."
      );
    }
  }

  if (!data.department) {
    errors.push("department is required.");
  }

  if (!data.position) {
    errors.push("position is required.");
  }

  if (!data.employmentStatus) {
    errors.push("employmentStatus is required.");
  }

  if (!data.dateHired) {
    errors.push("dateHired is required.");
  }

  return errors;
}

/*
    GET ALL FACULTY
    GET /api/v1/faculty
*/
router.get("/", (req, res) => {
  const faculty =
    facultyService.getAllFaculty();

  res.status(200).json({
    data: faculty,
    count: faculty.length
  });
});

/*
    GET FACULTY BY ID
    GET /api/v1/faculty/:id
*/
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  // Check ID
  if (!Number.isInteger(id) || id <= 0) {
    return problemDetails(
      res,
      400,
      "Invalid Faculty ID",
      "The faculty ID must be a positive integer.",
      req.originalUrl
    );
  }

  const faculty =
    facultyService.getFacultyById(id);

  // Faculty not found
  if (!faculty) {
    return problemDetails(
      res,
      404,
      "Faculty Not Found",
      `Faculty with ID ${id} was not found.`,
      req.originalUrl
    );
  }

  res.status(200).json({
    data: faculty
  });
});

/*
    CREATE FACULTY
    POST /api/v1/faculty
*/
router.post("/", (req, res) => {
  const errors = validateFaculty(req.body);

  // Bad input
  if (errors.length > 0) {
    return problemDetails(
      res,
      400,
      "Invalid Faculty Data",
      errors.join(" "),
      req.originalUrl
    );
  }

  // Check duplicate employee ID
  const existingFaculty =
    facultyService
      .getAllFaculty()
      .find(
        (faculty) =>
          faculty.employeeId ===
          req.body.employeeId
      );

  if (existingFaculty) {
    return problemDetails(
      res,
      400,
      "Duplicate Employee ID",
      "A faculty member with this employeeId already exists.",
      req.originalUrl
    );
  }

  const newFaculty =
    facultyService.createFaculty(req.body);

  res.status(201).json({
    data: newFaculty
  });
});

/*
    UPDATE FACULTY
    PUT /api/v1/faculty/:id
*/
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);

  // Validate ID
  if (!Number.isInteger(id) || id <= 0) {
    return problemDetails(
      res,
      400,
      "Invalid Faculty ID",
      "The faculty ID must be a positive integer.",
      req.originalUrl
    );
  }

  // Check existing faculty
  const existingFaculty =
    facultyService.getFacultyById(id);

  if (!existingFaculty) {
    return problemDetails(
      res,
      404,
      "Faculty Not Found",
      `Faculty with ID ${id} was not found.`,
      req.originalUrl
    );
  }

  // Validate input
  const errors = validateFaculty(req.body);

  if (errors.length > 0) {
    return problemDetails(
      res,
      400,
      "Invalid Faculty Data",
      errors.join(" "),
      req.originalUrl
    );
  }

  const updatedFaculty =
    facultyService.updateFaculty(
      id,
      req.body
    );

  res.status(200).json({
    data: updatedFaculty
  });
});

/*
    DELETE FACULTY
    DELETE /api/v1/faculty/:id
*/
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  // Validate ID
  if (!Number.isInteger(id) || id <= 0) {
    return problemDetails(
      res,
      400,
      "Invalid Faculty ID",
      "The faculty ID must be a positive integer.",
      req.originalUrl
    );
  }

  const deletedFaculty =
    facultyService.deleteFaculty(id);

  // Faculty not found
  if (!deletedFaculty) {
    return problemDetails(
      res,
      404,
      "Faculty Not Found",
      `Faculty with ID ${id} was not found.`,
      req.originalUrl
    );
  }

  res.status(200).json({
    message: "Faculty deleted successfully.",
    data: deletedFaculty
  });
});

module.exports = router;