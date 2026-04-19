# API Documentation

Complete API reference for TravelHub endpoints.

## Base URL

```
http://localhost:3000/api
```

## Authentication

Currently, the API is public. Authentication endpoints should be added following the pattern outlined in the architecture guide.

## Common Response Format

All endpoints return:

```json
{
  "success": true,
  "data": { /* response data */ },
  "message": "Success message"
}
```

Error responses:

```json
{
  "success": false,
  "error": "Error type",
  "message": "Detailed error message"
}
```

## Status Codes

- `200` - OK: Request successful
- `201` - Created: Resource created successfully
- `400` - Bad Request: Invalid input
- `404` - Not Found: Resource not found
- `409` - Conflict: Resource already exists
- `500` - Internal Server Error: Server error

## Destinations Endpoints

### List Destinations

```
GET /destinations
```

**Query Parameters:**
- `skip` (integer): Number of records to skip (default: 0)
- `limit` (integer): Number of records to return (default: 10)
- `country` (string): Filter by country name (case-insensitive)

**Example:**
```
GET /destinations?skip=0&limit=10&country=France
```

**Response:**
```json
{
  "success": true,
  "data": {
    "destinations": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Paris",
        "country": "France",
        "description": "The City of Light",
        "images": ["url1", "url2"],
        "highlights": ["Eiffel Tower", "Louvre"],
        "bestTimeToVisit": "April to June",
        "averageTemperature": "12-20°C",
        "timezone": "CET",
        "currency": "EUR",
        "language": "French",
        "rating": 4.8,
        "reviewCount": 1245,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 250,
      "skip": 0,
      "limit": 10,
      "pages": 25
    }
  }
}
```

### Get Destination

```
GET /destinations/:id
```

**Parameters:**
- `id` (string): MongoDB ObjectId

**Example:**
```
GET /destinations/507f1f77bcf86cd799439011
```

**Response:** Single destination object (same structure as above)

### Create Destination

```
POST /destinations
```

**Request Body:**
```json
{
  "name": "Paris",
  "country": "France",
  "description": "The City of Light",
  "images": ["url1", "url2"],
  "highlights": ["Eiffel Tower", "Louvre"],
  "bestTimeToVisit": "April to June",
  "averageTemperature": "12-20°C",
  "timezone": "CET",
  "currency": "EUR",
  "language": "French"
}
```

**Validation:**
- `name`: Required, must be unique
- `country`: Required
- `description`: Required, min 10 characters
- `images`: Array of strings (optional)
- `highlights`: Array of strings (optional)

**Response:** Created destination object with `201` status

### Update Destination

```
PUT /destinations/:id
```

**Parameters:**
- `id` (string): MongoDB ObjectId

**Request Body:** Any destination field can be updated

**Response:** Updated destination object

### Delete Destination

```
DELETE /destinations/:id
```

**Parameters:**
- `id` (string): MongoDB ObjectId

**Response:**
```json
{
  "success": true,
  "data": null,
  "message": "Destination deleted successfully"
}
```

## Travel Packages Endpoints

### List Packages

```
GET /packages
```

**Query Parameters:**
- `skip` (integer): Number of records to skip (default: 0)
- `limit` (integer): Number of records to return (default: 10)
- `destination` (string): Filter by destination ID
- `minPrice` (number): Minimum price filter
- `maxPrice` (number): Maximum price filter
- `difficulty` (string): Filter by difficulty (Easy, Moderate, Hard)

**Example:**
```
GET /packages?skip=0&limit=10&minPrice=1000&maxPrice=5000&difficulty=Moderate
```

**Response:**
```json
{
  "success": true,
  "data": {
    "packages": [
      {
        "_id": "507f1f77bcf86cd799439012",
        "name": "Paris 7-Day Experience",
        "description": "Explore the City of Light",
        "destination": {
          "_id": "507f1f77bcf86cd799439011",
          "name": "Paris",
          "country": "France"
        },
        "price": 2500,
        "discountedPrice": 2000,
        "duration": 7,
        "images": ["url1"],
        "inclusions": ["Hotel", "Meals", "Tours"],
        "exclusions": ["Flights", "Travel Insurance"],
        "maxGroupSize": 20,
        "minGroupSize": 2,
        "difficulty": "Easy",
        "itinerary": [
          {
            "day": 1,
            "title": "Arrival",
            "description": "Arrive in Paris"
          }
        ],
        "availableDates": ["2024-06-01T00:00:00Z"],
        "rating": 4.7,
        "reviewCount": 342,
        "createdAt": "2024-01-01T00:00:00Z",
        "updatedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "pagination": {
      "total": 85,
      "skip": 0,
      "limit": 10,
      "pages": 9
    }
  }
}
```

### Get Package

```
GET /packages/:id
```

**Parameters:**
- `id` (string): MongoDB ObjectId

**Response:** Single package object

### Create Package

```
POST /packages
```

**Request Body:**
```json
{
  "name": "Paris 7-Day Experience",
  "description": "Explore the City of Light",
  "destination": "507f1f77bcf86cd799439011",
  "price": 2500,
  "discountedPrice": 2000,
  "duration": 7,
  "images": ["url1"],
  "inclusions": ["Hotel", "Meals"],
  "exclusions": ["Flights"],
  "maxGroupSize": 20,
  "minGroupSize": 2,
  "difficulty": "Easy",
  "itinerary": [
    {
      "day": 1,
      "title": "Arrival",
      "description": "Arrive in Paris"
    }
  ],
  "availableDates": ["2024-06-01T00:00:00Z"]
}
```

**Validation:**
- `name`: Required
- `description`: Required, min 10 characters
- `destination`: Required, must be valid ObjectId
- `price`: Required, min 0
- `duration`: Required, min 1
- `difficulty`: Must be Easy, Moderate, or Hard

**Response:** Created package object with `201` status

## Error Examples

### Validation Error

```json
{
  "success": false,
  "error": "Validation failed",
  "message": "[{\"field\":\"name\",\"message\":\"Name is required\"}]"
}
```

### Not Found

```json
{
  "success": false,
  "error": "Destination not found"
}
```

### Conflict (Duplicate)

```json
{
  "success": false,
  "error": "Destination with this name already exists"
}
```

## Code Examples

### JavaScript/Fetch

```javascript
// List destinations
const response = await fetch('http://localhost:3000/api/destinations?skip=0&limit=10');
const data = await response.json();

// Create destination
const newDestination = await fetch('http://localhost:3000/api/destinations', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Rome',
    country: 'Italy',
    description: 'The Eternal City'
  })
});
```

### Using API Client

```typescript
import { apiClient } from '@/lib/api-client';
import type { Destination } from '@/lib/types';

// List destinations
const response = await apiClient.get<{ destinations: Destination[] }>('/destinations', {
  skip: 0,
  limit: 10
});

// Create destination
const newDest = await apiClient.post<Destination>('/destinations', {
  name: 'Rome',
  country: 'Italy',
  description: 'The Eternal City'
});
```

## Rate Limiting

Currently not implemented. Consider adding rate limiting for production deployment.

## CORS

Configure CORS headers in production environment.

## Pagination

All list endpoints support pagination:

- `skip`: Starting position (0-indexed)
- `limit`: Number of records per page
- Response includes `pagination` object with:
  - `total`: Total number of records
  - `skip`: Current skip value
  - `limit`: Current limit value
  - `pages`: Total number of pages

## Filtering & Sorting

See individual endpoint documentation for supported filters.

## Future Endpoints

- User authentication and management
- Booking creation and management
- Reviews and ratings
- Search across all content
- Admin analytics
