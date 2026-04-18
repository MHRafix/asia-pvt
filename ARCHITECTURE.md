# Architecture Guide

This document outlines the architecture decisions and patterns used in TravelHub.

## Design Principles

1. **Separation of Concerns**: Clear boundaries between layers (API, business logic, presentation)
2. **Type Safety**: Full TypeScript coverage with strict mode enabled
3. **Validation**: Input validation at API boundaries
4. **Error Handling**: Consistent error handling and logging
5. **Reusability**: Components and utilities designed for reuse
6. **Performance**: Optimized queries and caching strategies
7. **Maintainability**: Clear code organization and naming conventions

## Layer Architecture

### Presentation Layer (`/components`)

Responsible for UI rendering and user interactions.

```
components/
├── Header.tsx          # Navigation component
├── Footer.tsx          # Footer component
├── DestinationCard.tsx # Destination display
├── PackageCard.tsx     # Package display
└── ui/                 # shadcn/ui base components
```

**Key Patterns**:
- Client-side components marked with `'use client'`
- Props typed with TypeScript interfaces
- Event handlers for user interactions
- Accessibility support via shadcn/ui

### Business Logic Layer (`/lib`)

Handles data transformation, validation, and utility functions.

```
lib/
├── models/     # Mongoose schemas (data models)
├── api/        # API utilities (response formatting, validation)
├── types/      # TypeScript type definitions
├── db.ts       # Database connection
├── env.ts      # Environment validation
├── api-client.ts # Client-side API wrapper
└── helpers.ts  # Common utility functions
```

**Key Patterns**:
- **Models**: Mongoose schemas with validation rules
- **Validators**: Zod schemas for request validation
- **Response Formatting**: Consistent API response structure
- **Error Classes**: Custom error handling

### Data Access Layer (`/lib/models`)

MongoDB interaction through Mongoose ODM.

```
Mongoose Schema → TypeScript Interface → API Response
```

**Key Patterns**:
- Strong typing with interfaces
- Validation at schema level
- Index optimization for queries
- Proper relationships (references)

### API Layer (`/app/api`)

REST API endpoints following standard HTTP conventions.

```
/api
├── destinations/    # Destination CRUD
│   ├── route.ts     # GET (list), POST (create)
│   └── [id]/route.ts # GET, PUT, DELETE
└── packages/        # Package CRUD
    ├── route.ts
    └── [id]/route.ts
```

**Key Patterns**:
- RESTful resource structure
- Request validation with Zod
- Consistent response format
- Proper HTTP status codes
- Error handling middleware

## Data Flow

### Request Flow (Frontend → Backend)

```
User Input
    ↓
React Component
    ↓
apiClient.post('/api/endpoint', data)
    ↓
Fetch API
    ↓
Next.js Route Handler
    ↓
Zod Validation
    ↓
Database Operation
    ↓
ApiResponse wrapper
    ↓
Component (setState)
    ↓
UI Update
```

### Data Structure Flow

```
Frontend Types (lib/types/)
    ↓
API Request/Response (ApiResponse<T>)
    ↓
Mongoose Model Interface
    ↓
Database Document
```

## Key Files & Their Purposes

### `lib/db.ts`
- MongoDB connection management
- Connection pooling for serverless
- Error logging

### `lib/env.ts`
- Environment variable validation with Zod
- Type-safe env access
- Startup validation

### `lib/api/response.ts`
- `successResponse()`: Wrap successful data
- `errorResponse()`: Wrap errors
- `ApiError` class: Custom error type
- HTTP status constants

### `lib/api/validators.ts`
- Request payload schemas
- Field validation rules
- Error messages

### `lib/api/middleware.ts`
- Request validation helper
- Error handling
- Error formatting

### `lib/api-client.ts`
- Client-side API wrapper
- HTTP methods (GET, POST, PUT, DELETE)
- Error handling

### `lib/helpers.ts`
- `formatPrice()`: Currency formatting
- `formatDate()`: Date formatting
- `generateSlug()`: URL slug generation
- Other utility functions

## Database Schema Relationships

```
User
  ├── has many Bookings
  └── has many Reviews

Destination
  ├── has many TravelPackages
  ├── has many Bookings
  └── has many Reviews

TravelPackage
  ├── belongs to Destination
  ├── has many Bookings
  └── has many Reviews

Booking
  ├── belongs to User
  ├── belongs to TravelPackage
  ├── belongs to Destination
  └── has Payment status

Review
  ├── belongs to User
  ├── belongs to Destination (optional)
  └── belongs to TravelPackage (optional)
```

## API Response Format

All API endpoints return a consistent response format:

```typescript
interface ApiResponse<T> {
  success: boolean;
  data?: T;           // Present on success
  error?: string;     // Present on error
  message?: string;   // Additional context
}
```

### Success Response
```json
{
  "success": true,
  "data": { /* data */ },
  "message": "Operation successful"
}
```

### Error Response
```json
{
  "success": false,
  "error": "Validation failed",
  "message": "Detailed error information"
}
```

## Validation Strategy

### Request Validation
1. Zod schema in `lib/api/validators.ts`
2. Schema parsing in route handler
3. Type-safe data for business logic
4. Consistent error messages

### Database Validation
1. Mongoose schema constraints
2. Field-level validators
3. Pre-hooks for complex validation
4. Error propagation to API

## Error Handling

### Error Hierarchy
```
Error
├── ApiError (extends Error)
│   └── statusCode + data
├── ZodError
│   └── Field validation errors
└── Generic Error
    └── Unknown/unexpected
```

### Error Response Flow
```
Try/Catch in Route Handler
    ↓
Identify Error Type
    ↓
Format Error Message
    ↓
Set HTTP Status Code
    ↓
Return errorResponse()
```

## Performance Patterns

### Database Indexing
- Primary key: Automatic
- Frequently queried fields: Create indexes
- Foreign keys: Create indexes
- Text search: Create text indexes

### Query Optimization
- Use `.lean()` for read-only data
- Populate only needed relationships
- Pagination for large datasets
- Limit fields returned

### Frontend Optimization
- Client components for interactivity
- Server components for static content
- Image optimization with next/image
- Component code splitting

## Extending the Architecture

### Adding a New Feature

1. **Define Types** (`lib/types/`)
   ```typescript
   export interface NewFeature {
     id: string;
     // properties
   }
   ```

2. **Create Model** (`lib/models/`)
   ```typescript
   const schema = new Schema<INewFeature>({...});
   ```

3. **Create Validators** (`lib/api/validators.ts`)
   ```typescript
   create: z.object({...}),
   update: z.object({...})
   ```

4. **Create Routes** (`app/api/feature/`)
   - `route.ts` for list/create
   - `[id]/route.ts` for single item operations

5. **Create Components** (`components/`)
   - Display components
   - Interactive components

6. **Update Types** (`lib/types/`)
   - Add to existing or create new interface

## Testing Strategy

### Unit Tests
- Helper functions
- Utility functions
- Validation schemas

### Integration Tests
- API routes
- Database operations
- Error scenarios

### E2E Tests
- User workflows
- Critical paths
- Cross-component interactions

## Deployment Considerations

- Environment variables configuration
- MongoDB Atlas setup
- API rate limiting
- CORS configuration
- Error monitoring/logging
- Performance monitoring
- Security headers

## Future Enhancements

1. **Authentication**: Auth.js integration
2. **Authorization**: Role-based access control
3. **Caching**: Redis for performance
4. **Search**: Elasticsearch for advanced search
5. **Monitoring**: Error tracking and analytics
6. **Testing**: Comprehensive test suite
7. **Documentation**: API documentation (OpenAPI)
