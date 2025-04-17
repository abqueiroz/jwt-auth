// app/page.tsx
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  userId: string;
  email: string;
  // Add other user properties if needed
}

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProtectedData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/protected');
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else if (response.status === 401) {
          router.push('/login');
        } else {
          const data = await response.json();
          setError(data.error || 'Failed to fetch protected data');
        }
      } catch (err) {
        console.error('Error fetching protected data:', err);
        setError('An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProtectedData();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <div className="bg-white p-8 rounded shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Welcome, <span className="text-blue-500">{'user.email'}</span>!</h1>
        <p className="text-gray-700 mb-4">This is a protected home page. Only authenticated users can see this.</p>
        <button
          onClick={() => {
            document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
           // router.push('/login');
          }}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
    </main>
  );
}