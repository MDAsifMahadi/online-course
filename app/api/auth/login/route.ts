import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { username, password } = body;

        // Simple mock validation (replace with real DB check later)
        if (username === 'admin' && password === 'admin') {
            // Return a mock JWT token
            const token = 'mock-jwt-token-header.mock-jwt-token-payload.mock-jwt-token-signature';

            return NextResponse.json({
                success: true,
                token,
                message: 'Login successful'
            });
        }

        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
}
