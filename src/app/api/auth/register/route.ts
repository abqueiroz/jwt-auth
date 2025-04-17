import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt'; // Install this: npm install @types/bcrypt
import { signinToken, setAuthCookie } from '@/lib/auth';

interface RegistrationRequestBody {
  email?: string;
  password?: string;
}

export async function POST(request: Request) {
  try {
    const body: RegistrationRequestBody = await request.json();
    const { email, password } = body;

    // Basic validation
    if (!email || !password) {
      return NextResponse.json({ error: 'Please provide email and password' }, { status: 400 });
    }

    // Check if the user already exists (replace with your database logic)
    // const existingUser = await db.user.findUnique({ where: { email } });
    // if (existingUser) {
    //   return NextResponse.json({ error: 'User already exists' }, { status: 409 });
    // }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword)

    // Create the new user in your database (replace with your database logic)
    // const newUser = await db.user.create({
    //   data: { email, password: hashedPassword },
    // });

    // For this example, we'll simulate user creation and use a dummy user ID
    const newUser = { id: 'dummy-user-id', email };

    // Create a JWT token
    const tokenPayload = { userId: newUser.id, email: newUser.email };
    const token = signinToken(tokenPayload);

    // Set the HTTP-only cookie
    setAuthCookie(token);

    return NextResponse.json({ message: 'Registration successful' }, { status: 201 });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Failed to register user' }, { status: 500 });
  }
}