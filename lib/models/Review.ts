import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  user: mongoose.Types.ObjectId;
  destination?: mongoose.Types.ObjectId;
  travelPackage?: mongoose.Types.ObjectId;
  rating: number;
  title: string;
  content: string;
  images: string[];
  helpful: number;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<IReview>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: 'Destination',
    },
    travelPackage: {
      type: Schema.Types.ObjectId,
      ref: 'TravelPackage',
    },
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
    },
    title: {
      type: String,
      required: [true, 'Review title is required'],
      trim: true,
      minlength: [5, 'Title must be at least 5 characters'],
      maxlength: [100, 'Title must be less than 100 characters'],
    },
    content: {
      type: String,
      required: [true, 'Review content is required'],
      minlength: [20, 'Content must be at least 20 characters'],
      maxlength: [2000, 'Content must be less than 2000 characters'],
    },
    images: {
      type: [String],
      default: [],
    },
    helpful: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

// Validate at least one of destination or travelPackage is provided
reviewSchema.pre('validate', function (next) {
  if (!this.destination && !this.travelPackage) {
    next(new Error('Either destination or travelPackage is required'));
  } else {
    next();
  }
});

// Indexes
reviewSchema.index({ destination: 1 });
reviewSchema.index({ travelPackage: 1 });
reviewSchema.index({ user: 1 });
reviewSchema.index({ rating: -1 });

export default mongoose.models.Review || mongoose.model<IReview>('Review', reviewSchema);
