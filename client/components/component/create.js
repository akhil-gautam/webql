import { Dialog, Tab, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Plus, XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { axios } from '../../axios';
import { useComponent } from '../../store/component';
import { Button, TextInput } from '../shared';

export default function Create({ page_id }) {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});

  const { fetch: fetchComponents } = useComponent();

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

  function setComponentType(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function onSubmit(formData) {
    if (loading) return;
    setLoading(true);
    try {
      await axios.post('components', {
        component: { ...formData, ...data, page_id },
      });
      toast.success('Created successfully!');
      fetchComponents(page_id);
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
  }

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='btn btn-sm space-x-3'
      >
        <span>Component</span>
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
              <div className='inline-block w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-bold leading-6 text-gray-900 mb-5 flex justify-between items-center'
                >
                  <div>New component</div>
                  <XSquare
                    className='cursor-pointer'
                    onClick={() => setIsOpen(false)}
                  />
                </Dialog.Title>
                <Dialog.Description as='div'>
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                    <TextInput
                      type='text'
                      label='Heading'
                      placeholder='Component heading(optional)'
                      {...register('heading')}
                    />
                    <TextInput
                      type='number'
                      label="Component's Order"
                      placeholder='Component order(required & unique)'
                      helperText={
                        errors.component_order?.message ||
                        'Order decides the order in which it will be layed out in the UI.'
                      }
                      {...register('component_order', {
                        required: 'Component order is required & unique',
                      })}
                    />
                    <div className='form-control'>
                      <label className='label'>
                        <span className='label-text font-semibold text-gray-700'>
                          Query
                        </span>
                      </label>
                      <textarea
                        className='textarea h-24 textarea-bordered'
                        placeholder='Query for the componnet'
                        {...register('component_query', {
                          required:
                            'Query is required to add data to your component!',
                        })}
                      ></textarea>
                      <label className='label mb-3'>
                        <span className='label-text-alt'>
                          Query should be based on the data source of your
                          application.
                        </span>
                      </label>
                    </div>
                    <div className=''>
                      <div className='label-text font-semibold text-gray-700 mb-2'>
                        Component type
                      </div>
                      <div className='form-control mb-1'>
                        <label className='cursor-pointer label rounded border border-gray-100 hover:bg-gray-100'>
                          <span className='label-text'>Table</span>
                          <input
                            type='radio'
                            className='radio'
                            name='component_type'
                            onClick={setComponentType}
                            value='datatable'
                          />
                        </label>
                      </div>
                      <div className='form-control mb-1'>
                        <label className='cursor-pointer label rounded border border-gray-100 hover:bg-gray-100'>
                          <span className='label-text'>Cards list</span>
                          <input
                            type='radio'
                            className='radio'
                            value='cards_list'
                            name='component_type'
                            onClick={setComponentType}
                          />
                        </label>
                      </div>
                      <div className='form-control'>
                        <label className='cursor-pointer label rounded border border-gray-100 hover:bg-gray-100'>
                          <span className='label-text'>Chart</span>
                          <input
                            type='radio'
                            className='radio'
                            value='chart'
                            name='component_type'
                            onClick={setComponentType}
                          />
                        </label>
                      </div>
                      {errors.component_type && (
                        <label className='label mb-2'>
                          <span className='label-text-alt'>
                            errors.component_type?.message
                          </span>
                        </label>
                      )}
                    </div>
                    <header className='py-2 label-text font-semibold text-gray-700 underline underline-offset-1'>
                      Configure the component
                    </header>
                    {data.component_type === 'datatable' && (
                      <label className='flex space-x-2 items-center mt-2'>
                        <input
                          type='checkbox'
                          className='checkbox'
                          {...register('settings.row_click_enabled')}
                        />
                        <span className='label-text font-semibold text-gray-700'>
                          Enable clicking on table row to open detail&apos;s?
                        </span>
                      </label>
                    )}

                    {data.component_type === 'cards_list' && (
                      <>
                        <TextInput
                          label='Card header'
                          type='text'
                          placeholder='one of the column name from the component query'
                          helperText='Column name from component query will be used to fetch data!'
                          {...register('settings.header')}
                        />
                        <TextInput
                          type='text'
                          placeholder='one of the column name from the component query'
                          helperText='If the value comes out to be an image URL, we will show the image.'
                          label='Card body'
                          {...register('settings.body')}
                        />
                        <label className='flex space-x-2 items-center mt-3'>
                          <input
                            type='checkbox'
                            className='checkbox'
                            {...register('settings.footer_action_enabled')}
                          />
                          <span className='label-text font-semibold text-gray-700'>
                            Show VIEW/EDIT button in card&apos;s footer?
                          </span>
                        </label>
                      </>
                    )}

                    {data.component_type === 'chart' && (
                      <>
                        <TextInput
                          label='Title of chart'
                          type='text'
                          placeholder='Title'
                          {...register('settings.title')}
                        />
                        <TextInput
                          label="Column name for X-axis's data"
                          type='text'
                          placeholder='one of the column name from the component query'
                          helperText='Column name from component query will be used to fetch data!'
                          {...register('settings.xData')}
                        />
                        <TextInput
                          label='Label for X-axis'
                          type='text'
                          placeholder='label'
                          {...register('settings.xLabel')}
                        />
                        <TextInput
                          label="Column name for X-axis's data"
                          type='text'
                          placeholder='one of the column name from the component query'
                          helperText='Column name from component query will be used to fetch data!'
                          {...register('settings.yData')}
                        />
                        <TextInput
                          label='Label for Y-axis'
                          type='text'
                          placeholder='label'
                          {...register('settings.yLabel')}
                        />
                      </>
                    )}

                    <Button type='submit' className='w-full'>
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
