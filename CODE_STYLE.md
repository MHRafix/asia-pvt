# Code Style Guide

Guidelines for maintaining code quality and consistency throughout the TravelHub project.

## General Principles

1. **Type Safety First**: Use TypeScript strictly, avoid `any`
2. **Readability**: Code should be self-documenting
3. **DRY**: Don't Repeat Yourself - extract reusable logic
4. **Single Responsibility**: Functions/components do one thing well
5. **Error Handling**: Always handle errors gracefully
6. **Testing Mindset**: Write code that's easy to test

## TypeScript

### Variable Declarations

```typescript
// ✅ Good: const by default
const destination = await Destination.findById(id);

// ✅ Good: explicit type when needed
const destinations: IDestination[] = await query.exec();

// ❌ Avoid: any type
const data: any = result; // Don't do this
```

### Interfaces vs Types

```typescript
// ✅ Use interfaces for object shapes
interface IDestination {
  name: string;
  country: string;
}

// ✅ Use types for unions/primitives
type Difficulty = 'Easy' | 'Moderate' | 'Hard';
```

### Function Signatures

```typescript
// ✅ Good: explicit return type
async function getDestination(id: string): Promise<IDestination | null> {
  return Destination.findById(id);
}

// ✅ Good: documented parameters
export function formatPrice(
  price: number,
  currency: string = 'USD'
): string {
  // implementation
}

// ❌ Avoid: implicit return types
async function getData(id) { // No return type!
  return result;
}
```

## Component Development

### Client Components

```typescript
// ✅ Good: client component marked
'use client';

import { FC, useState } from 'react';

interface Props {
  title: string;
  onSubmit?: (data: FormData) => void;
}

export const MyComponent: FC<Props> = ({ title, onSubmit }) => {
  const [state, setState] = useState('');

  return <div>{title}</div>;
};
```

### Server Components

```typescript
// ✅ Good: async server component
export default async function DestinationPage({ params }) {
  const destination = await getDestination(params.id);

  return <div>{destination.name}</div>;
}
```

## API Routes

### Consistency Pattern

```typescript
// ✅ Good: following patterns
import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import { handleError } from '@/lib/api/middleware';
import { successResponse } from '@/lib/api/response';

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get data
    const data = await Model.find();
    
    // Return response
    return NextResponse.json(
      successResponse(data),
      { status: 200 }
    );
  } catch (error) {
    return handleError(error);
  }
}
```

### Error Handling

```typescript
// ✅ Good: proper error handling
try {
  const data = await fetchData();
  return successResponse(data);
} catch (error) {
  if (error instanceof ValidationError) {
    return handleError(error);
  }
  if (error instanceof NotFoundError) {
    throw new ApiError(404, 'Resource not found');
  }
  throw error;
}
```

## Validation

### Zod Schemas

```typescript
// ✅ Good: clear validation
export const userSchemas = {
  create: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Minimum 6 characters'),
  }),
  update: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
  }),
};

// Usage
const validatedData = userSchemas.create.parse(body);
```

## Database Models

### Schema Definition

```typescript
// ✅ Good: properly structured schema
const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      minlength: [2, 'Too short'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^.../, 'Invalid email'],
    },
  },
  { timestamps: true }
);

// Add indexes
userSchema.index({ email: 1 });

export default mongoose.model<IUser>('User', userSchema);
```

## Naming Conventions

### Files

```typescript
// ✅ Components (PascalCase)
Header.tsx
DestinationCard.tsx
Footer.tsx

// ✅ Utils/helpers (camelCase)
api-client.ts
helpers.ts
db.ts

// ✅ Types (camelCase or PascalCase)
types.ts
IDestination.ts (if separate file)
```

### Variables & Functions

```typescript
// ✅ Variables (camelCase)
const destinationName = 'Paris';
const isLoading = false;
const MAX_SIZE = 100; // Constants

// ✅ Functions (camelCase)
function formatPrice(price: number) {}
async function getDestination(id: string) {}
const handleSubmit = () => {}

// ✅ Classes & Interfaces (PascalCase)
class ApiError extends Error {}
interface IDestination {}
type Difficulty = 'Easy' | 'Moderate' | 'Hard';
```

