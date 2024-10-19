import styled from "@emotion/styled";
import { NoDataAvailable } from "../../core/components/EmptyPage";
import { SubNavBar } from "../../core/components/SubNavBar";
import { useAppSelector } from "../../../store/hook";
import { OrderType } from "../../../types/order";
import LiveOrdersTable from "../../core/components/tables/LiveOrdersTable";
import AssignedOrdersTable from "../../core/components/tables/AssignedOrdersTable";
import RejectedOrders from "../../core/components/tables/RejectedTable";
import AllOrders from "../../core/components/tables/AllOrdersTable";
import ProcessingOrder from "../../core/components/tables/ProcessingOrdersTable";
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
