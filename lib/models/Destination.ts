import mongoose, { Schema, Document } from 'mongoose';

export interface IDestination extends Document {
  name: string;
  country: string;
  description: string;
  images: string[];
  highlights: string[];
  bestTimeToVisit: string;
  averageTemperature: string;
  timezone: string;
  currency: string;
  language: string;
  rating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const destinationSchema = new Schema<IDestination>(
  {
    name: {
      type: String,
      required: [true, 'Destination name is required'],
      trim: true,
      unique: true,
    },
    country: {
      type: String,
      required: [true, 'Country is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    highlights: {
      type: [String],
      default: [],
    },
    bestTimeToVisit: {
      type: String,
      trim: true,
    },
    averageTemperature: {
      type: String,
      trim: true,
    },
    timezone: {
      type: String,
      default: 'UTC',
    },
    currency: {
      type: String,
      trim: true,
    },
    language: {
      type: String,
      trim: true,
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
destinationSchema.index({ country: 1 });
destinationSchema.index({ name: 'text', description: 'text' });

export default mongoose.models.Destination || mongoose.model<IDestination>('Destination', destinationSchema);
