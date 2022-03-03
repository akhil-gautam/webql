import React, { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';
import Image from 'next/image';

import PG from '../images/pg.svg';
import MySQL from '../images/mysql.svg';

export default function Home() {
  const [isLoggined, setIsLoggined] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('auth-token');
    if (token) {
      setIsLoggined(true);
    }
  }, []);
  return (
    <main className='w-screen h-full min-h-screen bg-black'>
      <div className='opacity-0 md:opacity-50 animate-spin-slow blur-3xl fixed mx-auto'>
        <div className='h-48 w-48 rounded-xl bg-sky-900 mb-10'></div>
        <div className='h-48 w-48 rounded-xl bg-purple-700'></div>
      </div>
      <div className='navbar shadow fixed top-0 z-50 bg-black/30 md:bg-transparent text-neutral-content backdrop-blur-sm backdrop-filter'>
        <div className='flex-1'>
          <a className='btn btn-ghost normal-case text-xl'>WebQL</a>
        </div>
        <div className='flex-none'>
          <ul className='menu menu-horizontal p-0'>
            <li>
              <Link href='/auth/signin'>
                <a className='transition hover:ring-1 ring-blue-500 hover:shadow-md hover:shadow-blue-500'>
                  Sign In
                </a>
              </Link>
            </li>
            <li>
              <Link href='/auth/signup'>
                <a className='transition hover:ring-1 ring-blue-500 hover:shadow-md hover:shadow-blue-500'>
                  Register
                </a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className='w-screen h-full flex flex-col justify-center items-center text-white mt-auto'>
        <div className='text-center text-neutral-content mt-32'>
          <div className='max-w-xl'>
            <div className='mt-20 mb-10 font-semibold text-2xl py-px bg-gradient-to-r from-gray-900 via-blue-400 to-gray-900'>
              <h1 className='text-5xl font-bold bg-black'>
                A minimal nocode webapp builder{' '}
              </h1>
            </div>
            <p className='py-6 tracking-widest text-gray-100'>
              An open-source framework to build applications without pain. Build
              applications with modern users interface within seconds.
            </p>
            {isLoggined ? (
              <Link href='/builder'>
                <a className='btn btn-primary shadow'>Go to builder</a>
              </Link>
            ) : (
              <Link href='/auth/signup'>
                <a className='btn btn-primary shadow'>Get started</a>
              </Link>
            )}
          </div>
        </div>
        <h2 className='font-extralight mt-10 mb-4 text-xl bg-blue-400/20 rounded-lg py-1 px-4'>
          Pages built using WebQL look smoking 🔥
        </h2>
        <section className='flex flex-col w-full justify-center items-center z-40'>
          <ul className='flex flex-col divide-y bg-sky-100 text-gray-800 p-3 md:p-8 w-screen md:max-w-4xl overflow-x-auto rounded-xl transform md:hover:rotate-2 transition-all'>
            <li className='min-w-max flex items-center bg-white py-3 px-5 text-sm mb-2 font-bold'>
              <span className='w-10'></span>
              <span className='w-32'>Name</span>
              <span className='w-40'>Email</span>
              <span className='w-20'>Role</span>
              <span className='w-32'>Status</span>
              <span className='w-32'>Created at</span>
            </li>
            <li className='min-w-max flex items-center bg-white py-3 px-5 text-sm'>
              <span className='w-10'>
                <input type='checkbox' className='checkbox' />
              </span>
              <span className='text-black font-semibold w-32 overflow-x-scroll'>
                Jane Cooper
              </span>
              <span className='text-blue-600 w-40 overflow-x-auto'>
                jane@example.com
              </span>
              <span className='w-20'>Admin</span>
              <span className='text-center w-32'>
                <span className='px-3 py-1 rounded-lg bg-blue-100 text-blue-700'>
                  active
                </span>
              </span>
              <span className='w-32'>7 minutes ago</span>
            </li>
            <li className='min-w-max flex items-center bg-white py-3 px-5 text-sm'>
              <span className='w-10'>
                <input type='checkbox' className='checkbox' />
              </span>
              <span className='text-black font-semibold w-32 overflow-x-scroll'>
                Marry Lee
              </span>
              <span className='text-blue-600 w-40 overflow-x-auto'>
                marry@example.com
              </span>
              <span className='w-20'>Admin</span>
              <span className='text-center w-32'>
                <span className='px-3 py-1 rounded-lg bg-blue-100 text-blue-700'>
                  active
                </span>
              </span>
              <span className='w-32'>7 minutes ago</span>
            </li>
            <li className='min-w-max flex items-center bg-white py-3 px-5 text-sm'>
              <span className='w-10'>
                <input type='checkbox' className='checkbox' />
              </span>
              <span className='text-black font-semibold w-32 overflow-x-scroll'>
                Pen Austin
              </span>
              <span className='text-blue-600 w-40 overflow-x-auto'>
                p.austin@example.com
              </span>
              <span className='w-20'>Admin</span>
              <span className='text-center w-32'>
                <span className='px-3 py-1 rounded-lg bg-blue-100 text-blue-700'>
                  active
                </span>
              </span>
              <span className='w-32'>7 minutes ago</span>
            </li>
            <li className='min-w-max flex items-center bg-white py-3 px-5 text-sm'>
              <span className='w-10'>
                <input type='checkbox' className='checkbox' />
              </span>
              <span className='text-black font-semibold w-32 overflow-x-scroll'>
                Sheldon Cooper
              </span>
              <span className='text-blue-600 w-40 overflow-x-auto'>
                sheldon@example.com
              </span>
              <span className='w-20'>Admin</span>
              <span className='text-center w-32'>
                <span className='px-3 py-1 rounded-lg bg-blue-100 text-blue-700'>
                  active
                </span>
              </span>
              <span className='w-32'>7 minutes ago</span>
            </li>
          </ul>
          <div className='grid md:grid-cols-3 gap-4 max-w-4xl bg-sky-100 p-8 rounded-xl mt-8 group'>
            <div className='card bg-white text-black md:group-hover:translate-y-5 transition-all'>
              <div className='card-body'>
                <div className='card-title'>Minions</div>
                <p>
                  Minions Kevin, Stuart and Bob decide to find a new master.
                </p>
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary'>Details</button>
                </div>
              </div>
            </div>
            <div className='card bg-white text-black md:group-hover:-translate-y-5 transition-all'>
              <div className='card-body'>
                <div className='card-title'>Angry Birds</div>
                <p>
                  Angry Birds is a 2009 casual puzzle video game developed by
                  Rovio Entertainment.
                </p>
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary'>Details</button>
                </div>
              </div>
            </div>
            <div className='card bg-white text-black md:group-hover:translate-y-5 transition-all'>
              <div className='card-body'>
                <div className='card-title'>Raya and the Last Dragon</div>
                <p>
                  Raya, a warrior, sets out to track down Sisu, a dragon, who
                  transferred all her powers.
                </p>
                <div className='card-actions justify-end'>
                  <button className='btn btn-primary'>Details</button>
                </div>
              </div>
            </div>
          </div>
          <div className='w-full max-w-4xl bg-sky-50 text-blue-600 p-8 rounded-xl mt-8'>
            <ChartComponent />
          </div>
          <div className='mt-20 mb-10 font-semibold text-2xl py-px bg-gradient-to-r from-gray-900 via-blue-400 to-gray-900'>
            <h2 className='bg-black px-5 py-2'>
              Databases that we currently support
            </h2>
          </div>
          <div className='w-full max-w-4xl flex flex-col md:flex-row justify-center items-center space-x-0 md:space-x-20 space-y-20 md:space-y-0 mb-20'>
            <div className='w-56 h-56 p-3 shadow-neon bg-black hover:-rotate-2 hover:scale-105 transition-transform'>
              <Image src={PG} />
            </div>
            <div className='w-56 h-56 p-3 shadow-neon bg-black hover:rotate-2 hover:scale-105 transition'>
              <Image src={MySQL} />
            </div>
          </div>
          <div className='mt-20 mb-10 font-semibold text-lg md:text-2xl py-px bg-gradient-to-r from-black via-gray-400 to-black'>
            <h2 className='bg-black px-5 py-2'>
              What do we store in our system?
            </h2>
          </div>
          <ul className='text-sm w-full grid grid-cols-1 gap-4 px-2 md:px-10 md:grid-cols-2'>
            <li className='p-5 tracking-wider font-thin text-lg bg-gray-800/50 border-l-4 border-x-purple-200'>
              We store the minimum user specific data required for
              authentication
            </li>
            <li className='p-5 tracking-wider font-thin text-lg bg-gray-800/50 border-l-4 border-x-purple-200'>
              We don&apos;t store data from any of added databases
            </li>
            <li className='p-5 tracking-wider font-thin text-lg bg-gray-800/50 border-l-4 border-x-purple-200'>
              The database credentials are stored in encrypted format on our
              system
            </li>
            <li className='p-5 tracking-wider font-thin text-lg bg-gray-800/50 border-l-4 border-x-purple-200'>
              Anyway, you can host it on your own infra as it is open-source
            </li>
          </ul>
          <footer className='mt-20 w-full space-y-5 md:space-y-0 space-x-0 md:space-x-8 px-4 py-5 bg-gradient-to-r from-indigo-900/30 via-purple-700/30 to-blue-900/30 flex flex-col md:flex-row items-center justify-center tracking-widest'>
            <span>Made in India</span>
            <span>Built with Ruby on Rails</span>
            <span className='text-center'>
              Contact:{' '}
              <span className='text-blue-300 font-bold text-sm'>
                akhilgautam123@gmail.com
              </span>
            </span>
          </footer>
        </section>
      </div>
    </main>
  );
}

const data = [
  {
    name: 'Accounting',
    jobs: 4000,
  },
  {
    name: 'Advertising',
    jobs: 3000,
  },
  {
    name: 'Animation',
    jobs: 2000,
  },
  {
    name: 'Architecture',
    jobs: 2780,
  },
  {
    name: 'BPO',
    jobs: 1890,
  },
  {
    name: 'Media',
    jobs: 2390,
  },
  {
    name: 'Airline',
    jobs: 3490,
  },
  {
    name: 'Pharma',
    jobs: 3090,
  },
  {
    name: 'Ecommerce',
    jobs: 2000,
  },
  {
    name: 'IT',
    jobs: 1800,
  },
  {
    name: 'Consultant',
    jobs: 590,
  },
  {
    name: 'Entertainment',
    jobs: 5306,
  },
  {
    name: 'NGO',
    jobs: 1388,
  },
  {
    name: 'Shipping',
    jobs: 1500,
  },
];

function ChartComponent() {
  return (
    <ResponsiveContainer width='95%' height={400}>
      <BarChart width={700} height={300} data={data}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='jobs' fill='#570DF8' />
      </BarChart>
    </ResponsiveContainer>
  );
}
