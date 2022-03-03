import Link from 'next/link';
import { Edit, ExternalLink } from 'react-feather';
import toast from 'react-hot-toast';
import { CreateApp } from '.';
import { axios } from '../../axios';
import { useApp } from '../../store/app';
import { Button } from '../shared';

export default function Applist({ refetch }) {
  const { apps } = useApp();

  const updateApp = async (data, id) => {
    try {
      await axios.patch(`apps/${id}`, { app: data });
      refetch();
      toast.success('Updated successfully');
    } catch (e) {
      toast.error('Something went wrong!');
    }
  };

  const archiveApp = async (id) => {
    try {
      await axios.patch(`apps/${id}/archive`);
      refetch();
      toast.success('Archived successfully');
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (apps.length == 0) {
    return (
      <div className='flex flex-col items-center justify-center px-4 py-16 bg-white rounded-lg space-y-5'>
        <div className='font-medium tracking-wide text-xl text-red-500'>
          You haven&apos;t created any application yet!
        </div>
        <CreateApp refetch={refetch} />
      </div>
    );
  }
  return (
    <>
      <h3 className='font-semibold text-2xl mb-2'>Applications</h3>
      <div className='grid md:grid-cols-3 gap-4 mb-10'>
        {apps.map(({ id, name, status }) => (
          <div
            className={`card h-36 bg-white shadow-xl transition-all hover:ring-1 ring-gray-700 hover:shadow-md`}
            key={id}
          >
            <div className='card-body py-6'>
              <div className='flex flex-col justify-between h-full'>
                <div className='capitalize text-lg font-semibold'>{name}</div>
                <div className='flex items-center justify-between border-t pt-3'>
                  <Button
                    className='badge-error btn-sm btn-ghost'
                    onClick={() => archiveApp(id)}
                  >
                    Archive
                  </Button>
                  <div className='flex space-x-3 items-center'>
                    <label
                      className='cursor-pointer label'
                      title='Toggle application status'
                    >
                      <input
                        type='checkbox'
                        checked={status === 'public_app'}
                        onChange={() =>
                          updateApp(
                            {
                              status:
                                status === 'public_app'
                                  ? 'private_app'
                                  : 'public_app',
                            },
                            id
                          )
                        }
                        className='toggle toggle-primary'
                      />
                    </label>
                    <Link href={`/builder/app/${id}`}>
                      <a title='Edit'>
                        <Edit />
                      </a>
                    </Link>
                    <Link href={`/app/${id}/nav`}>
                      <a title='Edit' rel='noopener noreferrer' target='_blank'>
                        <ExternalLink />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        <CreateApp refetch={refetch} />
      </div>
    </>
  );
}
