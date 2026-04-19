import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  travelPackage: mongoose.Types.ObjectId;
  destination: mongoose.Types.ObjectId;
  numberOfTravelers: number;
  totalPrice: number;
  status: 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed';
  bookingDate: Date;
  departureDate: Date;
  returnDate: Date;
  specialRequests?: string;
  paymentStatus: 'Pending' | 'Completed' | 'Failed';
  cancellationReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new Schema<IBooking>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'User is required'],
    },
    travelPackage: {
      type: Schema.Types.ObjectId,
      ref: 'TravelPackage',
      required: [true, 'Travel package is required'],
    },
    destination: {
      type: Schema.Types.ObjectId,
      ref: 'Destination',
      required: [true, 'Destination is required'],
    },
    numberOfTravelers: {
      type: Number,
      required: [true, 'Number of travelers is required'],
      min: [1, 'At least 1 traveler is required'],
    },
    totalPrice: {
      type: Number,
      required: [true, 'Total price is required'],
      min: [0, 'Price must be non-negative'],
    },
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Cancelled', 'Completed'],
      default: 'Pending',
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    departureDate: {
      type: Date,
      required: [true, 'Departure date is required'],
    },
    returnDate: {
      type: Date,
      required: [true, 'Return date is required'],
    },
    specialRequests: {
      type: String,
      maxlength: [1000, 'Special requests must be less than 1000 characters'],
    },
    paymentStatus: {
      type: String,
      enum: ['Pending', 'Completed', 'Failed'],
      default: 'Pending',
    },
    cancellationReason: String,
  },
  { timestamps: true }
);

// Indexes
bookingSchema.index({ user: 1 });
bookingSchema.index({ travelPackage: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ bookingDate: -1 });

export default mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);
