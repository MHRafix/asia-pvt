import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
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
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
    }

    const foundUser = await User.findById(id).select('-password');
    if (!foundUser) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Users can only view their own profile unless they're admin
    if (user.role !== 'admin' && foundUser._id.toString() !== user.userId) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden');
    }

    return NextResponse.json(
      successResponse(foundUser, 'User retrieved successfully'),
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
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
    }

    const foundUser = await User.findById(id);
    if (!foundUser) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    // Users can only update their own profile unless they're admin
    if (user.role !== 'admin' && foundUser._id.toString() !== user.userId) {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Forbidden');
    }

    const body = await request.json();
    const { name, phone, bio, profileImage, role, isActive } = body;

    if (name) foundUser.name = name;
    if (phone) foundUser.phone = phone;
    if (bio) foundUser.bio = bio;
    if (profileImage) foundUser.profileImage = profileImage;

    // Only admin can change role and isActive
    if (user.role === 'admin') {
      if (role) foundUser.role = role;
      if (isActive !== undefined) foundUser.isActive = isActive;
    }

    await foundUser.save();

    return NextResponse.json(
      successResponse(foundUser.toObject({ versionKey: false }), 'User updated successfully'),
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
    if (!user || user.role !== 'admin') {
      throw new ApiError(HTTP_STATUS.FORBIDDEN, 'Admin access required');
    }

    await connectDB();
    const { id } = await params;

    if (!Types.ObjectId.isValid(id)) {
      throw new ApiError(HTTP_STATUS.BAD_REQUEST, 'Invalid user ID');
    }

    const foundUser = await User.findByIdAndDelete(id);
    if (!foundUser) {
      throw new ApiError(HTTP_STATUS.NOT_FOUND, 'User not found');
    }

    return NextResponse.json(
      successResponse(null, 'User deleted successfully'),
      { status: HTTP_STATUS.OK }
    );
  } catch (error) {
    return handleError(error);
  }
}
