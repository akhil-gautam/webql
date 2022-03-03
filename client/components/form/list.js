import Link from 'next/link';
import { useEffect } from 'react';
import { Edit, Trash } from 'react-feather';
import toast from 'react-hot-toast';

import { FormCreate } from '.';
import { axios } from '../../axios';
import { useFormStore } from '../../store/form';
import { Button } from '../shared';

export default function FormList({ app_id }) {
  const { forms, fetchForms } = useFormStore();

  useEffect(() => {
    fetchForms(app_id);
  }, []);

  const archiveForm = async (id) => {
    try {
      await axios.delete(`forms/${id}`);
      fetchForms(app_id);
      toast.success('Archived successfully');
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (forms.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center pt-10 space-y-5 w-full md:px-10'>
        <span className='text-error-content-content font-semibold'>
          You haven&apos;t create any form in this app!
        </span>
        <FormCreate app_id={app_id} />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <header className='self-start font-semibold text-xl my-4'>
        Forms available in the application
      </header>
      <section className='w-full flex flex-col space-y-4 mb-5 items-center'>
        {forms.map(({ id, title }) => (
          <div
            className='w-full flex items-center rounded-xl p-4 hover:ring-2 ring-black bg-white'
            key={id}
          >
            <div className='card-body space-y-3'>
              <p className='font-semibold text-xl'>{title}</p>
            </div>
            <div className='flex flex-col items-end space-y-2'>
              <Button className='btn-ghost'>
                <Link href={`/builder/form/${id}`}>
                  <a className='flex items-center'>
                    <span className='mr-2'>Edit</span> <Edit />
                  </a>
                </Link>
              </Button>
              <button
                className='flex items-center font-medium px-3 py-2 bg-red-50 text-red-700 hover:bg-red-100'
                onClick={() => archiveForm(id)}
              >
                <span className='mr-2'>Archive</span>
                <Trash />
              </button>
            </div>
          </div>
        ))}
      </section>
      <FormCreate app_id={app_id} />
    </div>
  );
}
