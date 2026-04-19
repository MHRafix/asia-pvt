# Asia Tours API Documentation

Complete REST API documentation for the Asia Tours travel booking platform.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Most API endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained from the `/auth/login` or `/auth/register` endpoints.

---

## Authentication Endpoints

### Register User

**Endpoint:** `POST /api/auth/register`

**Description:** Create a new user account

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "phone": "+1234567890"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "user"
    }
  }
}
```

**Error (409 Conflict):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### Login User

**Endpoint:** `POST /api/auth/login`

**Description:** Authenticate user and get JWT token

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "+1234567890",
      "role": "user",
      "profileImage": null
    }
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

## Destinations Endpoints

### Get All Destinations

**Endpoint:** `GET /api/destinations`

**Description:** Retrieve all destinations with pagination and filtering

**Query Parameters:**
- `country` (optional) - Filter by country name (case-insensitive)
- `skip` (optional, default: 0) - Number of records to skip
- `limit` (optional, default: 10) - Number of records to return

**Example:**
```
GET /api/destinations?country=Japan&skip=0&limit=10
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Destinations retrieved successfully",
  "data": {
    "destinations": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Tokyo",
        "country": "Japan",
        "description": "Capital of Japan",
        "imageUrl": "https://example.com/tokyo.jpg",
        "attractions": ["Shibuya", "Senso-ji"],
        "bestTimeToVisit": "March-May",
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 25,
      "skip": 0,
      "limit": 10,
      "pages": 3
    }
  }
}
```

---

### Get Destination by ID

**Endpoint:** `GET /api/destinations/:id`

**Description:** Get details of a specific destination

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Destination retrieved successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "Tokyo",
    "country": "Japan",
    "description": "Capital of Japan",
    "imageUrl": "https://example.com/tokyo.jpg",
    "attractions": ["Shibuya", "Senso-ji"],
    "bestTimeToVisit": "March-May",
    "createdAt": "2024-01-15T10:30:00Z",
    "updatedAt": "2024-01-15T10:30:00Z"
  }
}
```

---

### Create Destination (Admin Only)

**Endpoint:** `POST /api/destinations`

**Description:** Create a new destination (Admin only)

**Authentication Required:** Yes (Admin role required)

**Request Body:**
```json
{
  "name": "Paris",
  "country": "France",
  "description": "City of Lights",
  "imageUrl": "https://example.com/paris.jpg",
  "attractions": ["Eiffel Tower", "Louvre", "Notre-Dame"],
  "bestTimeToVisit": "April-June"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Destination created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Paris",
    "country": "France",
    "description": "City of Lights",
    "imageUrl": "https://example.com/paris.jpg",
    "attractions": ["Eiffel Tower", "Louvre", "Notre-Dame"],
    "bestTimeToVisit": "April-June",
    "createdAt": "2024-01-15T11:30:00Z",
    "updatedAt": "2024-01-15T11:30:00Z"
  }
}
```

---

### Update Destination (Admin Only)

**Endpoint:** `PUT /api/destinations/:id`

**Description:** Update an existing destination (Admin only)

**Authentication Required:** Yes (Admin role required)

**Request Body:**
```json
{
  "name": "Paris",
  "description": "The City of Lights",
  "imageUrl": "https://example.com/paris-updated.jpg"
}
```

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Destination updated successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Paris",
    "country": "France",
    "description": "The City of Lights",
    "imageUrl": "https://example.com/paris-updated.jpg",
    "attractions": ["Eiffel Tower", "Louvre", "Notre-Dame"],
    "bestTimeToVisit": "April-June",
    "createdAt": "2024-01-15T11:30:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

---

### Delete Destination (Admin Only)

**Endpoint:** `DELETE /api/destinations/:id`

**Description:** Delete a destination (Admin only)

