import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Destination from '@/lib/models/Destination';
import { successResponse, errorResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { destinationSchemas } from '@/lib/api/validators';
import { Types } from 'mongoose';

interface RouteParams {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid destination ID');
    }

    const destination = await Destination.findById(id);
    if (!destination) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Destination not found');
    }

    return NextResponse.json(
      successResponse(destination, 'Destination retrieved successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid destination ID');
    }

    const body = await request.json();
    const validatedData = destinationSchemas.update.parse(body);

    const destination = await Destination.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    });

    if (!destination) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Destination not found');
    }

    return NextResponse.json(
      successResponse(destination, 'Destination updated successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid destination ID');
    }

    const destination = await Destination.findByIdAndDelete(id);
    if (!destination) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Destination not found');
    }

    return NextResponse.json(
      successResponse(null, 'Destination deleted successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}
