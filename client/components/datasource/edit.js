import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { axios } from '../../axios';
import { Button, TextInput } from '../shared';

export default function Edit({
  refetch,
  data_source: { id, source, settings },
  isOpen,
  closeModal,
}) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, watch } = useForm();

  const watchSource = watch('source') || source;

  console.log(watchSource);

  const onSubmit = async (data) => {
    if (loading) return;
    setLoading(true);

    try {
      await axios.patch(`data_sources/${id}`, {
        data_source: data,
      });
      refetch();
      toast.success('Updated successfully!');
      closeModal();
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
              <div className='inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-bold leading-6 text-gray-900 mb-5 flex justify-between items-center'
                >
                  <div>Edit data source</div>
                  <XSquare className='cursor-pointer' onClick={closeModal} />
                </Dialog.Title>
                <Dialog.Description as='div'>
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                    <label className='w-full form-control space-y-2'>
                      <span className='label-text font-semibold text-gray-700'>
                        Select the data source
                      </span>
                      <select
                        className='select select-bordered w-full'
                        defaultValue={source}
                        {...register('source')}
                      >
                        <option disabled='disabled'>
                          Choose the type of data source
                        </option>
                        <option value='postgres'>Postgres</option>
                        <option value='mysql'>MySQL</option>
                      </select>
                    </label>
                    {watchSource === 'mysql' ? (
                      <TextInput
                        type='text'
                        defaultValue={settings?.dbname}
                        label='Database name'
                        placeholder='Database name'
                        {...register('settings.database')}
                      />
                    ) : (
                      <TextInput
                        type='text'
                        defaultValue={settings?.dbname}
                        label='Database name'
                        placeholder='Database name'
                        {...register('settings.dbname')}
                      />
                    )}
                    <TextInput
                      type='text'
                      label='Username'
                      defaultValue={settings?.user}
                      placeholder='Database user'
                      {...register('settings.user')}
                    />
                    <TextInput
                      type='password'
                      label='Password'
                      defaultValue={settings?.password}
                      placeholder='Password will be saved in plaintext for now!'
                      {...register('settings.password')}
                    />
                    <TextInput
                      type='text'
                      placeholder='Host(ex: localhost)'
                      label='Host'
                      defaultValue={settings?.host}
                      {...register('settings.host')}
                    />
                    <TextInput
                      type='text'
                      placeholder='Port(ex: 5432)'
                      label='Port'
                      defaultValue={settings?.port}
                      {...register('settings.port')}
                    />
                    <Button
                      type='submit'
                      className='w-full mt-4'
                      isLoading={loading}
                    >
                      Update
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
