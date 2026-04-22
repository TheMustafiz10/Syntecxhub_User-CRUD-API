# User CRUD API

A production-style REST API built with Node.js, Express, and MongoDB for managing users with validation, filtering, pagination, and centralized error handling.

## Features

- Create, read, update, and delete users (CRUD)
- Input validation using Joi
- MongoDB schema validation using Mongoose
- Password hashing with bcryptjs before save
- Pagination, filtering, and search on user listing
- Structured error responses with global error middleware
- Health check endpoint

## Tech Stack

- Node.js
- Express 5
- MongoDB + Mongoose
- Joi
- bcryptjs
- dotenv
- cors

## Project Structure

```text
user-CRUD-API/
├─ package.json
├─ README.md
├─ server.js
└─ src/
	 ├─ app.js
	 ├─ config/
	 │  └─ db.js
	 ├─ controllers/
	 │  └─ userController.js
	 ├─ middleware/
	 │  ├─ errorHandler.js
	 │  └─ validateUser.js
	 ├─ models/
	 │  └─ User.js
	 ├─ routes/
	 │  └─ userRoutes.js
	 └─ utils/
			└─ validationSchemas.js
```

## Getting Started

### 1. Clone and install

```bash
git clone <your-repository-url>
cd user-CRUD-API
npm install
```

### 2. Create environment file

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/syntecxhub_user_crud_api
NODE_ENV=development
```

### 3. Run the server

```bash
npm start
```

Server will run at:

```text
http://localhost:5000
```

## API Endpoints

Base route:

```text
/api/users
```

### Health Check

- Method: `GET`
- URL: `/api/health`

### Create User

- Method: `POST`
- URL: `/api/users`

Request body example:

```json
{
	"name": "Alice Johnson",
	"email": "alice@example.com",
	"password": "secret123",
	"age": 25,
	"role": "user",
	"phoneNumber": "+91 9876543210",
	"address": {
		"street": "12 Main St",
		"city": "Mumbai",
		"country": "India",
		"zipCode": "400001"
	}
}
```

### Get All Users

- Method: `GET`
- URL: `/api/users`
- Query parameters:
	- `page` (default: 1)
	- `limit` (default: 10)
	- `role`
	- `isActive` (`true` or `false`)
	- `minAge`
	- `maxAge`
	- `search` (matches name or email)

Example:

```text
GET /api/users?page=1&limit=5&role=user&minAge=18&search=alice
```

### Get User By ID

- Method: `GET`
- URL: `/api/users/:id`

### Update User

- Method: `PUT`
- URL: `/api/users/:id`

Request body example:

```json
{
	"name": "Alice Updated",
	"age": 27,
	"isActive": true
}
```

### Delete User

- Method: `DELETE`
- URL: `/api/users/:id`

## Validation Rules

### Create User

- `name`: required, string, 2-50 chars
- `email`: required, valid email, unique
- `password`: required, minimum 6 chars
- `age`: optional, number, minimum 1, maximum 150
- `role`: optional, one of `user`, `admin`
- `phoneNumber`: optional, valid phone pattern
- `address`: optional object

### Update User

- Same as create where applicable, all optional
- `isActive`: optional boolean
- `age` must be greater than 0

## Error Response Format

When a request fails, the API returns:

```json
{
	"success": false,
	"message": "Error message"
}
```

In development mode (`NODE_ENV=development`), stack trace may also be included.

## NPM Scripts

- `npm start` - start server with Node

## Notes

- Password is hashed before saving user data.
- Password is excluded from API output.
- Duplicate email creation returns status `409`.
- Invalid ObjectId format is rejected at route-level validation.
