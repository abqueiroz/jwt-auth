// app/page.tsx
'use client'
import { cn } from '@/lib/cn';
import { Avatar } from '@/components/Avatar';
import { useRouter } from 'next/navigation';
import { AuthProvider } from '@/provider/AuthProvider';

export default function Home() {
  const router = useRouter();

  return (
    <AuthProvider>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <div
          className={cn(
            "p-6 rounded-xl shadow-2xl backdrop-blur-md",
            "bg-white/5 border border-white/10",
            "transition-all duration-500 space-y-6"
          )}
        >
          <div className='inline-flex text-center justify-start items-center w-full gap-4'>
            <Avatar name='Arthur Queiroz' />
            <h1 className="text-2xl font-semibold h-full">
              Welcome, <span className="text-blue-500">{'Arthur Queiroz'}</span>!
            </h1>
          </div>
          <p className="text-gray-700 mb-4">This is a protected home page. Only authenticated users can see this.</p>
          <button
            onClick={() => {
              document.cookie = 'authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
              router?.push('/login');
            }}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Logout
          </button>
        </div>
      </main>
    </AuthProvider>

  );
}