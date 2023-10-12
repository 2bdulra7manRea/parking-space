# Parking Space Management Application

This is an application that facilitates the management of parking spaces, allowing users to search for available parking spaces and make reservations.

## Overview

The Parking Space Management Application enables users to search for parking spaces based on their preferences, such as location, availability, amenities, and quality level. Users can also reserve parking spaces if they are available. Additionally, the application provides features for parking space owners or managers to add new parking spaces, update information about existing spaces, and delete spaces from the system.

## Retrieve Information with Filters

Users can retrieve parking spaces based on specific filters in their search queries. Here are some examples:

- Retrieve parking spaces in a specific location or city.
- Retrieve parking spaces with specific amenities, such as covered parking or enhanced security.
- Retrieve parking spaces with a certain quality level.

## Updating Parking Space Information

When updating parking space information, please note that the quality level of a parking space is automatically calculated and assigned by the system based on various factors. Therefore, it cannot be directly updated by users. The quality level value will be determined by the system.

## Technologies Used

- Node.js
- Express
- TypeScript
- MySQL
- TypeORM
- Docker Compose
- Swagger

## Features

1. Consistent and user-friendly responses for all API endpoints.
2. Comprehensive error handling for API endpoints, with custom exception classes to provide additional information.
3. API documentation using Swagger.
4. Implementation of a builder design pattern for filter queries and a simple routing system using Express.
5. Application architecture based on the Layer Architecture pattern, utilizing the repository pattern for the storage layer, DTO pattern for request bodies, and Transaction Script pattern for handling operations.
6. Utilization of dependency injection techniques in TypeScript to inject services and repositories.
7. Pagination techniques for filtering and retrieving lists, with a default limit of 5 items.
8. Database validation and constraints at the storage layer (MySQL) to ensure data integrity, along with additional application-level validation in middleware to validate inputs before processing.
9. Docker Compose for easy deployment of the Node server with the MySQL database and MySQL admin dashboard.
10. Consistent naming conventions, such as using camel case for databases and files, and kebab case for folders.
11. Integration of logging tools, such as Winston and Morgan, for efficient log management.

## Endpoints

- POST /parking-space/new
- GET /parking-space/list/:managerId
- GET /parking-space/:id
- PATCH /parking-space/:managerId/:id
- PATCH /parking-space/reservation/:id
- DELETE /parking-space/:managerId/:id

Before attempting to add a new parking space, please ensure that you have the necessary authorization and permissions.

## Swagger Documentation

To access the API documentation, visit:
GET /docs

## MySQL Admin Panel

To access the MySQL admin panel, follow these steps:

1. Visit:
   GET /8080

2. Enter the following credentials:
   - Username: root
   - Password: 123
   - Database: parking_space

## Database

### Parking Space Table

- id: integer
- location: string
- availability: integer
- capacity: integer
- rate: decimal
- amenities: string (comma-separated values)
- managerBy: integer (foreign key to Manager)
- level: string
- levelNum: string

### Manager Table

- id: integer
- username: string

### User Table

- id: integer
- username: string

### Parking Reservation Table

- id: integer
- userId: integer (foreign key to User)
- parkingSpaceId: integer (foreign key to Parking Space)
- reservationDateTime: datetime
- startTime: datetime
- endTime: datetime
- status: string

## Future Improvements

If there is more time available, the following enhancements can be made to the application:

1. Adding more interfaces and types, and leveraging TypeScript decorators for improved type safety and code organization.
2. Implementing database migrations for easier management of database schema changes.
3. Adding a caching layer using technologies like Redis to improve performance.
4. Increasing test coverage by adding more test cases to cover edge cases and potential error scenarios.
5. Integrating monitoring tools, such as Grafana, to track and analyze performance metrics and response times.
6. Implementing authentication and authorization using JWT for secure access to the application's endpoints.
7. Further enhancing code organization and maintainability by incorporating additional design patterns, such as the Repository pattern or Dependency Injection containers.

## Installation

1. Start the Node.js server: `npm start`
2. Run tests: `npm run test`
3. Build the Node.js server image: `docker build .`
4. Run all services using Docker Compose: `docker-compose up`

## Running the Node.js Server

By default, the Node.js server runs on port 4000. You can modify the port configuration as needed.
