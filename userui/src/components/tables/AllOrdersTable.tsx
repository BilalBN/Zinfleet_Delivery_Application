import ReusableTable from './ReusableOrdersTable'; // Import the reusable table component
import { useAppSelector } from '../../store/hook';
import { Order } from '../../types/order';
import styled from '@emotion/styled';


const DeliveredOrder = styled.div`
  color: #00D722;
`
const UnDeliveredOrder = styled.div`
  color: #D70000;
`

const AllOrdersTable = () => {
  const { data } = useAppSelector((state) => state.order);

  const AllOrdersTableColumns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Amount", dataIndex: "amount", key: "amount" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity" },
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Shop", dataIndex: "shop", key: "shop" },
    { title: "Pick Up", dataIndex: "pickUp", key: "pickUp" },
    { title: "Delivery", dataIndex: "delivery", key: "delivery" },
    { title: "Assignee", dataIndex: "assignee", key: "assignee" },
    { title: "Rejected By", dataIndex: "rejectedBy", key: "rejectedBy" },
    {
      title: 'Status',
      dataIndex: 'status', // This won't map directly but will use a custom renderer
      key: 'status',
      render: (row: Order) => (
        row.status ? (<DeliveredOrder>Delivered</DeliveredOrder>) : <UnDeliveredOrder>UnDelivered</UnDeliveredOrder>
      ),
    },
  ];

  return <ReusableTable columns={AllOrdersTableColumns} data={data} />;
};

export default AllOrdersTable;
