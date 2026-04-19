import { NextRequest, NextResponse } from 'next/server';
import { getUserFromToken } from './auth';

export const verifyAuth = (request: NextRequest) => {
  try {
    const token = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!token) {
      return null;
    }

    const user = getUserFromToken(token);
    return user;
  } catch (error) {
    return null;
  }
};

export const requireAuth = (request: NextRequest) => {
  const user = verifyAuth(request);

  if (!user) {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Unauthorized' }),
      { status: 401, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return { success: true, user };
};

export const requireAdmin = (request: NextRequest) => {
  const authResult = requireAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  const user = authResult.user;

  if (user.role !== 'admin') {
    return new NextResponse(
      JSON.stringify({ success: false, message: 'Forbidden - Admin access required' }),
      { status: 403, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return { success: true, user };
};
