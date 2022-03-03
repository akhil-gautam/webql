import Link from 'next/link';
import { useEffect } from 'react';
import { Edit, Trash } from 'react-feather';
import toast from 'react-hot-toast';

import { PageCreate } from '.';
import { axios } from '../../axios';
import { usePage } from '../../store/page';
import { Button } from '../shared';

export default function PageList({ app_id }) {
  const { pages, fetch: fetchPages } = usePage();

  useEffect(() => {
    fetchPages(app_id);
  }, []);

  const archivePage = async (id) => {
    try {
      await axios.patch(`pages/${id}/archive`);
      fetchPages(app_id);
      toast.success('Archived successfully');
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (pages.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center space-y-5 w-full md:px-10'>
        <span className='text-error-content font-semibold'>
          You haven&apos;t added any page in this app!
        </span>
        <PageCreate app_id={app_id} />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <header className='self-start font-semibold text-xl mb-4'>
        Pages available in the application
      </header>
      <section className='w-full flex flex-col space-y-4 mb-5 items-center'>
        {pages.map(({ id, name, page_order }) => (
          <div
            className='w-full flex items-center rounded-xl pr-4 hover:ring-2 ring-black bg-white'
            key={id}
          >
            <div className='card-body space-y-3'>
              <p className='font-semibold'>
                Page name: <span className='text-blue-600'>{name}</span>
              </p>
              <p className='text-gray-700 font-medium'>
                Page order: {page_order}
              </p>
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <Button className='btn-ghost'>
                <Link href={`/builder/page/${id}`}>
                  <a className='flex items-center'>
                    <span className='mr-2'>Edit</span> <Edit />
                  </a>
                </Link>
              </Button>
              <button
                className='flex items-center font-medium px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100'
                onClick={() => archivePage(id)}
              >
                <span className='mr-2'>Archive</span>
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </section>
      <PageCreate app_id={app_id} />
    </div>
  );
}
