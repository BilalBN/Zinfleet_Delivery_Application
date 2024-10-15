import styled from "@emotion/styled";
import { NoDataAvailable } from "../components/EmptyPage";
import { SubNavBar } from "../components/SubNavBar";
import { useAppSelector } from "../store/hook";
import { OrderType } from "../types/order";
import LiveOrdersTable from "../components/tables/LiveOrdersTable";
import AssignedOrdersTable from "../components/tables/AssignedOrdersTable";
import RejectedOrders from "../components/tables/RejectedTable";
import AllOrders from "../components/tables/AllOrdersTable";
import ProcessingOrder from "../components/tables/ProcessingOrdersTable";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const OrderManagment = () => {
    const { data, selectedOrder } = useAppSelector(state => state.order)

    const renderTable = () => {
        switch (selectedOrder) {
            case OrderType.Live:
                return <LiveOrdersTable />
            case OrderType.Processing:
                return <ProcessingOrder />
            case OrderType.Assigned:
                return <AssignedOrdersTable />
            case OrderType.Rejected:
                return <RejectedOrders />
            case OrderType.All:
                return <AllOrders />
            default:
                return <NoDataAvailable />
        }
    }
    return (
        <Container>
            <SubNavBar />
            {data.length ? (
                renderTable()
            ) : (<NoDataAvailable />)}
        </Container>
    );

};

export default OrderManagment;
