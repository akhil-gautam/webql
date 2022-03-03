import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Plus, XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { axios } from '../../axios';
import { useComponent } from '../../store/component';
import { Button, TextInput } from '../shared';

export default function Edit({
  component: {
    id,
    heading,
    component_type,
    component_order,
    component_query,
    settings,
  },
  isOpen,
  page_id,
  closeEdit: closeModal,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    component_type,
  });

  const { fetch: fetchComponents } = useComponent();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.patch(`components/${id}`, {
        component: { ...formData, ...data },
      });
      toast.success('Updated successfully!');
      await fetchComponents(page_id);
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

  const archiveComponent = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.patch(`components/${id}/archive`);
      await fetchComponents(page_id);
      closeModal();
      toast.success('Archived successfully');
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  function setComponentType(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='fixed inset-0 z-10 overflow-y-scroll'
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
              <div className='inline-block min-h-screen overflow-y-auto w-full max-w-2xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl'>
                <Dialog.Title
                  as='h3'
                  className='text-lg font-bold leading-6 text-gray-900 mb-5 flex justify-between items-center'
                >
                  <div>Edit component</div>
                  <XSquare className='cursor-pointer' onClick={closeModal} />
                </Dialog.Title>
                <Dialog.Description as='div'>
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
                    <TextInput
                      type='text'
                      label='Heading'
                      defaultValue={heading}
                      placeholder='Component heading(optional)'
                      {...register('heading')}
                    />
                    <TextInput
                      type='number'
                      label="Component's Order"
                      defaultValue={component_order}
                      placeholder='Component order(required & unique)'
                      helperText='Order decides the order in which it will be layed out in the UI.'
                      {...register('component_order')}
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
                        defaultValue={component_query}
                        {...register('component_query')}
                      ></textarea>
                      <label className='label mb-3'>
                        <span className='label-text-alt'>
                          Query should be based on the data source of your
                          application.
                        </span>
                      </label>
                    </div>
                    <div className=''>
                      <div className='label-text font-semibold text-gray-700'>
                        Component type
                      </div>
                      <div className='form-control hover:bg-slate-50'>
                        <label className='cursor-pointer label'>
                          <span className='label-text'>Table</span>
                          <input
                            type='radio'
                            className='radio'
                            value='datatable'
                            name='component_type'
                            defaultChecked={data.component_type === 'datatable'}
                            onChange={setComponentType}
                          />
                        </label>
                      </div>
                      <div className='form-control hover:bg-slate-50'>
                        <label className='cursor-pointer label'>
                          <span className='label-text'>Cards list</span>
                          <input
                            type='radio'
                            className='radio'
                            value='cards_list'
                            name='component_type'
                            onChange={setComponentType}
                            defaultChecked={
                              data.component_type === 'cards_list'
                            }
                          />
                        </label>
                      </div>
                      <div className='form-control hover:bg-slate-50'>
                        <label className='cursor-pointer label'>
                          <span className='label-text'>Chart</span>
                          <input
                            type='radio'
                            className='radio'
                            value='chart'
                            name='component_type'
                            onChange={setComponentType}
                            defaultChecked={data.component_type === 'chart'}
                          />
                        </label>
                      </div>
                    </div>
                    {data.component_type === 'datatable' && (
                      <label className='flex space-x-2 items-center mt-2'>
                        <input
                          type='checkbox'
                          className='checkbox'
                          defaultChecked={settings.row_click_enabled}
                          {...register('settings.row_click_enabled')}
                        />
                        <span className='label-text font-semibold text-gray-700'>
                          Enable clicking on table row to open detail&apos;s?
                        </span>
                      </label>
                    )}
                    {data.component_type === 'cards_list' && (
                      <section className='border-t border-dashed'>
                        <header className='text-sm text-blue-500 my-2 font-semibold'>
                          Configure the cards
                        </header>
                        <TextInput
                          label='Card header'
                          type='text'
                          placeholder='one of the column name from the component query'
                          defaultValue={settings.header}
                          helperText='Column name from component query will be used to fetch data!'
                          {...register('settings.header')}
                        />
                        <TextInput
                          type='text'
                          placeholder='one of the column name from the component query'
                          helperText='If the value comes out to be an image URL, we will show the image.'
                          label='Card body'
                          defaultValue={settings.body}
                          {...register('settings.body')}
                        />
                        <label className='flex space-x-2 items-center mt-3'>
                          <input
                            type='checkbox'
                            className='checkbox'
                            defaultChecked={settings.footer_action_enabled}
                            {...register('settings.footer_action_enabled')}
                          />
                          <span className='label-text font-semibold text-gray-700'>
                            Show VIEW/EDIT button in card&apos;s footer?
                          </span>
                        </label>
                      </section>
                    )}
                    {data.component_type === 'chart' && (
                      <>
                        <TextInput
                          label='Title of chart'
                          type='text'
                          placeholder='Title'
                          defaultValue={settings.title}
                          {...register('settings.title')}
                        />
                        <TextInput
                          label="Column name for X-axis's data"
                          type='text'
                          defaultValue={settings.xData}
                          placeholder='one of the column name from the component query'
                          helperText='Column name from component query will be used to fetch data!'
                          {...register('settings.xData')}
                        />
                        <TextInput
                          label='Label for X-axis'
                          type='text'
                          placeholder='label'
                          defaultValue={settings.xLabel}
                          {...register('settings.xLabel')}
                        />
                        <TextInput
                          label='Label for Y-axis'
                          type='text'
                          placeholder='label'
                          defaultValue={settings.yLabel}
                          {...register('settings.yLabel')}
                        />
                        <TextInput
                          label="Column name for Y-axis's data"
                          type='text'
                          defaultValue={settings.yData}
                          placeholder='one of the column name from the component query'
                          helperText='Column name from component query will be used to fetch data!'
                          {...register('settings.yData')}
                        />
                      </>
                    )}
                    <div className='items-center space-y-2 md:justify-between w-full flex flex-col md:flex-row border-t pt-4'>
                      <Button
                        className='btn-error btn-wide'
                        isLoading={loading}
                        onClick={archiveComponent}
                      >
                        Archive
                      </Button>

                      <Button
                        type='submit'
                        className='btn-wide'
                        isLoading={loading}
                      >
                        Update
                      </Button>
                    </div>
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
