import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';

import { Button, TextInput } from '../../components/shared';
import { API_URL } from '../../constants';

export default function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isLoggined, setIsLoggined] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        user: data,
      });
      localStorage.setItem('auth-token', response.data.token);
      toast.success('Logged in successfully!');
      router.push('/builder');
    } catch (e) {
      !e.response?.data && toast.error(e.message);
      e.response?.data &&
        Object.values(e.response?.data)
          .filter((el) => typeof el != 'object')
          .forEach(toast.error);
    } finally {
      setLoading(false);
    }
  };

  if (isLoggined) {
    Router.push('/builder');
    toast.success('Already logged in!');
  }

  return (
    <section className='flex flex-col w-full h-screen items-center relative bg-gradient-to-tr from-white to-blue-100 pb-20 px-4 md:px-0 md:pb-0'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col mt-10 md:mt-36 mb-4 w-full md:max-w-lg rounded shadow px-3 md:px-20 pt-10 pb-10 bg-white'
      >
        <header className='font-bold text-2xl mb-4 text-center'>Login</header>
        <TextInput
          type='email'
          placeholder='Email'
          helperText={errors.email?.message}
          {...register('email', {
            required: 'Email is required!',
            pattern: /^\S+@\S+$/i,
          })}
        />
        <TextInput
          type='password'
          placeholder='Password'
          {...register('password')}
        />

        <Button isLoading={loading} type='submit' className='mt-5'>
          Login
        </Button>
      </form>
      <Link href='/auth/signup'>
        <a className='btn btn-wide'>Or register here...</a>
      </Link>
    </section>
  );
}
