import React, { useState } from 'react';
import { useTable, useFilters, useSortBy } from 'react-table';
import { TextInput } from '.';

export default function Table({ columns, data }) {
  const [filterInput, setFilterInput] = useState('');
  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter,
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
  );

  const handleFilterChange = (e) => {
    const value = e.target.value || undefined;
    setFilter(columns[0].accessor, value);
    setFilterInput(value);
  };

  // Render the UI for your table
  return (
    <>
      {/* TODO: needs to be fixed*/}
      {/* <TextInput
        value={filterInput}
        onChange={handleFilterChange}
        placeholder={'Search name'}
      /> */}
      <div className='overflow-x-auto overflow-y-scroll h-80 my-2'>
        <table className='table w-full table-zebra' {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, idx1) => (
              <tr key={idx1} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, idx2) => (
                  <th
                    key={idx2}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={
                      column.isSorted
                        ? column.isSortedDesc
                          ? 'sort-desc'
                          : 'sort-asc'
                        : ''
                    }
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, idx1) => {
              prepareRow(row);
              return (
                <tr key={idx1} {...row.getRowProps()}>
                  {row.cells.map((cell, idx2) => {
                    return (
                      <td key={idx2} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
