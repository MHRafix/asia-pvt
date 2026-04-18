import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Destination from '@/lib/models/Destination';
import { successResponse, errorResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { destinationSchemas } from '@/lib/api/validators';

export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const country = searchParams.get('country');
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = {};
    if (country) {
      query.country = { $regex: country, $options: 'i' };
    }

    const destinations = await Destination.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Destination.countDocuments(query);

    return NextResponse.json(
      successResponse(
        {
          destinations,
          pagination: {
            total,
            skip,
            limit,
            pages: Math.ceil(total / limit),
          },
        },
        'Destinations retrieved successfully'
      ),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = destinationSchemas.create.parse(body);

    // Check if destination already exists
    const existingDestination = await Destination.findOne({ name: validatedData.name });
    if (existingDestination) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'Destination with this name already exists');
    }

    const destination = await Destination.create(validatedData);

    return NextResponse.json(
      successResponse(destination, 'Destination created successfully'),
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    return handleError(error);
  }
}
