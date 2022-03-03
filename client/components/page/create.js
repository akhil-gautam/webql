import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Plus, XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { axios } from '../../axios';
import { usePage } from '../../store/page';
import { Button, TextInput } from '../shared';

export default function Create({ app_id }) {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const { fetch: fetchPages } = usePage();

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
      await axios.post('pages', {
        page: { ...data, app_id: app_id },
      });
      toast.success('Created successfully!');
      fetchPages(app_id);
      setIsOpen(false);
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
      <button
        type='button'
        onClick={openModal}
        className='btn btn-block space-x-3'
      >
        <span>Page</span>
        <Plus />
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
                  <div>New page</div>
                  <XSquare
                    className='cursor-pointer'
                    onClick={() => setIsOpen(false)}
                  />
                </Dialog.Title>
                <Dialog.Description>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                      type='text'
                      placeholder='Page name'
                      {...register('name')}
                    />
                    <TextInput
                      type='number'
                      placeholder='Page order'
                      helperText={
                        errors.page_order?.message ||
                        'Page order should be unique, it decided order of page in NavBar!'
                      }
                      {...register('page_order')}
                    />
                    <Button
                      type='submit'
                      className='w-full mt-4'
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
