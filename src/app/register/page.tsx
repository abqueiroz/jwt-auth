'use client';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/cn';
import { FormInput, Button } from '@/components';

interface RegisterFormState {
  email: string;
  password: string;
  error: string;
  github: string | null,

}

export default function RegisterPage() {
  const [state, setState] = useState<RegisterFormState>({
    email: '',
    password: '',
    error: '',
    github: null,
  });
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setState((prevState) => ({ ...prevState, error: '' }));

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });

      if (response.ok) {
        router.push('/login');
      } else {
        const data = await response.json();
        setState((prevState) => ({ ...prevState, error: data.error || 'Registration failed' }));
      }
    } catch (error) {
      console.error('Registration error:', error);
      setState((prevState) => ({ ...prevState, error: 'An unexpected error occurred' }));
    }
  };

  return (
    <main className='flex w-full justify-center flex-col'>
      <div className="text-center">
        <h1
          className={cn(
            "text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text",
            "bg-gradient-to-r from-blue-400 to-purple-400",
            "transition-all duration-700",
            "opacity-100",
            'py-4'
          )}
        >
          Register
        </h1>
      </div>
      <div
        className={cn(
          " min-w-80 p-6 rounded-xl shadow-2xl backdrop-blur-md",
          "bg-white/5 border border-white/10",
          "transition-all duration-500 space-y-6"
        )}
      >
        <form className="space-y-5" onSubmit={handleSubmit}
        >
          <FormInput
            id='email'
            type='email'
            autoComplete='email'
            $labelName='Email address'
            placeholder='Enter your email'
            $isRequired
            name='email'
            onChange={handleChange}
          />
          <FormInput
            id='password'
            type='password'
            name='password'
            autoComplete='current-password'
            $labelName='Password'
            $isRequired
            placeholder='Enter your password'
            onChange={handleChange}
          />

          <FormInput
            id='password'
            type='password'
            name='github'
            autoComplete='current-password'
            $labelName='Github name'
            placeholder='add your github name'
            onChange={handleChange}
          />
          <Button
            type="submit"
          >
            Join in
          </Button>
        </form>

        <div className="text-center text-gray-400 text-sm">
          <span>
            Do you already have an account?
          </span>
          {' '}
          <a
            href="/login"
            className="cursor-pointer hover:text-purple-300 transition-colors duration-200 "
          >
            LogIn
          </a>
        </div>
      </div>
    </main>
  );
}