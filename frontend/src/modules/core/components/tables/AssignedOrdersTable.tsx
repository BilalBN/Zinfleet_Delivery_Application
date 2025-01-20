import ReusableTable from './ReusableTable'; // Import the reusable table component
import { useAppDispatch, useAppSelector } from '../../../../store/hook';
import { Order } from '../../../../types/order';
import styled from '@emotion/styled';
import { NoDataAvailable } from '../EmptyPage';
import { useEffect } from 'react';
import { fetchOrders, setPage } from '../../../../store/orderslice';
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
  const { data, page, limit, total, totalPages } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchOrders({ order_type: 'ASSIGNED', fleetId: user?.fleet_id || null }))
  }, [page]);

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

  return (data.length ? (<ReusableTable
    total={total}
    totalPages={totalPages}
    columns={AssignedOrdersTableColumns}
    data={data}
    page={page}
    setPage={(value: number) => {
      dispatch(setPage(value))
    }} rowsPerPage={limit} />) : (<NoDataAvailable message={"No orders available yet."} />))
};

export default AssignedOrdersTable;
