import { useEffect, useState } from 'react';
import { Frown, RefreshCcw, Trash2 } from 'react-feather';
import toast from 'react-hot-toast';
import { axios } from '../../axios';
import { Layout } from '../../components/Layout';

export default function Archived() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchArchived();
  }, []);
  async function fetchArchived() {
    const response = await axios.get('archives');
    setData(response);
  }

  async function restore(id, type) {
    try {
      await axios.put(`archives/${id}/restore`, { type });
      fetchArchived();
      toast.success('Restored successfully!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  async function reallyDelete(id, type) {
    try {
      await axios.delete(`archives/${id}?type=${type}`);
      fetchArchived();
      toast.success('Deleted from archive!');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }

  if (!data) {
    return <Layout>Loading...</Layout>;
  }

  if (
    !data.apps[0]?.name &&
    !data.pages[0]?.name &&
    !data.components[0]?.heading &&
    !data.forms[0]?.title
  ) {
    return (
      <Layout>
        <p className='flex items-center justify-center'>
          <Frown className='mr-2' />
          <span>No archived data</span>
        </p>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className='px-2 md:px-32'>
        {data.apps[0]?.name && (
          <>
            <header className='text-xl font-semibold mb-2 pl-1 text-red-700'>
              Apps
            </header>
            <ul className='flex flex-col w-full mb-5 space-y-2'>
              <li className='w-full flex justify-between py-4 px-4 md:px-8 font-bold text-sm bg-white mb-1'>
                <span>Name</span>
                <span></span>
              </li>
              {data.apps.map(({ id, name }) => (
                <li
                  key={id}
                  className='flex justify-between items-center py-3 px-2 md:px-8 font-light tracking-wider text-sm bg-white transition-all hover:shadow-md hover:ring-1 ring-black'
                >
                  <span>{name}</span>
                  <span className='flex items-center space-x-5'>
                    <span
                      className='p-2 cursor-pointer transition hover:bg-red-800 hover:text-white'
                      onClick={() => reallyDelete(id, 'app')}
                    >
                      <Trash2 />
                    </span>
                    <span
                      className='p-2 cursor-pointer hover:bg-blue-100 text-blue-900'
                      onClick={() => restore(id, 'app')}
                    >
                      <RefreshCcw />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        {data.pages[0]?.name && (
          <>
            <header className='text-xl font-semibold mb-2 pl-1 text-red-700'>
              Pages
            </header>
            <ul className='flex flex-col w-full mb-5 space-y-2'>
              <li className='w-full flex justify-between py-4 px-4 md:px-8 font-bold text-sm bg-white mb-1 '>
                <span>Name</span>
                <span></span>
              </li>
              {data.pages.map(({ id, name }) => (
                <li
                  key={id}
                  className='flex items-center justify-between py-3 px-2 md:px-8 font-light tracking-wider text-sm bg-white transition-all hover:shadow-md hover:ring-1 ring-black'
                >
                  <span>{name}</span>
                  <span className='flex items-center space-x-5'>
                    <span
                      className='p-2 cursor-pointer transition hover:bg-red-800 hover:text-white'
                      onClick={() => reallyDelete(id, 'page')}
                    >
                      <Trash2 />
                    </span>
                    <span
                      className='p-2 cursor-pointer hover:bg-blue-100 text-blue-900'
                      onClick={() => restore(id, 'page')}
                    >
                      <RefreshCcw />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        {data.components[0]?.heading && (
          <>
            <header className='text-xl font-semibold mb-2 pl-1 text-red-700'>
              Components
            </header>
            <ul className='flex flex-col w-full mb-5 space-y-2'>
              <li className='w-full flex justify-between py-4 px-4 md:px-8 font-bold text-sm bg-white mb-1'>
                <span>Name</span>
                <span></span>
              </li>
              {data.components.map(({ id, heading }) => (
                <li
                  key={id}
                  className='flex justify-between py-3 px-2 md:px-8 font-light tracking-wider text-sm bg-white transition-all hover:shadow-md hover:ring-1 ring-black'
                >
                  <span>{heading}</span>
                  <span className='flex space-x-5'>
                    <span
                      className='p-2 cursor-pointer transition hover:bg-red-800 hover:text-white'
                      onClick={() => reallyDelete(id, 'component')}
                    >
                      <Trash2 />
                    </span>
                    <span
                      className='p-2 cursor-pointer hover:bg-blue-100 text-blue-900'
                      onClick={() => restore(id, 'component')}
                    >
                      <RefreshCcw />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
        {data.forms[0]?.title && (
          <>
            <header className='text-xl font-semibold mb-2 pl-1 text-red-700'>
              Forms
            </header>
            <ul className='flex flex-col w-full mb-5 space-y-2'>
              <li className='w-full flex justify-between py-4 px-4 md:px-8 font-bold text-sm bg-white mb-1'>
                <span>Name</span>
                <span></span>
              </li>
              {data.forms.map(({ id, title }) => (
                <li
                  key={id}
                  className='flex justify-between py-3 px-2 md:px-8 font-light tracking-wider text-sm bg-white transition-all hover:shadow-md hover:ring-1 ring-black'
                >
                  <span>{title}</span>
                  <span className='flex space-x-5'>
                    <span
                      className='p-2 cursor-pointer transition hover:bg-red-800 hover:text-white'
                      onClick={() => reallyDelete(id, 'form')}
                    >
                      <Trash2 />
                    </span>
                    <span
                      className='p-2 cursor-pointer hover:bg-blue-100 text-blue-900'
                      onClick={() => restore(id, 'form')}
                    >
                      <RefreshCcw />
                    </span>
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </Layout>
  );
}
