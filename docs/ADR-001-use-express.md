# ADR-001: Use Express.js for the Faculty Management API

## Status

Accepted

## Date

2026-10-06

## Context

The Faculty Management System requires a backend REST API
that supports multiple endpoints, API versioning, validation,
mock data, Swagger documentation, and a layered architecture.

The backend framework should be easy for the group to understand,
develop, test, and maintain.

The group considered several backend frameworks:

- Express.js
- FastAPI
- Django REST Framework
- ASP.NET Core

## Decision

The group decided to use Express.js with Node.js.

## Reasons

Express.js was selected because:

1. The group is familiar with JavaScript.
2. Express.js is lightweight and easy to configure.
3. Express.js supports REST API development.
4. Swagger UI can be integrated easily.
5. Express.js works well with React.
6. It supports the required routes -> services -> data architecture.
7. It is suitable for a mock-data API.
8. It can later be connected to PostgreSQL.

## Architecture

The backend follows:

Routes -> Services -> Data

### Routes

Routes receive HTTP requests and return HTTP responses.

### Services

Services contain the application logic.

### Data

The data layer currently contains mock faculty records.

## Consequences

### Positive

- Easy to learn.
- Easy to maintain.
- Lightweight.
- Good React compatibility.
- Large Node.js ecosystem.
- Easy OpenAPI integration.
- Easy transition to PostgreSQL.

### Negative

- Express does not enforce a specific architecture.
- Validation must be implemented by the development team.
- Error handling must be implemented by the development team.

## Future Changes

The mock data layer can later be replaced with a PostgreSQL
repository without changing the frontend API endpoints.