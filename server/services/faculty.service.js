const facultyData = require("../data/faculty.data");

// Get all faculty
function getAllFaculty() {
  return facultyData;
}

// Get faculty by ID
function getFacultyById(id) {
  return facultyData.find((faculty) => faculty.id === id);
}

// Create faculty
function createFaculty(data) {
  const newId =
    facultyData.length > 0
      ? Math.max(...facultyData.map((faculty) => faculty.id)) + 1
      : 1;

  const now = new Date().toISOString();

  const newFaculty = {
    id: newId,
    employeeId: data.employeeId,
    firstName: data.firstName,
    lastName: data.lastName,
    middleName: data.middleName || "",
    email: data.email,
    phone: data.phone || "",
    department: data.department,
    position: data.position,
    employmentStatus: data.employmentStatus,
    specialization: data.specialization || "",
    dateHired: data.dateHired,
    createdAt: now,
    updatedAt: now
  };

  facultyData.push(newFaculty);

  return newFaculty;
}

// Update faculty
function updateFaculty(id, data) {
  const faculty = getFacultyById(id);

  if (!faculty) {
    return null;
  }

  faculty.employeeId = data.employeeId;
  faculty.firstName = data.firstName;
  faculty.lastName = data.lastName;
  faculty.middleName = data.middleName || "";
  faculty.email = data.email;
  faculty.phone = data.phone || "";
  faculty.department = data.department;
  faculty.position = data.position;
  faculty.employmentStatus = data.employmentStatus;
  faculty.specialization = data.specialization || "";
  faculty.dateHired = data.dateHired;
  faculty.updatedAt = new Date().toISOString();

  return faculty;
}

// Delete faculty
function deleteFaculty(id) {
  const index = facultyData.findIndex(
    (faculty) => faculty.id === id
  );

  if (index === -1) {
    return null;
  }

  const deletedFaculty = facultyData[index];

  facultyData.splice(index, 1);

  return deletedFaculty;
}

module.exports = {
  getAllFaculty,
  getFacultyById,
  createFaculty,
  updateFaculty,
  deleteFaculty
};