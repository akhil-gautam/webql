import { useEffect } from 'react';
import { Trash } from 'react-feather';
import toast from 'react-hot-toast';

import { FormElementsForm } from '.';
import { axios } from '../../axios';
import { useFormElement } from '../../store/form_element';

export default function FormList({ form_id }) {
  const { form_elements, fetchFormElements } = useFormElement();

  useEffect(() => {
    fetchFormElements(form_id);
  }, []);

  const deleteFormElement = async (id) => {
    try {
      await axios.delete(`form_elements/${id}`);
      await fetchFormElements(form_id);
      toast.success('Deleted successfully');
    } catch (e) {
      toast.error(e.message);
    }
  };

  if (form_elements.length === 0) {
    return (
      <div className='flex flex-col justify-center items-center pt-10 space-y-5 w-full md:px-10 border-t'>
        <span className='text-error-content font-semibold'>
          You haven&apos;t added any element to your form!
        </span>
        <FormElementsForm form_id={form_id} />
      </div>
    );
  }

  return (
    <div className='w-full flex flex-col items-center'>
      <FormElementsForm form_id={form_id} />
      <section className='w-full md:w-1/2 border border-dashed border-blue-600 mt-5 flex flex-col items-center p-5 space-y-4'>
        <header className='font-semibold'>Fields currently in the form</header>
        {form_elements.map(
          ({ id, label, field_type, db_column, field_order }) => (
            <div className='w-full card card-compact bg-white' key={id}>
              <div className='card-body'>
                <div className='card-title text-sm'>
                  Field order: {field_order}
                </div>
                <div className='font-semibold text-sm'>Label: {label}</div>
                <div className='font-semibold text-sm'>
                  Field type: {field_type}
                </div>
                <div className='font-semibold text-sm'>
                  Database column: {db_column}
                </div>
                <div className='card-actions self-end p-4 rounded bg-red-50 hover:bg-red-200 cursor-pointer'>
                  <Trash onClick={() => deleteFormElement(id)} />
                </div>
              </div>
            </div>
          )
        )}
      </section>
    </div>
  );
}
