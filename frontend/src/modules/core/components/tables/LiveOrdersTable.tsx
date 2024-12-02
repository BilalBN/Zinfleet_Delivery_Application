import ReusableTable from './ReusableOrdersTable'; // Import the reusable table component
import { useAppSelector } from '../../../../store/hook';
import { NoDataAvailable } from '../EmptyPage';

const LiveOrders = () => {
    const { data } = useAppSelector((state) => state.order);

    const liveOrdersColumns = [
        { title: 'Order ID', dataIndex: 'id', key: 'id', width: '100px' },
        { title: 'Amount', dataIndex: 'amount', key: 'amount', width: '100px' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity', width: '100px' },
        { title: 'Date', dataIndex: 'date', key: 'date', width: '100px' },
        { title: 'Shop Name', dataIndex: 'shop', key: 'shop', width: '100px' },
        { title: 'Pick up location', dataIndex: 'pickUp', key: 'pickUp', width: '100px' },
        { title: 'Delivery location', dataIndex: 'delivery', key: 'delivery', width: '100px' },
    ];

    return (data.length?(<ReusableTable columns={liveOrdersColumns} data={data} />):(<NoDataAvailable message={"No orders available yet."}/>))
};

export default LiveOrders;
