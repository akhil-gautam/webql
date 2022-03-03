import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { axios } from '../../axios';

export default function Chart({ component: { id, heading = '', settings } }) {
  const [isLoading, setLoading] = useState(true);
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
    <div className='p-4 shadow rounded-xl bg-white'>
      {heading.length && (
        <header className='font-bold text-slate-800 mb-4 text-xl px-5'>
          {heading}
        </header>
      )}
      <ResponsiveContainer width='95%' height={400}>
        <BarChart
          height={300}
          data={queryResult}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis
            dataKey={settings.xData}
            label={{
              value: settings.xLabel,
              position: 'bottom',
              offset: 0,
            }}
          />
          <YAxis
            label={{
              value: settings.yLabel,
              angle: -90,
              position: 'insideLeft',
            }}
          />
          <Tooltip />
          <Bar
            dataKey={settings.yData}
            label={settings.yLabel}
            fill='#6c5fb3'
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
