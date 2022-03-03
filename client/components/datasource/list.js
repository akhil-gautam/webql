import { useState } from 'react';
import { Edit, Settings } from 'react-feather';
import toast from 'react-hot-toast';
import { CreateDS, DBConsole, EditDS } from '.';
import { axios } from '../../axios';
import { useDatasource } from '../../store/datasource';
import { Button } from '../shared';

export default function DSList({ refetch }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDS, setCurrentDS] = useState();
  const { data_sources } = useDatasource();

  const handleEdit = (data_source) => {
    setCurrentDS(data_source);
    setIsOpen(true);
  };

  const handleAutoApp = async (data_source) => {
    try {
      await axios.post(`data_sources/${data_source.id}/auto_create_pages`);
      toast.success('Generated successfully!!');
      await refetch();
      // TODO: redirect user to the newly created application
    } catch (error) {
      toast.error(error?.message);
    }
  };

  if (data_sources.length == 0) {
    return (
      <div className='flex flex-col items-center bg-white justify-center space-y-5 px-4 py-16 rounded mt-5'>
        <div className='font-medium tracking-wide text-xl text-red-500'>
          You haven&apos;t added any data source yet!
        </div>
        <CreateDS refetch={refetch} />
      </div>
    );
  }

  return (
    <>
      {isOpen && (
        <EditDS
          data_source={currentDS}
          refetch={refetch}
          isOpen={isOpen}
          closeModal={() => setIsOpen(false)}
        />
      )}
      <h3 className='font-semibold text-2xl mb-2'>Data sources</h3>
      <div className='grid md:grid-cols-3 gap-4 mb-8'>
        {data_sources.map(({ id, source, settings }, idx) => (
          <div
            className='card card-compact bg-white shadow-xl transition-all hover:ring-1 ring-gray-700 hover:shadow-md'
            key={id}
          >
            <div className='card-body'>
              <h2 className='card-title capitalize'>{source}</h2>
              {Object.keys(settings).map((key, index) => (
                <div className='flex space-x-1 text-sm' key={index}>
                  <span className='capitalize font-semibold'>{key}:</span>
                  <span>
                    {key === 'password' ? '**********' : settings[key]}
                  </span>
                </div>
              ))}
              <div className='card-actions justify-between items-center md:border-none border-t md:mt-4 md:pt-0 mt-4 pt-4'>
                <div>
                  <Button
                    className='btn-sm btn-warning font-light'
                    onClick={() => handleAutoApp(data_sources[idx])}
                  >
                    Auto Generate app
                  </Button>
                </div>
                <div>
                  <Button
                    className='btn-info btn-sm mr-4'
                    onClick={() => handleEdit(data_sources[idx])}
                  >
                    <Edit />
                  </Button>
                  <DBConsole data_source_id={id} />
                </div>
              </div>
            </div>
          </div>
        ))}
        <CreateDS refetch={refetch} />
      </div>
    </>
  );
}
