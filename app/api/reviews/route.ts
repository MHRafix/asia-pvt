import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/lib/models/Review';
import { successResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { reviewSchemas } from '@/lib/api/validators';
import { getUserFromToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination');
    const travelPackage = searchParams.get('travelPackage');
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = {};
    if (destination) query.destination = destination;
    if (travelPackage) query.travelPackage = travelPackage;

    const reviews = await Review.find(query)
      .populate('user', 'name profileImage')
      .populate('destination', 'name')
      .populate('travelPackage', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Review.countDocuments(query);

    return NextResponse.json(
      successResponse(
        {
          reviews,
          pagination: {
            total,
            skip,
            limit,
            pages: Math.ceil(total / limit),
          },
        },
        'Reviews retrieved successfully'
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
    const validatedData = reviewSchemas.create.parse(body);

    const review = await Review.create({
      ...validatedData,
      user: user.userId,
    });

    await review.populate('user', 'name profileImage');
    await review.populate('destination', 'name');
    await review.populate('travelPackage', 'name');

    return NextResponse.json(
      successResponse(review, 'Review created successfully'),
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    return handleError(error);
  }
}
