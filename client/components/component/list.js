import { useEffect, useState } from 'react';
import { Edit } from 'react-feather';
import { ComponentCreate, ComponentEdit } from '.';
import { useComponent } from '../../store/component';

export default function ComponentList({ page_id }) {
  const [isOpen, setIsOpen] = useState(false);
  const [editComponent, setEditComponent] = useState(null);
  const { components, fetch: fetchComponents } = useComponent();

  useEffect(() => {
    fetchComponents(page_id);
  }, []);

  const openEditForm = (component) => {
    setEditComponent(component);
    setIsOpen(true);
  };

  return (
    <>
      {isOpen && (
        <ComponentEdit
          isOpen={true}
          closeEdit={() => setIsOpen(false)}
          component={editComponent}
          page_id={page_id}
        />
      )}
      <div className='w-full md:w-7/12 p-5 flex flex-col items-center bg-white rounded'>
        <section className='w-full mb-5'>
          <h2 className='font-semibold text-xl mb-3'>
            Component available on the page
          </h2>
          {components.length ? (
            <div className='overflow-x-auto'>
              <table className='table w-full table-zebra'>
                <thead>
                  <tr>
                    <th></th>
                    <th>Order</th>
                    <th>Type</th>
                    <th>Query</th>
                  </tr>
                </thead>
                <tbody>
                  {components.map(
                    (
                      { id, component_type, component_order, component_query },
                      indx
                    ) => (
                      <tr key={id}>
                        <td>
                          <Edit
                            className='cursor-pointer'
                            onClick={() => openEditForm(components[indx])}
                          />
                        </td>
                        <td>{component_order}</td>
                        <td>
                          <span className='badge badge-warning'>
                            {component_type}
                          </span>
                        </td>
                        <td>
                          <code>{component_query}</code>
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <div className='flex flex-col justify-center items-center space-y-5 mb-5'>
              <div className='text-error-content'>
                Please add some components to your page!
              </div>
            </div>
          )}
        </section>
        <ComponentCreate page_id={page_id} />
      </div>
    </>
  );
}
