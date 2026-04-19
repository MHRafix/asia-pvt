import { z } from 'zod';

export const authSchemas = {
  register: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
    phone: z.string().optional(),
  }),
  login: z.object({
    email: z.string().email('Invalid email format'),
    password: z.string().min(1, 'Password is required'),
  }),
};

export const userSchemas = {
  create: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    phone: z.string().optional(),
    bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  }),
  update: z.object({
    name: z.string().min(2).optional(),
    phone: z.string().optional(),
    bio: z.string().max(500).optional(),
    profileImage: z.string().url().optional(),
  }),
};

export const destinationSchemas = {
  create: z.object({
    name: z.string().min(1, 'Destination name is required'),
    country: z.string().min(1, 'Country is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    images: z.array(z.string()).default([]),
    highlights: z.array(z.string()).default([]),
    bestTimeToVisit: z.string().optional(),
    averageTemperature: z.string().optional(),
    timezone: z.string().default('UTC'),
    currency: z.string().optional(),
    language: z.string().optional(),
  }),
  update: z.object({
    name: z.string().optional(),
    country: z.string().optional(),
    description: z.string().optional(),
    images: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    bestTimeToVisit: z.string().optional(),
    averageTemperature: z.string().optional(),
    timezone: z.string().optional(),
    currency: z.string().optional(),
    language: z.string().optional(),
  }),
};

export const travelPackageSchemas = {
  create: z.object({
    name: z.string().min(1, 'Package name is required'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
    destination: z.string().min(1, 'Destination is required'),
    price: z.number().min(0, 'Price must be non-negative'),
    discountedPrice: z.number().min(0).optional(),
    duration: z.number().min(1, 'Duration must be at least 1 day'),
    images: z.array(z.string()).default([]),
    inclusions: z.array(z.string()).default([]),
    exclusions: z.array(z.string()).default([]),
    maxGroupSize: z.number().min(1).optional(),
    minGroupSize: z.number().min(1).default(1),
    difficulty: z.enum(['Easy', 'Moderate', 'Hard']).default('Easy'),
    itinerary: z.array(
      z.object({
        day: z.number(),
        title: z.string(),
        description: z.string(),
      })
    ).default([]),
    availableDates: z.array(z.string().datetime()).default([]),
  }),
};

export const bookingSchemas = {
  create: z.object({
    travelPackage: z.string().min(1, 'Travel package is required'),
    destination: z.string().min(1, 'Destination is required'),
    numberOfTravelers: z.number().min(1, 'At least 1 traveler is required'),
    departureDate: z.string().datetime(),
    returnDate: z.string().datetime(),
    specialRequests: z.string().max(1000).optional(),
  }),
};

export const reviewSchemas = {
  create: z.object({
    destination: z.string().optional(),
    travelPackage: z.string().optional(),
    rating: z.number().min(1).max(5),
    title: z.string().min(5).max(100),
    content: z.string().min(20).max(2000),
    images: z.array(z.string()).default([]),
  }).refine(
    (data) => data.destination || data.travelPackage,
    'Either destination or travelPackage is required'
  ),
};
