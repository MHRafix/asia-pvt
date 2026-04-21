import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import TravelPackage from '@/lib/models/TravelPackage';
import { successResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { travelPackageSchemas } from '@/lib/api/validators';


export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const destination = searchParams.get('destination');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const difficulty = searchParams.get('difficulty');
    const skip = parseInt(searchParams.get('skip') || '0');
    const limit = parseInt(searchParams.get('limit') || '10');

    const query: any = {};
    if (destination) query.destination = destination;
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }
    if (difficulty) query.difficulty = difficulty;

    const packages = await TravelPackage.find(query)
      .populate('destination', 'name country')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await TravelPackage.countDocuments(query);

    return NextResponse.json(
      successResponse(
        {
          packages,
          pagination: {
            total,
            skip,
            limit,
            pages: Math.ceil(total / limit),
          },
        },
        'Packages retrieved successfully'
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
    const validatedData = travelPackageSchemas.create.parse(body);

    const travelPackage = await TravelPackage.create(validatedData);
    await travelPackage.populate('destination', 'name country');

    return NextResponse.json(
      successResponse(travelPackage, 'Package created successfully'),
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    return handleError(error);
  }
}
