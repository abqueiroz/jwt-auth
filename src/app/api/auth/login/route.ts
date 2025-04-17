// app/api/auth/login/route.ts
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import { signinToken, setAuthCookie } from '@/lib/auth';

interface LoginRequestBody {
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body: LoginRequestBody = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Please provide email and password' }, { status: 400 });
    }

    // Find the user in your database (replace with your database logic)
    // const user = await db.user.findUnique({ where: { email } });
    // if (!user) {
    //   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    // }

    // Compare the password
    // const passwordMatch = await bcrypt.compare(password, user.password);
    // if (!passwordMatch) {
    //   return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    // }

    // For this example, we'll simulate user retrieval and password check
    const dummyUser = { id: 'dummy-user-id', email: 'abqbisneto@gmail.com', password: '000' };
    if (email !== dummyUser.email || !(await bcrypt.compare(password, dummyUser.password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Create a JWT token
    const tokenPayload = { userId: dummyUser.id, email: dummyUser.email };
    const token = signinToken(tokenPayload);

    // Set the HTTP-only cookie
    setAuthCookie(token);

    return NextResponse.json({ message: 'Login successful' });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Failed to login' }, { status: 500 });
  }
}