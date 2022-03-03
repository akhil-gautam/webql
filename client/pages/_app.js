import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return getLayout(
    <>
      <Toaster
        toastOptions={{
          style: {
            background: '#000',
            color: '#fff',
            boxShadow: '0 0 20px rgba(0, 0, 200, 0.8), 0 0 30px rgba(255, 255, 255, 0.8)',
          },
        }}
      />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
