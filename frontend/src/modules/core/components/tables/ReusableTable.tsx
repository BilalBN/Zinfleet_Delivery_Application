import React from 'react';
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
  page: number;
  total: number;
  totalPages: number;
  setPage: (value: number) => void
}

const ReusableOrdersTable: React.FC<Props> = ({ columns, data, total, totalPages, rowsPerPage = 10, setPage, page }) => {


  const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };


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
            {data.map((row) => (
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
          NOW Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, total)} of {total} results
        </div>

        {/* Pagination controls */}
        <Pagination
          count={Math.ceil(total / rowsPerPage)}
          page={page}
          onChange={handleChangePage}
          siblingCount={2}
          boundaryCount={totalPages}
          shape="rounded"
        />
      </CustomPaginationContainer>
    </CustomContainer>
  );
};

export default ReusableOrdersTable;
