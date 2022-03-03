import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Layout({ children, ...rest }) {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setLoggedIn(localStorage.getItem('auth-token')?.length);
  }, []);

  const logout = () => {
    localStorage.removeItem('auth-token');
    setLoggedIn(null);
  };

  return (
    <main className='min-h-screen w-screen flex flex-col'>
      <div className='navbar bg-neutral text-neutral-content mb-2 shadow-lg'>
        <div className='flex-none px-2 mx-4'>
          <Link href='/builder'>
            <a className='text-sm font-bold text-blue-400 border border-blue-400 p-1'>
              WebQL
            </a>
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2'>
          <div className='items-stretch hidden lg:flex space-x-1'>
            <Link href='/datasources'>
              <a className='btn btn-ghost rounded-btn'>Datasources</a>
            </Link>
            <Link href='/builder/create'>
              <a className='btn btn-ghost rounded-btn'>Create</a>
            </Link>
          </div>
        </div>
        {loggedIn && (
          <Link href='/builder'>
            <a className='btn'>Back to builder</a>
          </Link>
        )}
      </div>
      <section className='w-full h-full flex flex-col p-2 md:p-8'>
        {children}
      </section>
    </main>
  );
}
