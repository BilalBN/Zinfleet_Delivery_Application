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
    Select,
    MenuItem,
} from '@mui/material';
import styled from '@emotion/styled';

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
    { id: 59217, amount: 23500, quantity: 101, date: '10 May 2024', shop: 'Palm Meadows, Prestige Ozone, Bengaluru', pickUp: 'Hosur Road ChikkuLakshmia layout', delivery: 'Tanisandra main road', rejectedBy: 'Antony' },
    { id: 59213, amount: 43500, quantity: 500, date: '10 May 2024', shop: 'Prestige Eureka, Church Street, Bengaluru', pickUp: 'Mantri Mall, Sampige Rd', delivery: '24, Vittal Mallya Rd Bengaluru', rejectedBy: 'Ben' },
    // Add more data as per the screenshot example
    { id: 59219, amount: 55200, quantity: 150, date: '20 May 2024', shop: '12th Main Rd, Indiranagar, Bengaluru', pickUp: 'Hosur Rd, Chikku Lakshmaiah Layout', delivery: 'Thanisandra Main Rd, Bengaluru', rejectedBy: 'John' },
    // ... Add other rows
];

const users = ['John', 'Antony', 'Ben'];

const CustomTable = () => {
    const [page, setPage] = useState(1);
    const rowsPerPage = 8;
    const [reassignedUsers, setReassignedUsers] = useState<{ [key: number]: string }>({});

    // Handle page change
    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // Handle reassignment dropdown change
    const handleReassignChange = (id: number, user: string) => {
        setReassignedUsers({
            ...reassignedUsers,
            [id]: user,
        });
    };

    // Calculate current rows
    const currentRows = data.slice((page - 1) * rowsPerPage, page * rowsPerPage);

    return (
        <CustomContainer>
            <CustomTableContainer>
                <Table>
                    <CustomTableHead>
                        <TableRow>
                            <TableCell>Order ID</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Shop Name</TableCell>
                            <TableCell>Pick up location</TableCell>
                            <TableCell>Delivery location</TableCell>
                            <TableCell>Rejected By</TableCell>
                            <TableCell>Reassign to</TableCell>
                        </TableRow>
                    </CustomTableHead>
                    <TableBody>
                        {currentRows.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.amount}</TableCell>
                                <TableCell>{row.quantity}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>{row.shop}</TableCell>
                                <TableCell>{row.pickUp}</TableCell>
                                <TableCell>{row.delivery}</TableCell>
                                <TableCell>{row.rejectedBy}</TableCell>
                                <TableCell>
                                    <Select
                                        value={reassignedUsers[row.id] || ''}
                                        onChange={(e) => handleReassignChange(row.id, e.target.value as string)}
                                        displayEmpty
                                        size="small"
                                        sx={{ width: '100px' }}
                                    >
                                        <MenuItem value="" disabled>Select User</MenuItem>
                                        {users.map((user) => (
                                            <MenuItem key={user} value={user}>
                                                {user}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CustomTableContainer>

            {/* Pagination Component */}
            <CustomPaginationContainer>
                {/* Displaying the results */}
                <div>Showing {(page - 1) * rowsPerPage + 1} to {Math.min(page * rowsPerPage, data.length)} of {data.length} results</div>

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
