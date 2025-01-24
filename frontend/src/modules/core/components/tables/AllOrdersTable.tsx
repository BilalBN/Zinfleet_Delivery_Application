import ReusableTable from './ReusableTable'; // Import the reusable table component
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { NoDataAvailable } from '../EmptyPage';
import { OrderTable, fetchOrders, setPage } from '../../../../store/orderslice';
import { useEffect, useState } from 'react';

const AllOrders = () => {
    const { data, page, limit, total, totalPages } = useAppSelector((state) => state.order);
    const { user } = useAppSelector((state) => state.auth);
    const dispatch = useAppDispatch();
    const [tableData, setTableData] = useState<OrderTable[]>([]);


    useEffect(() => {
        dispatch(fetchOrders({ order_type: 'ALL', fleetId: user?.fleet_id || null }))
    }, [page]);

    useEffect(() => {
       const targetData= data.map((item) => {
            return {
                id: item.id,
                amount: item.amount,
                quantity: item.orderTotal,
                date: item.createdAt,
                shop: '',
                pickUp: item.fleet.address,
                delivery: ''
            }
        })
        setTableData(targetData)
    }, [data]);


    const colums = [
        { title: 'Order ID', dataIndex: 'id', key: 'id', width: '100px' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', width: '100px' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '100px' },
        { title: 'Date', dataIndex: 'date', key: 'date', width: '100px' },
        { title: 'Shop Name', dataIndex: 'shop', key: 'shop', width: '100px' },
        { title: 'Pick up location', dataIndex: 'pickUp', key: 'pickUp', width: '100px' },
        { title: 'Delivery location', dataIndex: 'delivery', key: 'delivery', width: '100px' },
    ];

    return (tableData.length ? (<ReusableTable
        total={total}
        totalPages={totalPages}
        columns={colums}
        data={tableData}
        page={page}
        setPage={(value: number) => {
            dispatch(setPage(value))
        }}
        rowsPerPage={limit} />) : (<NoDataAvailable message={"No orders available yet."} />))
};

export default AllOrders;
