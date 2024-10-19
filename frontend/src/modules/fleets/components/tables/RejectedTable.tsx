import { useState } from 'react';
import ReusableTable from './ReusableOrdersTable'; // Import the reusable table component
import { useAppSelector } from '../../../../store/hook';
import { Select, MenuItem } from '@mui/material';
import { Order } from '../../../../types/order';

const RejectedOrders = () => {
    const { data } = useAppSelector((state) => state.order);
    const [reassignedUsers, setReassignedUsers] = useState<{ [key: number]: string }>({});
    const users = ['John', 'Antony', 'Ben'];

    // Handle reassignment dropdown change
    const handleReassignChange = (id: number, user: string) => {
        setReassignedUsers({
            ...reassignedUsers,
            [id]: user,
        });
    };

    // Define the columns specific to Rejected Orders
    const rejectedOrdersColumns = [
        { title: 'Order ID', dataIndex: 'id', key: 'id' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Date', dataIndex: 'date', key: 'date' },
        { title: 'Shop Name', dataIndex: 'shop', key: 'shop' },
        { title: 'Pick up location', dataIndex: 'pickUp', key: 'pickUp' },
        { title: 'Delivery location', dataIndex: 'delivery', key: 'delivery' },
        { title: 'Rejected By', dataIndex: 'rejectedBy', key: 'rejectedBy' },
        {
            title: 'Reassign to',
            dataIndex: 'reassign', // This won't map directly but will use a custom renderer
            key: 'reassign',
            render: (row: Order) => (
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
            ),
        },
    ];

    return <ReusableTable columns={rejectedOrdersColumns} data={data} />;
};

export default RejectedOrders;
