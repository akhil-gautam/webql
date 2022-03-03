import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { axios } from '../../axios';
import { Details } from '../datasource';

export default function DataTable({ component: { id, heading, settings } }) {
  const [isLoading, setLoading] = useState(true);
  const [queryResult, setQueryResult] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [currentData, setCurrentData] = useState(null);

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

  let length;

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

      <div className='shadow p-2 bg-white rounded-xl'>
        <header className='font-bold text-slate-800 mb-4 text-xl px-5'>
          {heading}
        </header>
        <div className='overflow-x-scroll overflow-y-scroll h-96 p-4'>
          <table className='table w-full table-zebra'>
            <thead>
              <tr>
                {Object.keys(queryResult[0]).map((key) => (
                  <th key={key}>{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {queryResult.map((result, idx) => (
                <tr
                  key={idx}
                  className='cursor-pointer'
                  onClick={
                    settings?.row_click_enabled
                      ? () => showDetails(result)
                      : () => {}
                  }
                >
                  {Object.keys(result).map((key) => (
                    <td key={key}>{result[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h6 className='text-right text-blue-600 text-sm mt-2'>
          Loaded {length} results...
        </h6>
      </div>
    </>
  );
}
