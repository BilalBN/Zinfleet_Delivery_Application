import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Pagination,
    Box
} from "@mui/material";
import styled from "@emotion/styled";

const CustomTableContainer = styled(TableContainer)`
  background-color: #fff;
`;
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

const CustomTableHead = styled(TableHead)`
  background-color: #f2f5f9ad;
`;

const data = [
    {
        id: 59217,
        name: "Johnson",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 59213,
        name: "Antony",
        status: 'Inactive',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },
    {
        id: 59219,
        name: "Christy",
        status: 'Active',
        address: "Richmond town Bangalore",
        vehicle: 'TATA PRIME',
        activeHours: 200,
        completedOrders: 100
    },

];

const CustomTable = () => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 8;
    const handleChangePage = (_event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };
    // Calculate current rows
    const currentRows = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <CustomContainer>
            <CustomTableContainer>
                <Table>
                    <CustomTableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Address</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Vehicle</TableCell>
                            <TableCell>Active Hours</TableCell>
                            <TableCell>Completed Orders</TableCell>
                        </TableRow>
                    </CustomTableHead>
                    <TableBody>
                        {currentRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.address}</TableCell>
                                <TableCell>{row.status}</TableCell>
                                <TableCell>{row.vehicle}</TableCell>
                                <TableCell>{row.activeHours}</TableCell>
                                <TableCell>{row.completedOrders}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CustomTableContainer>

            {/* Pagination Component */}
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

export default CustomTable;