## Comments & Documentation

### Code Comments

```typescript
// ✅ Good: explains WHY, not WHAT
// We cache the connection because serverless functions
// create new connections frequently, impacting performance
const cached = { conn: null };

// ❌ Avoid: obvious comments
// Get user by id
async function getUser(id: string) {}
```

### JSDoc for Public APIs

```typescript
/**
 * Format a price value with currency symbol
 * @param price - The price in base currency
 * @param currency - ISO currency code (default: USD)
 * @returns Formatted price string
 * @example
 * formatPrice(1000, 'USD') // '$1,000'
 */
export function formatPrice(price: number, currency = 'USD'): string {
  // implementation
}
```

## Testing

### Test File Naming

```typescript
// ✅ Good: co-located with implementation
helpers.ts
helpers.test.ts

components/Header.tsx
components/Header.test.tsx
```

### Test Structure

```typescript
// ✅ Good: clear test organization
describe('formatPrice', () => {
  it('should format price with currency symbol', () => {
    const result = formatPrice(1000, 'USD');
    expect(result).toBe('$1,000');
  });

  it('should handle decimal places', () => {
    const result = formatPrice(1000.5, 'USD');
    expect(result).toBe('$1,000.50');
  });
});
```

## CSS & Styling

### TailwindCSS

```typescript
// ✅ Good: semantic classes
className="flex items-center justify-between gap-4 p-4 rounded-lg border"

// ✅ Good: responsive prefixes
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"

// ❌ Avoid: arbitrary values without reason
className="p-[17px]" // Use p-4 instead

// ❌ Avoid: deeply nested selectors
className="hover:opacity-80 transition-opacity"
```

### Component Styling

```typescript
// ✅ Good: style composition
import { cn } from '@/lib/utils';

interface ButtonProps {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  return (
    <button
      className={cn(
        'px-4 py-2 rounded-lg transition-colors',
        variant === 'primary' && 'bg-primary text-white',
        variant === 'secondary' && 'bg-secondary text-foreground',
        className
      )}
      {...props}
    />
  );
}
```

## Performance

### React Components

```typescript
// ✅ Good: memoize expensive components
const MemoizedCard = memo(DestinationCard);

// ✅ Good: use useCallback for stable references
const handleClick = useCallback((id: string) => {
  navigate(`/destinations/${id}`);
}, [navigate]);
```

### Database Queries

```typescript
// ✅ Good: select only needed fields
await Destination.find().select('name country rating');

// ✅ Good: paginate large result sets
await Destination.find().skip(skip).limit(limit);

// ✅ Good: create indexes for frequent queries
destinationSchema.index({ country: 1 });
```

## Error Messages

### User-Facing Messages

```typescript
// ✅ Good: clear, helpful error messages
"Email is already in use. Please use a different email address."
"Password must be at least 6 characters long."

// ❌ Avoid: technical jargon
"Duplicate key error in collection users"
"Invalid input for field"
```

### Logging

```typescript
// ✅ Good: structured logging
console.error('[DB] Connection failed:', error.message);
console.log('[API] Request to /destinations?limit=10');

// ❌ Avoid: unclear logs
console.log('Error:', error);
console.log('data');
```

## Imports

### Organize Imports

```typescript
// ✅ Good: logical organization
// 1. Next.js imports
import { NextRequest, NextResponse } from 'next/server';
import Link from 'next/link';

// 2. React imports
import { useState, useCallback } from 'react';

// 3. Third-party imports
import { z } from 'zod';

// 4. Local imports
import { formatPrice } from '@/lib/helpers';
import { Card } from '@/components/ui/card';
```

## Git Commits

### Commit Messages

```bash
# ✅ Good: clear, descriptive
git commit -m "feat: add destination filtering by country"
git commit -m "fix: handle MongoDB connection errors"
git commit -m "docs: update API documentation"

# ❌ Avoid: vague messages
git commit -m "update"
git commit -m "fix bug"
```

### Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Code style (formatting)
- `refactor`: Code refactoring
- `test`: Tests
- `perf`: Performance improvements
