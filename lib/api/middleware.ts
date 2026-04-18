import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ApiError, errorResponse, HTTP_STATUS } from './response';

export function handleError(error: unknown) {
  console.error('[API Error]', error);

  if (error instanceof ApiError) {
    return NextResponse.json(errorResponse(error.message), {
      status: error.statusCode,
    });
  }

  if (error instanceof ZodError) {
    const formattedErrors = error.errors.map((err) => ({
      field: err.path.join('.'),
      message: err.message,
    }));
    return NextResponse.json(
      errorResponse('Validation failed', JSON.stringify(formattedErrors)),
      { status: HTTP_STATUS.BAD_REQUEST }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(errorResponse(error.message), {
      status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
    });
  }

  return NextResponse.json(errorResponse('Internal server error'), {
    status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
  });
}

export async function validateRequest<T>(
  request: NextRequest,
  schema: any
): Promise<T> {
  try {
    const body = await request.json();
    return schema.parse(body);
  } catch (error) {
    if (error instanceof ZodError) {
      throw error;
    }
    throw new Error('Invalid request body');
  }
}
