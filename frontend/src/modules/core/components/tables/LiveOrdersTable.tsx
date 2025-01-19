import ReusableTable from './ReusableTable'; // Import the reusable table component
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { NoDataAvailable } from '../EmptyPage';
import { fetchOrders, setPage } from '../../../../store/orderslice';
import { useEffect } from 'react';

const LiveOrders = () => {
    const { data, page, limit, total, totalPages } = useAppSelector((state) => state.order);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchOrders({ order_type: 'LIVE', fleet_id: user?.fleet_id || null }))
    }, [page]);

    const liveOrdersColumns = [
        { title: 'Order ID', dataIndex: 'id', key: 'id', width: '100px' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', width: '100px' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '100px' },
        { title: 'Date', dataIndex: 'date', key: 'date', width: '100px' },
        { title: 'Shop Name', dataIndex: 'shop', key: 'shop', width: '100px' },
        { title: 'Pick up location', dataIndex: 'pickUp', key: 'pickUp', width: '100px' },
        { title: 'Delivery location', dataIndex: 'delivery', key: 'delivery', width: '100px' },
    ];

    return (data.length ? (<ReusableTable
        total={total}
        totalPages={totalPages}
        columns={liveOrdersColumns}
        data={data}
        page={page}
        setPage={(value: number) => {
            dispatch(setPage(value))
        }} 
        rowsPerPage={limit} />) : (<NoDataAvailable message={"No orders available yet."} />))
};

export default LiveOrders;
