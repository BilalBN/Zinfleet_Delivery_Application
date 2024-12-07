import ReusableTable from './ReusableOrdersTable'; // Import the reusable table component
import { useAppSelector } from '../../../../store/hook';
import { Order } from '../../../../types/order';
import styled from '@emotion/styled';
import { NoDataAvailable } from '../EmptyPage';


const DeliveredOrder = styled.div`
  color: #00D722;
`
const UnDeliveredOrder = styled.div`
  color: #D70000;
`

const AllOrdersTable = () => {
  const { data } = useAppSelector((state) => state.order);

  const AllOrdersTableColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: '100px' },
    { title: "Amount", dataIndex: "amount", key: "amount", width: '100px' },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", width: '100px' },
    { title: "Date", dataIndex: "date", key: "date", width: '100px' },
    { title: "Shop", dataIndex: "shop", key: "shop", width: '100px' },
    { title: "Pick Up", dataIndex: "pickUp", key: "pickUp", width: '100px' },
    { title: "Delivery", dataIndex: "delivery", key: "delivery", width: '100px' },
    { title: "Assignee", dataIndex: "assignee", key: "assignee", width: '100px' },
    { title: "Rejected By", dataIndex: "rejectedBy", key: "rejectedBy", width: '100px' },
    {
      title: 'Status',
      dataIndex: 'status', // This won't map directly but will use a custom renderer
      key: 'status',
      render: (row: Order) => (
        row.status ? (<DeliveredOrder>Delivered</DeliveredOrder>) : <UnDeliveredOrder>UnDelivered</UnDeliveredOrder>
      ),
      width: '100px'
    },
  ];

  return (data.length ? (<ReusableTable columns={AllOrdersTableColumns} data={data} />) : (<NoDataAvailable message={"No orders available yet."} />))
};

export default AllOrdersTable;
