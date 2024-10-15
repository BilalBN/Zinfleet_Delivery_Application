import ReusableTable from './ReusableOrdersTable'; // Import the reusable table component
import { useAppSelector } from '../../store/hook';
import { Order } from '../../types/order';
import styled from '@emotion/styled';
const OutForDelivery = styled.div`
  color: #00D722;
  background-color: #C9FFC482;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`
const EnrouteToDelivery = styled.div`
  color: #D70000;
  background-color: #FFF1F1;
  padding: 10px;
  display:flex;
  align-items:center;
  justify-content:center;
`

const AssignedOrdersTable = () => {
  const { data } = useAppSelector((state) => state.order);

  const AssignedOrdersTableColumns = [
    { title: "ID", dataIndex: "id", key: "id", width: "50px" },
    { title: "Amount", dataIndex: "amount", key: "amount", width: "70px" },
    { title: "Quantity", dataIndex: "quantity", key: "quantity", width: "50px" },
    { title: "Date", dataIndex: "date", key: "date", width: "80px" },
    { title: "Shop", dataIndex: "shop", key: "shop", width: "100px" },
    { title: "Pick Up", dataIndex: "pickUp", key: "pickUp", width: "100px" },
    { title: "Delivery", dataIndex: "delivery", key: "delivery", width: "80px" },
    { title: "Assignee", dataIndex: "assignee", key: "assignee", width: "100px" },
    {
      title: 'Assign',
      dataIndex: 'assign', // This won't map directly but will use a custom renderer
      key: 'assign',
      render: (row: Order) => (
        row.status ? <OutForDelivery>Enroute to Pickup</OutForDelivery> : <EnrouteToDelivery>Out for Delivery</EnrouteToDelivery>
      ),
      width: "100px"
    },
  ]

  return <ReusableTable columns={AssignedOrdersTableColumns} data={data} />;
};

export default AssignedOrdersTable;
