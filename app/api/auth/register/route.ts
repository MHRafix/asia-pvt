import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { hashPassword, generateToken } from '@/lib/auth';
import { successResponse, errorResponse, HTTP_STATUS, ApiError } from '@/lib/api/response';
import { handleError } from '@/lib/api/middleware';
import { authSchemas } from '@/lib/api/validators';

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const validatedData = authSchemas.register.parse(body);

    // Check if user exists
    const existingUser = await User.findOne({ email: validatedData.email });
    if (existingUser) {
      throw new ApiError(HTTP_STATUS.CONFLICT, 'Email already registered');
    }

    // Hash password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create user
    const user = await User.create({
      name: validatedData.name,
      email: validatedData.email,
      password: hashedPassword,
      phone: validatedData.phone || '',
      role: 'user',
      isActive: true,
    });

    // Generate token
    const token = generateToken(user._id.toString(), user.email, user.role);

    return NextResponse.json(
      successResponse(
        {
          token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
          },
        },
        'Registration successful'
      ),
      { status: HTTP_STATUS.CREATED }
    );
  } catch (error) {
    return handleError(error);
  }
}
