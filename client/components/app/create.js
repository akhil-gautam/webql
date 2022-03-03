import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Plus, XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { axios } from '../../axios';
import { useDatasource } from '../../store/datasource';
import { TextInput, Button } from '../shared';

export default function Create({ refetch }) {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data_sources } = useDatasource();

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
      const response = await axios.post('apps', data);
      await refetch();
      setIsOpen(false);
      toast.success('Created successfully!');
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

  return (
    <>
      <div className='rounded-2xl hover:shadow-2xl transition duration-1000 bg-white flex justify-center items-center py-10'>
        <button type='button' onClick={openModal} className='btn space-x-3'>
          <span>Application</span>
          <Plus />
        </button>
      </div>

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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className='inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-bold leading-6 text-gray-900 mb-5 flex justify-between items-center'
                >
                  <div>New Application</div>
                  <XSquare
                    className='cursor-pointer'
                    onClick={() => setIsOpen(false)}
                  />
                </Dialog.Title>
                <Dialog.Description>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <select
                      className='select select-bordered w-full mb-4'
                      {...register('data_source_id')}
                    >
                      <option disabled='disabled' selected='selected'>
                        Choose your data source
                      </option>
                      {data_sources.map(
                        ({ id, settings: { database, dbname } }) => (
                          <option key={id} value={id}>
                            {dbname || database}
                          </option>
                        )
                      )}
                    </select>
                    <TextInput
                      type='text'
                      placeholder='Application name'
                      helperText={
                        errors.name?.message ||
                        'Only unique and alphanumeric characters with - & _ are allowed.'
                      }
                      {...register('name', {
                        pattern: {
                          value: '^[a-zA-Z0-9_-]*$',
                          message:
                            'Only Alphanumeric characters with - & _ are allowed.',
                        },
                      })}
                    />
                    <Button
                      type='submit'
                      className='w-full'
                      isLoading={loading}
                    >
                      Create
                    </Button>
                  </form>
                </Dialog.Description>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
