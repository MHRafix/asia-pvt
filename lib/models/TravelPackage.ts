import mongoose, { Schema, Document } from 'mongoose';

export interface ITravelPackage extends Document {
  name: string;
  description: string;
  destination: mongoose.Types.ObjectId;
  price: number;
  discountedPrice?: number;
  duration: number;
  images: string[];
  inclusions: string[];
  exclusions: string[];
  maxGroupSize: number;
  minGroupSize: number;
  difficulty: 'Easy' | 'Moderate' | 'Hard';
  itinerary: Array<{
    day: number;
    title: string;
    description: string;
  }>;
  availableDates: Date[];
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const travelPackageSchema = new Schema<ITravelPackage>(
  {
    name: {
      type: String,
      required: [true, 'Package name is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: 'Destination',
      required: [true, 'Destination is required'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price must be non-negative'],
    },
    discountedPrice: {
      type: Number,
      min: [0, 'Discounted price must be non-negative'],
    },
    duration: {
      type: Number,
      required: [true, 'Duration is required'],
      min: [1, 'Duration must be at least 1 day'],
    },
    images: {
      type: [String],
      default: [],
    },
    inclusions: {
      type: [String],
      default: [],
    },
    exclusions: {
      type: [String],
      default: [],
    },
    maxGroupSize: {
      type: Number,
      min: [1, 'Max group size must be at least 1'],
    },
    minGroupSize: {
      type: Number,
      default: 1,
      min: [1, 'Min group size must be at least 1'],
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Moderate', 'Hard'],
      default: 'Easy',
    },
    itinerary: [
      {
        day: Number,
        title: String,
        description: String,
      },
    ],
    availableDates: {
      type: [Date],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Indexes
travelPackageSchema.index({ destination: 1 });
travelPackageSchema.index({ price: 1 });
travelPackageSchema.index({ duration: 1 });

export default mongoose.models.TravelPackage || mongoose.model<ITravelPackage>('TravelPackage', travelPackageSchema);
