import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { axios } from '../../../axios';
import { ComponentList } from '../../../components/component';
import { Layout } from '../../../components/Layout';
import { TextInput, Button } from '../../../components/shared';
import { usePage } from '../../../store/page';

export default function PageEdit({ page_id, referer }) {
  const [loading, setLoading] = useState(false);

  const { fetchById, pages, currentPage, setCurrentPage } = usePage();
  useEffect(async () => {
    if (pages.length) {
      setCurrentPage(pages.find((page) => page.id === page_id));
    } else {
      try {
        await fetchById(page_id);
      } catch (error) {
        toast.error(error.message);
      }
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onUpdate = async (data) => {
    if (loading) return;
    setLoading(true);
    try {
      await axios.patch(`pages/${page_id}`, {
        page: { ...data },
      });
      toast.success('Updated successfully!');
      fetchById(page_id);
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
    <Layout>
      <Link href={referer}>
        <a className='btn btn-link self-start underline underline-offset-2 mb-4'>
          <span>Back to app</span>
        </a>
      </Link>
      <section className='flex flex-col md:flex-row w-full space-y-8 md:space-x-5'>
        {currentPage ? (
          <>
            <form
              onSubmit={handleSubmit(onUpdate)}
              className='w-full md:w-5/12 px-3 py-5 rounded space-y-4 bg-white'
            >
              <header className='text-xl uppercase font-bold'>Edit page</header>
              <TextInput
                type='text'
                label='Page name'
                placeholder='Page name'
                defaultValue={currentPage.name}
                {...register('name')}
              />
              <TextInput
                type='number'
                placeholder='Page order'
                defaultValue={currentPage.page_order}
                label='Page order'
                helperText={
                  errors.page_order?.message ||
                  'Page order should be unique, it decided order of page in NavBar!'
                }
                {...register('page_order')}
              />
              <Button type='submit' className='btn-block' isLoading={loading}>
                Update
              </Button>
            </form>
            <ComponentList page_id={page_id} />
          </>
        ) : (
          <div>Loading page...</div>
        )}
      </section>
    </Layout>
  );
}

export async function getServerSideProps({
  query,
  req: {
    headers: { referer = '/' },
  },
}) {
  return {
    props: { page_id: query.id, referer }, // will be passed to the page component as props
  };
}
