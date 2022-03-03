import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { Plus, XSquare } from 'react-feather';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { axios } from '../../axios';
import { useFormElement } from '../../store/form_element';
import { Button, TextInput } from '../shared';

const defaultValue = {
  max: undefined,
  min: undefined,
  pattern: undefined,
  maxLength: undefined,
  minLength: undefined,
  required: undefined,
  element_order: undefined,
  field_type: 'text',
  label: '',
  placeholder: '',
  helper_text: '',
  db_column: '',
  options: {},
};

export default function Form({ form_id }) {
  let [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editFormData, setFormData] = useState(defaultValue);

  const { fetchFormElements } = useFormElement();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const watchType = watch('field_type');

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
      await axios.post('form_elements', {
        form_element: { ...data, form_id: form_id },
      });
      toast.success('Created successfully!');
      fetchFormElements(form_id);
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
      <button type='button' onClick={openModal} className='btn space-x-3'>
        <span>Form element</span>
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
                  <div>New element</div>
                  <XSquare className='cursor-pointer' onClick={closeModal} />
                </Dialog.Title>
                <Dialog.Description>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <TextInput
                      label='Field order in the form'
                      type='number'
                      placeholder="Field's order in the form"
                      helperText="It will decide this field's placement in the form."
                      defaultValue={editFormData.element_order}
                      {...register('field_order')}
                    />
                    <TextInput
                      label='Field label'
                      type='text'
                      placeholder="Field's label"
                      helperText='It will be shown as label above the input field.'
                      defaultValue={editFormData.label}
                      {...register('label')}
                    />
                    <TextInput
                      label='Placeholder text'
                      type='text'
                      placeholder='I am a placeholder'
                      defaultValue={editFormData.placeholder}
                      {...register('placeholder')}
                    />
                    <TextInput
                      label='Helper text'
                      type='text'
                      placeholder='Helper text to show'
                      helperText='It will be shown like me!'
                      defaultValue={editFormData.helper_text}
                      {...register('helper_text')}
                    />
                    <TextInput
                      label="Database table's column"
                      type='text'
                      placeholder="Column name to save field's value to"
                      helperText='Data entered in the field will be saved in the above column of the queries table.'
                      defaultValue={editFormData.label}
                      {...register('db_column')}
                    />
                    <label className='flex space-x-2 items-center my-4'>
                      <input
                        type='checkbox'
                        className='checkbox checkbox-primary'
                        defaultChecked={defaultValue.required}
                        {...register('required')}
                      />
                      <span className='label-text font-semibold text-gray-700'>
                        Is this a required field?
                      </span>
                    </label>
                    <label className='form-control space-y-1'>
                      <span className='label-text font-semibold text-gray-700'>
                        Field type
                      </span>
                      <select
                        aria-label='Select type of field'
                        className='input input-bordered input-primary font-semibold'
                        defaultValue={editFormData.type}
                        {...register('field_type')}
                      >
                        <option value='text'>Text</option>
                        <option value='email'>Email</option>
                        <option value='password'>Password</option>
                        <option value='textarea'>Textarea</option>
                        <option value='select'>Select</option>
                        <option value='checkbox'>Checkbox</option>
                        <option value='radio'>Radio</option>
                        <option value='number'>Number</option>
                        <option value='tel'>Phone number</option>
                        <option value='url'>URL</option>
                        <option value='time'>Time</option>
                        <option value='datetime'>Datetime</option>
                      </select>
                    </label>
                    {['select', 'radio'].includes(watchType) && (
                      <TextInput
                        label='Please enter your options'
                        type='text'
                        placeholder='Enter the options separated by ;'
                        helperText='For example: manager; employee; software developer; security'
                        defaultValue={editFormData.label}
                        {...register('settings.options')}
                      />
                    )}
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
