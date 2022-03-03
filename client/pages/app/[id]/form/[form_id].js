import axios from 'axios';
import Router from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { API_URL, axios as myAxios } from '../../../../axios';
import RenderFormFields from '../../../../components/form_elements/RenderFormFields';
import { Button } from '../../../../components/shared';

export default function FormDetails({ form, form_elements }) {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  async function onSubmit(data) {
    if (loading) return;
    setLoading(true);
    try {
      await myAxios.post(`forms/${form.id}/exec_query`, data);
      toast.success('Submitted successfully!');
      Router.push('/app/form_success');
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <main className='min-h-screen w-screen bg-blue-50 flex flex-col justify-center items-center px-4 py-10'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='space-y-4 bg-white rounded-md w-full md:w-1/2 p-10 shadow-md shadow-purple-300'
      >
        <header className='font-bold text-xl underline underline-offset-2 text-gray-700'>
          {form.title}
        </header>
        <RenderFormFields form_elements={form_elements} register={register} />
        <Button
          type='submit'
          className='btn-primary btn-block'
          isLoading={loading}
        >
          Submit
        </Button>
      </form>
    </main>
  );
}

export async function getServerSideProps({ query: { id, form_id } }) {
  let form;
  let form_elements;
  try {
    form = await axios.get(`${API_URL}forms/${form_id}`, {
      headers: { Accept: 'application/json' },
    });
    form_elements = await axios.get(
      `${API_URL}forms/${form_id}/form_elements`,
      {
        headers: { Accept: 'application/json' },
      }
    );
  } catch (e) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      app_id: id,
      form: form.data,
      form_elements: form_elements.data,
    },
  };
}
