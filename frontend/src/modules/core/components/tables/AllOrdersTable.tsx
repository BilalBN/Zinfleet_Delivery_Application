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
        const targetData = data.map((item) => {
            return {
                id: item.orderData.orderId,
                amount: item.orderData.orderTotal,
                quantity: item.orderData.orderCode,
                status: item.orderData.orderStatus,
                shop: item.orderData.storeId,
                pickUp: `${item.addressData.street} ${item.addressData.district} ${item.addressData.country}`,
                delivery: ''
            }
        })
        setTableData(targetData)
    }, [data]);


    const columns = [
        { title: 'Order ID', dataIndex: 'id', key: 'id', width: '100px' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', width: '100px' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '100px' },
        { title: 'status', dataIndex: 'status', key: 'status', width: '100px' },
        { title: 'Shop Name', dataIndex: 'shop', key: 'shop', width: '100px' },
        { title: 'Pick up location', dataIndex: 'pickUp', key: 'pickUp', width: '100px' },
        { title: 'Delivery location', dataIndex: 'delivery', key: 'delivery', width: '100px' },
    ];

    return (tableData.length ? (<ReusableTable
        total={total}
        totalPages={totalPages}
        columns={columns}
        data={tableData}
        page={page}
        setPage={(value: number) => {
            dispatch(setPage(value))
        }}
        rowsPerPage={limit} />) : (<NoDataAvailable message={"No orders available yet."} />))
};

export default AllOrders;
