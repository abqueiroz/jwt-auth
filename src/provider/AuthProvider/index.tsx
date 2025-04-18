'use client'
import Loading from '@/app/loading';
import { useRouter } from 'next/navigation';
import { createContext, ReactNode, useEffect, useState } from "react";

interface AuthProps {
  children: ReactNode;
}

interface User {
  userId: string;
  email: string;
  github?: string
}

const AuthContext = createContext<User | null>(null);

export const AuthProvider = (props: AuthProps) => {
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
          router?.push('/login');
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
    return <Loading/>
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">Error: {error}</div>;
  }

  if (!user) {
    return null;
  }
  return (<AuthContext.Provider value={user}>
    {props.children}
  </AuthContext.Provider>)
};
