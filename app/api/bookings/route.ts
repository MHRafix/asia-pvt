import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Booking from '@/lib/models/Booking';
import { successResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { bookingSchemas } from '@/lib/api/validators';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = {};
    if (user.role !== 'admin') {
      query.user = user.userId;
    }

    const bookings = await Booking.find(query)
      .populate('user', 'name email phone')
      .populate('travelPackage', 'name price destination')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Booking.countDocuments(query);

    return NextResponse.json(
      successResponse(
        {
          bookings,
          pagination: {
            total,
            skip,
            limit,
            pages: Math.ceil(total / limit),
          },
        },
        'Bookings retrieved successfully'
      ),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
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

    const body = await request.json();
    const validatedData = bookingSchemas.create.parse(body);

    const booking = await Booking.create({
      ...validatedData,
      user: user.userId,
      status: 'pending',
    });

    await booking.populate('user', 'name email phone');
    await booking.populate('travelPackage', 'name price destination');

    return NextResponse.json(
      successResponse(booking, 'Booking created successfully'),
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    return handleError(error);
  }
}
