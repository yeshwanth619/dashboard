import React, { useState, useEffect } from 'react';
import { useTable, useSortBy } from 'react-table';
import './table.css';
import { noDataAvailable } from '../../Constants/constants';

const Table = ({ data }) => {
  // State to store the formatted data
  const [formattedData, setFormattedData] = useState([]);

  useEffect(() => {
    // Process the data to format the timestamp and update the state
    const newData = data.map((entry) => ({
      userId: entry.userId,
      timestamp: new Date(entry.timestamp), // Convert to Date object
      status: entry.status,
      errorMessage: entry.errorMessage,
      requestData: entry.requestData,
      responseData: entry.responseData,
    }));

    setFormattedData(newData);
  }, [data]);

  // Define the table columns
  const columns = React.useMemo(
    () => [
      {
        Header: 'User ID',
        accessor: 'userId',
      },
      {
        Header: 'Timestamp',
        accessor: 'timestamp',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Error Message',
        accessor: 'errorMessage',
      },
      {
        Header: 'Request',
        accessor: 'requestData',
      },
      {
        Header: 'Response',
        accessor: 'responseData',
      },
    ],
    []
  );

  // Initialize the table using react-table and enable sorting
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data: formattedData, // Use the formatted data
      initialState: {
        sortBy: [{ id: 'timestamp', desc: false }],
      },
    },
    useSortBy
  );

  return (
    <div className="table-container" style={{ height: '400px', overflowY: 'scroll' }}>
      {/* Render a message when there is no data available */}
      {formattedData.length === 0 ? (
        <div className="no-data-message">{noDataAvailable}</div>
      ) : (
        <table {...getTableProps()} className="table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className={column.className}
                  >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className={rowIndex % 2 === 0 ? 'even-row' : 'odd-row'}
                >
                  {row.cells.map((cell) => (
                    <td
                      {...cell.getCellProps()}
                      className={`table-cell ${cell.column.className}`}
                      title={
                        cell.value instanceof Date
                          ? cell.value.toLocaleTimeString()
                          : cell.value // Render other values as is
                      }
                    >
                      {cell.value instanceof Date
                        ? cell.value.toLocaleTimeString()
                        : cell.render('Cell')} {/* Render other values as is */}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Table;
