import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'timestamp', headerName: 'Timestamp', width: 200 },
  { field: 'date', headerName: 'Date', width: 150 },
  { field: 'userEmail', headerName: 'User Email', width: 200 },
  { field: 'result', headerName: 'Result', width: 150 },
];

const Table = ({ data }) => {
  // Map the data to rows for the DataGrid
  const rows = data.map((item) => ({
    id: item.id,
    timestamp: new Date(item.timestamp.seconds * 1000).toLocaleString(),
    date: item.date,
    userEmail: item.userEmail,
    result: item.result,
  }));

  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        pageSize={5}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
};

export default Table;
