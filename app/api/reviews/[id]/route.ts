import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Review from '@/lib/models/Review';
import { successResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { getUserFromToken } from '@/lib/auth';
import { Types } from 'mongoose';

interface RouteParams {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid review ID');
    }

    const review = await Review.findById(id)
      .populate('user', 'name profileImage')
      .populate('destination', 'name')
      .populate('travelPackage', 'name');

    if (!review) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Review not found');
    }

    return NextResponse.json(
      successResponse(review, 'Review retrieved successfully'),
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
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid review ID');
    }

    const review = await Review.findById(id);
    if (!review) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Review not found');
    }

    // Check authorization
    if (review.user.toString() !== user.userId) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden');
    }

    const body = await request.json();
    const { rating, title, content, images } = body;

    if (rating) review.rating = rating;
    if (title) review.title = title;
    if (content) review.content = content;
    if (images) review.images = images;

    await review.save();
    await review.populate('user', 'name profileImage');
    await review.populate('destination', 'name');
    await review.populate('travelPackage', 'name');

    return NextResponse.json(
      successResponse(review, 'Review updated successfully'),
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
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid review ID');
    }

    const review = await Review.findById(id);
    if (!review) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Review not found');
    }

    // Check authorization
    if (review.user.toString() !== user.userId) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden');
    }

    await Review.findByIdAndDelete(id);

    return NextResponse.json(
      successResponse(null, 'Review deleted successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}
