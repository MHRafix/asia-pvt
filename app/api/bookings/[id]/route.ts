import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/lib/models/Booking';
import { successResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { getUserFromToken } from '@/lib/auth';
import { Types } from 'mongoose';

interface RouteParams {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized');
    }

    const user = getUserFromToken(token);
    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }

    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid booking ID');
    }

    const booking = await Booking.findById(id)
      .populate('user', 'name email phone')
      .populate('travelPackage', 'name price destination');

    if (!booking) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Booking not found');
    }

    // Check authorization
    if (booking.user.toString() !== user.userId) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden');
    }

    return NextResponse.json(
      successResponse(booking, 'Booking retrieved successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized');
    }

    const user = getUserFromToken(token);
    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }

    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid booking ID');
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Booking not found');
    }

    // Check authorization
    if (booking.user.toString() !== user.userId) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden');
    }

    const body = await request.json();
    const { status, numberOfTravelers, departureDate, returnDate, specialRequests } = body;

    if (status) booking.status = status;
    if (numberOfTravelers) booking.numberOfTravelers = numberOfTravelers;
    if (departureDate) booking.departureDate = departureDate;
    if (returnDate) booking.returnDate = returnDate;
    if (specialRequests) booking.specialRequests = specialRequests;

    await booking.save();
    await booking.populate('user', 'name email phone');
    await booking.populate('travelPackage', 'name price destination');

    return NextResponse.json(
      successResponse(booking, 'Booking updated successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Unauthorized');
    }

    const user = getUserFromToken(token);
    if (!user) {
      throw new ApiError(HTTP_STATUS.UNAUTHORIZED, 'Invalid token');
    }

    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid booking ID');
    }

    const booking = await Booking.findById(id);
    if (!booking) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Booking not found');
    }

    // Check authorization
    if (booking.user.toString() !== user.userId) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden');
    }

    await Booking.findByIdAndDelete(id);

    return NextResponse.json(
      successResponse(null, 'Booking deleted successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}
