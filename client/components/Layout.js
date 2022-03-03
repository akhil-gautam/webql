import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';

import { Button } from './shared';

export function Layout({ children, className = '' }) {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setLoggedIn(localStorage.getItem('auth-token')?.length);
  }, []);

  const logout = () => {
    localStorage.removeItem('auth-token');
    setLoggedIn(null);
    Router.push('/auth/signin');
  };

  return (
    <main className='min-h-screen w-screen flex flex-col'>
      <div className='navbar bg-neutral text-neutral-content shadow-lg'>
        <div className='flex-none px-2 mx-4'>
          <Link href='/builder'>
            <a className='text-xl font-bold'>WebQL</a>
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2'>
          <div className='items-stretch hidden lg:flex space-x-1'>
            <Link href='/builder/archived'>
              <a className='btn'>Archive</a>
            </Link>
          </div>
        </div>
        {loggedIn ? (
          <Button className='pr-5' onClick={logout}>
            Logout
          </Button>
        ) : (
          <div className='space-x-2'>
            <Link href='/auth/signin'>
              <a className='btn btn-info'>Login</a>
            </Link>
            <Link href='/auth/signup'>
              <a className='btn'>Register</a>
            </Link>
          </div>
        )}
      </div>
      <section
        className={`w-full min-h-screen flex flex-col p-2 md:p-4 bg-gray-100`}
      >
        {children}
      </section>
    </main>
  );
}
