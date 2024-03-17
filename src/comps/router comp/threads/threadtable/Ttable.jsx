import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink from React Router
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function Ttable({ data }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Thread</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right">Author</TableCell>
            <TableCell align="right">Replies</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row">
                {/* Wrap the thread heading with NavLink */}
                <NavLink to={`/thread/${row.id}`} activeClassName="active">{row.heading}</NavLink>
              </TableCell>
              <TableCell align="right">{row.createdAt}</TableCell>
              <TableCell align="right">{row.createdBy}</TableCell>
              {/* <TableCell align="right">{row.replies}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
