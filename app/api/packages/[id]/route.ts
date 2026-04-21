import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TravelPackage from '@/lib/models/TravelPackage';
import { successResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { travelPackageSchemas } from '@/lib/api/validators';

import { Types } from 'mongoose';

interface RouteParams {
  id: string;
}

export async function GET(request: NextRequest, { params }: { params: Promise<RouteParams> }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid package ID');
    }

    const travelPackage = await TravelPackage.findById(id).populate('destination', 'name country');
    if (!travelPackage) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Package not found');
    }

    return NextResponse.json(
      successResponse(travelPackage, 'Package retrieved successfully'),
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
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid package ID');
    }

    const body = await request.json();
    const validatedData = travelPackageSchemas.create.parse(body);

    const travelPackage = await TravelPackage.findByIdAndUpdate(id, validatedData, {
      new: true,
      runValidators: true,
    }).populate('destination', 'name country');

    if (!travelPackage) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Package not found');
    }

    return NextResponse.json(
      successResponse(travelPackage, 'Package updated successfully'),
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
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid package ID');
    }

    const travelPackage = await TravelPackage.findByIdAndDelete(id);
    if (!travelPackage) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'Package not found');
    }

    return NextResponse.json(
      successResponse(null, 'Package deleted successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}
