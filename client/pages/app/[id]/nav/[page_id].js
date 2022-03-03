import axios from 'axios';
import ErrorPage from 'next/error';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import { API_URL } from '../../../../axios';
import { RenderComponents } from '../../../../components/nav';

import { useComponent } from '../../../../store/component';
import { useFormStore } from '../../../../store/form';
import { usePage } from '../../../../store/page';

export default function PageNavigator({ app_id, page_id, app }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const { pages, fetch: fetchPages } = usePage();
  const { forms, fetchForms } = useFormStore();
  const { components, fetch: fetchComponents } = useComponent();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    setLoggedIn(localStorage.getItem('auth-token')?.length > 0);
  }, []);

  useEffect(async () => {
    if (app.status === 'public_app' || loggedIn) {
      await fetchPages(app_id);
      await fetchForms(app_id);
    } else {
      setRedirect(true);
    }
  }, [loggedIn]);

  useEffect(async () => {
    if (app.status === 'public_app' || loggedIn) {
      await fetchComponents(page_id);
    } else {
      setRedirect(true);
    }
  }, [page_id, loggedIn]);

  // if there are no pages and redirect is set
  // it means the app is in private mode
  if (!pages[0]?.name && redirect) return <ErrorPage statusCode={400} />;

  return (
    <main className='min-h-screen w-screen flex flex-col'>
      <div className='navbar bg-neutral text-neutral-content mb-2 shadow-lg'>
        <div className='flex-none px-2 mx-4'>
          <Link href='/builder'>
            <a className='text-sm font-bold bg-gray-900 p-2'>WebQL</a>
          </Link>
        </div>
        <div className='flex-1 px-2 mx-2'>
          <div className='items-stretch hidden lg:flex space-x-1 flex-wrap'>
            {pages.map(({ id, name }) => (
              <Link href={`/app/${app_id}/nav/${id}`} key={id}>
                <a className='btn btn-ghost rounded-btn'>{name}</a>
              </Link>
            ))}
            {forms.map(({ id, title }) => (
              <Link href={`/app/${app_id}/form/${id}`} key={id}>
                <a className='btn btn-ghost rounded-btn' target='_blank'>
                  {title}
                </a>
              </Link>
            ))}
          </div>
        </div>
        {loggedIn && (
          <Link href='/builder'>
            <a className='btn'>Back to builder</a>
          </Link>
        )}
      </div>
      <section className='w-full h-full flex flex-col p-2 space-y-6 md:p-8 bg-gray-100'>
        <RenderComponents components={components} />
      </section>
    </main>
  );
}

export async function getServerSideProps({ query: { id, page_id } }) {
  try {
    const response = await axios.get(`${API_URL}apps/${id}`, {
      headers: { Accept: 'application/json' },
    });
    return {
      props: {
        app_id: id,
        page_id: page_id,
        app: response.data,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
