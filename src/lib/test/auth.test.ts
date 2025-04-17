// lib/auth.test.ts
import { signinToken, verifyToken, getAuthToken, setAuthCookie, destroyAuthCookie } from '../auth';
import { cookies } from 'next/headers'; // Import the actual cookies() function
import { jest } from '@jest/globals';

// Mock the 'next/headers' module and its 'cookies' function.
jest.mock('next/headers', () => {
  const cookieStore: { [key: string]: string } = {};
  return {
    cookies: jest.fn(() => ({ // Mock the return value of cookies()
      get: jest.fn((key: string) => ({ value: cookieStore[key] })),
      set: jest.fn((key: string, value: string) => {
        cookieStore[key] = value;
      }),
      delete: jest.fn((key: string) => {
        delete cookieStore[key];
      }),
      getAll: jest.fn(() => {
        return Object.entries(cookieStore).map(([name, value]) => ({ name, value }));
      }),
    })),
  };
});

describe('Auth Utility Functions', () => {
  const testPayload = { userId: '123', email: 'test@example.com' };
  const testSecret = 'your-test-secret'; // Use a different secret for tests, or better, set it as an env variable

  beforeEach(async() => {
    // Clear the cookie store before each test
    (await cookies() as any).mockClear(); // Clear the mock
    const cookieStore = {}; // Reset the cookie store
  });

  describe('signinToken', () => {
    it('should sign a token with the correct payload', () => {
      // Override process.env.JWT_SECRET for this test
      process.env.JWT_SECRET = testSecret;
      const token = signinToken(testPayload);
      expect(token).toBeDefined();
      // Since we're testing the signing, we don't verify here.  The verifyToken test will handle that.
      process.env.JWT_SECRET = 'your-secret-key'; //reset
    });

    it('should sign a token with provided options', () => {
       process.env.JWT_SECRET = testSecret;

       const token = signinToken(testPayload, {expiresIn:'1h'});
      expect(token).toBeDefined();
      process.env.JWT_SECRET = 'your-secret-key'; //reset
    });
  });

  describe('verifyToken', () => {
    it('should verify a valid token and return the payload', () => {
       process.env.JWT_SECRET = testSecret;
      const token = signinToken(testPayload);
      const decoded = verifyToken(token);
      expect(decoded).toEqual(testPayload);
      process.env.JWT_SECRET = 'your-secret-key'; //reset
    });

    it('should return null for an invalid token', () => {
       process.env.JWT_SECRET = testSecret;
      const invalidToken = 'invalid-token';
      const decoded = verifyToken(invalidToken);
      expect(decoded).toBeNull();
      process.env.JWT_SECRET = 'your-secret-key'; //reset
    });

    it('should return null if the secret is incorrect', () => {
        process.env.JWT_SECRET = testSecret;
        const token = signinToken(testPayload);
        process.env.JWT_SECRET = 'wrong-secret'; // Use a different secret for verification
        const decoded = verifyToken(token);
        expect(decoded).toBeNull();
        process.env.JWT_SECRET = 'your-secret-key'; //reset
    });
  });

  describe('setAuthCookie',() => {
    it('should set the auth token cookie', async() => {
      const token = 'test-auth-token';
      setAuthCookie(token);
      // Use the mock to inspect the cookie value
      expect((await cookies()).set).toHaveBeenCalledWith('authToken', token, {
        httpOnly: true,
        secure: false, //  Adjust as needed for your test environment
        sameSite: 'strict',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
      expect(((await cookies()).get('authToken') as any).value).toBe(token);
    });
  });

  describe('destroyAuthCookie', () => {
    it('should delete the auth token cookie', async() => {
      const token = 'test-auth-token';
      setAuthCookie(token); //set first
      destroyAuthCookie();
      expect((await cookies()).delete).toHaveBeenCalledWith('authToken');
      expect((( await cookies()).get('authToken') as any).value).toBeUndefined();
    });
  });

  describe('getAuthToken', () => {
    it('should return the auth token if it exists', () => {
      const token = 'test-auth-token';
      setAuthCookie(token);
      const retrievedToken = getAuthToken();
      expect(retrievedToken).toBe(token);
    });

    it('should return undefined if the auth token does not exist', () => {
      const retrievedToken = getAuthToken();
      expect(retrievedToken).toBeUndefined();
    });
  });
});