**Authentication Required:** Yes (Admin role required)

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Destination deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Paris",
    "country": "France",
    "description": "The City of Lights",
    "imageUrl": "https://example.com/paris-updated.jpg",
    "attractions": ["Eiffel Tower", "Louvre", "Notre-Dame"],
    "bestTimeToVisit": "April-June",
    "createdAt": "2024-01-15T11:30:00Z",
    "updatedAt": "2024-01-15T12:00:00Z"
  }
}
```

---

## Travel Packages Endpoints

Similar structure to Destinations. Available endpoints:

- `GET /api/packages` - Get all packages
- `GET /api/packages/:id` - Get package by ID
- `POST /api/packages` - Create package (Admin only)
- `PUT /api/packages/:id` - Update package (Admin only)
- `DELETE /api/packages/:id` - Delete package (Admin only)

**Package Schema:**
```json
{
  "destination": "507f1f77bcf86cd799439011",
  "title": "5-Day Tokyo Adventure",
  "description": "Experience the best of Tokyo",
  "price": 1500,
  "duration": 5,
  "maxParticipants": 20,
  "activities": ["Sightseeing", "Cultural Tour"],
  "inclusions": ["Hotel", "Meals", "Transport"],
  "imageUrl": "https://example.com/package.jpg"
}
```

---

## Bookings Endpoints

### Create Booking

**Endpoint:** `POST /api/bookings`

**Description:** Create a new booking

**Authentication Required:** Yes

**Request Body:**
```json
{
  "package": "507f1f77bcf86cd799439015",
  "travelers": 2,
  "startDate": "2024-06-01",
  "notes": "Special requests"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "message": "Booking created successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439020",
    "user": "507f1f77bcf86cd799439011",
    "package": "507f1f77bcf86cd799439015",
    "travelers": 2,
    "totalPrice": 3000,
    "startDate": "2024-06-01",
    "status": "pending",
    "notes": "Special requests",
    "createdAt": "2024-01-15T13:30:00Z"
  }
}
```

---

### Get All Bookings

**Endpoint:** `GET /api/bookings`

**Description:** Get user's bookings (or all bookings if admin)

**Query Parameters:**
- `status` (optional) - Filter by status (pending, confirmed, completed, cancelled)
- `skip` (optional, default: 0)
- `limit` (optional, default: 10)

---

### Get Booking by ID

**Endpoint:** `GET /api/bookings/:id`

**Description:** Get specific booking details

---

### Update Booking (Admin Only)

**Endpoint:** `PUT /api/bookings/:id`

**Description:** Update booking status or details

---

### Cancel Booking

**Endpoint:** `DELETE /api/bookings/:id`

**Description:** Cancel a booking

---

## Reviews Endpoints

### Get All Reviews

**Endpoint:** `GET /api/reviews`

**Query Parameters:**
- `destination` (optional) - Filter by destination ID
- `rating` (optional) - Filter by minimum rating
- `skip` (optional)
- `limit` (optional)

---

### Create Review

**Endpoint:** `POST /api/reviews`

**Description:** Create a new review

**Authentication Required:** Yes

**Request Body:**
```json
{
  "destination": "507f1f77bcf86cd799439011",
  "rating": 5,
  "title": "Amazing Experience",
  "comment": "Had a wonderful time in Tokyo!"
}
```

---

### Update Review

**Endpoint:** `PUT /api/reviews/:id`

**Description:** Update your review (Author only)

---

### Delete Review

**Endpoint:** `DELETE /api/reviews/:id`

**Description:** Delete a review (Author or Admin)

---

## Users Endpoints (Admin Only)

### Get All Users

**Endpoint:** `GET /api/users`

**Description:** Get all users with pagination

**Authentication Required:** Yes (Admin only)

**Response:**
```json
{
  "success": true,
  "message": "Users retrieved successfully",
  "data": {
    "users": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "role": "user",
        "isActive": true,
        "createdAt": "2024-01-10T10:30:00Z"
      }
    ],
    "pagination": {
      "total": 50,
      "skip": 0,
      "limit": 10,
      "pages": 5
    }
  }
}
```

---

### Get User by ID

**Endpoint:** `GET /api/users/:id`

**Description:** Get specific user details (Admin only)

---

### Update User (Admin Only)

**Endpoint:** `PUT /api/users/:id`

**Description:** Update user information

**Request Body:**
```json
{
  "name": "Jane Doe",
  "phone": "+0987654321",
  "role": "user",
  "isActive": true
}
```

---

### Deactivate User (Admin Only)

**Endpoint:** `DELETE /api/users/:id`

**Description:** Deactivate a user account

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "[{\"field\":\"email\",\"message\":\"Invalid email format\"}]"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Admin access required"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Resource not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Email already registered"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Internal server error"
}
```

---

## Status Codes

- **200** - OK
- **201** - Created
- **400** - Bad Request
- **401** - Unauthorized
- **403** - Forbidden
- **404** - Not Found
- **409** - Conflict
- **500** - Internal Server Error

---

## Testing with cURL

### Register User
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Get Destinations
```bash
curl http://localhost:3000/api/destinations
```

### Create Destination (with token)
```bash
curl -X POST http://localhost:3000/api/destinations \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "name": "Bangkok",
    "country": "Thailand",
    "description": "Land of Smiles",
    "imageUrl": "https://example.com/bangkok.jpg",
    "attractions": ["Grand Palace", "Wat Pho"],
    "bestTimeToVisit": "November-February"
  }'
```

---

## Rate Limiting

Currently, there is no rate limiting. For production, implement rate limiting using middleware like `express-rate-limit`.

---

## Pagination

Endpoints that support pagination use these parameters:
- `skip` - Number of records to skip (default: 0)
- `limit` - Number of records to return (default: 10)

Response includes pagination info:
```json
{
  "pagination": {
    "total": 100,
    "skip": 0,
    "limit": 10,
    "pages": 10
  }
}
```

---

## Support

For issues or questions, please refer to the main README or contact the development team.
