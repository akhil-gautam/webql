import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState, useMemo } from 'react';
import { Monitor, XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { axios } from '../../axios';
import { Button, Table } from '../shared';

export default function TestQuery({ data_source_id }) {
  let [isOpen, setIsOpen] = useState(false);
  const [queryResult, setQueryResult] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await axios.post('queries/run', {
        ...data,
        data_source_id,
      });
      setQueryResult(response.result);

      setColumns(
        Object.keys(response.result[0]).map((key) => ({
          Header: key.toLocaleUpperCase(),
          accessor: key,
        }))
      );
      toast.success('Execution successfully!');
    } catch (e) {
      e.response?.data &&
        Object.values(e.response?.data)
          .filter((el) => typeof el != 'object')
          .forEach(toast.error);
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        title='Open database console'
        className='btn btn-sm'
      >
        <Monitor />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-auto'
          onClose={closeModal}
        >
          <div className='min-h-screen px-4 text-center'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <Dialog.Overlay className='fixed inset-0 bg-gray-900 opacity-80' />
            </Transition.Child>
            <span
              className='inline-block h-screen align-middle'
              aria-hidden='true'
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <div className='inline-block w-full md:max-w-4xl p-2 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title className='flex justify-end mb-4'>
                  <XSquare className='cursor-pointer' onClick={closeModal} />
                </Dialog.Title>
                <Dialog.Description as='div'>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='form-control'>
                      <textarea
                        className='textarea h-48 bg-gray-900 text-white'
                        placeholder='$'
                        {...register('data_source_query')}
                      ></textarea>
                    </div>

                    <Button type='submit' className='w-full mt-4'>
                      Execute
                    </Button>
                  </form>
                  {queryResult.length ? (
                    <Table columns={columns} data={queryResult} />
                  ) : (
                    <div className='text-error-content font-semibold text-center p-5'>
                      No data to show!
                    </div>
                  )}
                </Dialog.Description>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
