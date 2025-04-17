'use client'
import { cn } from '@/lib/cn';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { Button, FormInput } from '@/components';

interface LoginFormState {
  email: string;
  password: string;
  error: string;
}
const LoginPage = () => {

  const [state, setState] = useState<LoginFormState>({
    email: '',
    password: '',
    error: '',
  });
  const router = useRouter();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log(state)
    debugger
    setState((prevState) => ({ ...prevState, error: '' }));

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      });

      if (response.ok) {
        router.push('/');
      } else {
        const data = await response.json();
        setState((prevState) => ({ ...prevState, error: data.error || 'Login failed' }));
      }
    } catch (error) {
      console.error('Login error:', error);
      setState((prevState) => ({ ...prevState, error: 'An unexpected error occurred' }));
    }
  };

  return (
    <main>
      <div className="text-center">
        <h1
          className={cn(
            "text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text",
            "bg-gradient-to-r from-blue-400 to-purple-400",
            "transition-all duration-700",
            "opacity-100"
          )}
        >
          Welcome my friend
        </h1>
        <p className="mt-2 text-gray-300 text-sm sm:text-base pb-4">
          Login to access your account
        </p>
      </div>
      <div
        className={cn(
          "p-6 rounded-xl shadow-2xl backdrop-blur-md",
          "bg-white/5 border border-white/10",
          "transition-all duration-500 space-y-6"
        )}
      >
        <form className="space-y-6" onSubmit={handleSubmit}
        >
          <FormInput
            id='email'
            type='email'
            autoComplete='email'
            labelName='Email address'
            placeholder='Enter your email'
            isRequired
            onChange={handleChange}
          />
          <FormInput
            id='password'
            type='password'
            autoComplete='current-password'
            labelName='Password'
            isRequired
            placeholder='Enter your password'
            onChange={handleChange}
          />
          <Button
            type="submit"
          >
            Login
          </Button>
        </form>

        <div className="text-center text-gray-400 text-sm">
          <span>
            Don`t have an account?
          </span>
          {' '}
          <a
            href="/register"
            className="hover:text-purple-300 transition-colors duration-200 cursor-pointer"
          >
            Register
          </a>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;