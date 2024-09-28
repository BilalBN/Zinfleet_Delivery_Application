import styled from "@emotion/styled";
import { NoDataAvailable } from "../components/EmptyPage";
import { SubNavBar } from "../components/SubNavBar";
const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const OrderManagment = () => {
    return (
        <Container>
            <SubNavBar />
            <NoDataAvailable />
        </Container>
    );

};

export default OrderManagment;
