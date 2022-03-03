import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axios } from '../../axios';
import { Details } from '../datasource';
import { Button } from '../shared';

export default function CardsList({ component: { id, heading, settings } }) {
  const [isLoading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);
  const [queryResult, setQueryResult] = useState([]);

  useEffect(() => {
    async function fetchResult() {
      try {
        const response = await axios.get(`components/${id}/exec_query`);
        setQueryResult(response.result);
      } catch (e) {
        e.response?.data &&
          Object.values(e.response?.data)
            .filter((el) => typeof el != 'object')
            .forEach(toast.error);
      } finally {
        setLoading(false);
      }
    }
    fetchResult();
  }, []);

  const showDetails = (data) => {
    setIsOpen(true);
    setCurrentData(data);
  };

  if (isLoading) {
    return <div>Loading query results</div>;
  }

  if (
    !queryResult ||
    ((length = queryResult.length), queryResult.length === 0)
  ) {
    return (
      <div className='text-error-content font-semibold text-center text-xl'>
        No data available for component&apos;s query!
      </div>
    );
  }

  return (
    <>
      {isOpen && (
        <Details data={currentData} onClose={() => setIsOpen(false)} />
      )}
      <div className='bg-white p-4 shadow rounded-xl overflow-y-scroll h-96'>
        <header className='font-bold text-slate-800 mb-4 text-xl pl-1'>
          {heading}
        </header>
        <section className='grid md:grid-cols-3 gap-8'>
          {queryResult.map((result, idx) => (
            <article
              className='card rounded-xl shadow-lg transition-all hover:shadow-sm hover:ring-1 ring-gray-700'
              key={idx}
            >
              <div className='card-body'>
                <h2 className='card-title'>{result[settings.header]}</h2>
                <div>{result[settings.body]}</div>
                {settings.footer_action_enabled && (
                  <Button
                    className='btn-block rounded-none mt-4'
                    onClick={() => showDetails(result)}
                  >
                    Details
                  </Button>
                )}
              </div>
            </article>
          ))}
        </section>
      </div>
    </>
  );
}
