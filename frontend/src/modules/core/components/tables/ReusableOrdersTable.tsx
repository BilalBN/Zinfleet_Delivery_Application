import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Pagination,
  Box,
} from '@mui/material';
import styled from '@emotion/styled';
import { Column } from '../../../../types/table';

// Styled Components
const CustomContainer = styled(Paper)`
  width: 100%;
  background: #efefef;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CustomPaginationContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
`;

const CustomTableContainer = styled(TableContainer)`
  background-color: #fff;
`;

const CustomTableHead = styled(TableHead)`
  background-color: #f2f5f9ad;
`;

interface Props {
  columns: Column[];
  data: any[];
  rowsPerPage?: number;
}

const ReusableTable: React.FC<Props> = ({ columns, data, rowsPerPage = 10 }) => {
  const [page, setPage] = useState(1);

  // Handle page change
  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Calculate current rows
  const currentRows = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <CustomContainer>
      <CustomTableContainer>
        <Table stickyHeader> {/* Sticky header to keep the table head fixed while scrolling */}
          <CustomTableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={`header-${col.key}`} width={col.width} align={col?.align ? col.align : 'left'}>
                  {col.title}
                </TableCell>
              ))}
            </TableRow>
          </CustomTableHead>
          <TableBody>
            {currentRows.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={`${col.key}-${row.id}`} width={col.width}>
                    {col.render ? col.render(row) : row[col.dataIndex]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CustomTableContainer>
      <CustomPaginationContainer>
        {/* Displaying the results */}
        <div>
          Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, data.length)} of {data.length} results
        </div>

        {/* Pagination controls */}
        <Pagination
          count={Math.ceil(data.length / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          siblingCount={2}
          boundaryCount={1}
          shape="rounded"
        />
      </CustomPaginationContainer>
    </CustomContainer>
  );
};

export default ReusableTable;
