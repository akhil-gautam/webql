import Image from 'next/image';
import Router from 'next/router';
import { useEffect } from 'react';
import { Loader } from 'react-feather';
import circleImage from '../../../images/2circlebg.png';

import { usePage } from '../../../store/page';

export default function AppNavigation({ app_id }) {
  const { pages, fetch: fetchPages } = usePage();
  useEffect(async () => {
    await fetchPages(app_id);
  }, []);
  if (pages.length) {
    Router.push(`/app/${app_id}/nav/${pages[0].id}`);
  }
  return (
    <>
      <Image src={circleImage} layout='fill' />
      <div className='h-screen w-screen flex flex-col justify-center items-center backdrop-filter backdrop-blur-3xl bg-sky-100 bg-opacity-70'>
        <Loader className='animate-spin mb-5' />
        <div className='font-bold'>Loading your pages...</div>
      </div>
    </>
  );
}

export async function getServerSideProps({ query: { id } }) {
  return {
    props: {
      app_id: id,
    },
  };
}
