import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../../../store/hook";
import { OrderType } from "../../../types/order";
import { setSelectedOrder } from "../../../store/orderslice";
import { useCurrentColors } from "../../../hooks/useCurrentColors";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 20px;
`;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 0.5px solid #6e6e6e;
`;
const ListItem = styled.div<{ color: string, active: boolean }>`
  position: relative;
  color: ${(props) => props.color};
  border-bottom: ${(props) => (props.active?`1px solid ${props.color}`:null)};
  padding-bottom: 20px;
  cursor: pointer;

  /* Add transition for color */
  transition: color 0.3s ease;
  display: flex;
  gap: 10px;
  align-items: center;
  line-height: 20px;
`;

const Count = styled.div<{ color: string, active: boolean }>`
  width: 36px;
  height: 22px;
  color: ${(props) => props.color};
  border: ${(props) => (props.active?`1px solid ${props.color}`:null)};
  display: flex;
  align-items: center;
  justify-content:center;
`
const TimerContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`
export const OrderTabs = () => {
  
  const { selectedOrder, data } = useAppSelector(state => state.order)
  const dispatch = useAppDispatch()
  const { user } = useAppSelector((state) => state.auth);
  const colors=useCurrentColors(user)

  const onSlectedOrderTypeChange = (orderType: OrderType) => {
    dispatch(setSelectedOrder(orderType))
  }
  return (
    <Container>
      <BottomRow>
        <ListItem
          color={selectedOrder === OrderType.Live? colors.primary : "#B5B5B5"}
          active={selectedOrder === OrderType.Live}
          onClick={() => {
            onSlectedOrderTypeChange(OrderType.Live);
          }}
        >
          Live Orders
          <Count  active={selectedOrder === OrderType.Live} color={selectedOrder === OrderType.Live? colors.primary : "#B5B5B5"}>{data.length}</Count></ListItem>
        <ListItem
          color={selectedOrder === OrderType.Processing? colors.primary : "#B5B5B5"}
          active={selectedOrder === OrderType.Processing}
          onClick={() => {
            onSlectedOrderTypeChange(OrderType.Processing);
          }}
        >
          Processing Orders
          <Count  active={selectedOrder === OrderType.Processing} color={selectedOrder === OrderType.Processing? colors.primary : "#B5B5B5"}>{data.length}</Count></ListItem>
        <ListItem
          color={selectedOrder === OrderType.Assigned? colors.primary : "#B5B5B5"}
          active={selectedOrder === OrderType.Assigned}
          onClick={() => {
            onSlectedOrderTypeChange(OrderType.Assigned);
          }}
        >
          Assigned Orders
          <Count  active={selectedOrder === OrderType.Assigned} color={selectedOrder === OrderType.Assigned? colors.primary : "#B5B5B5"}>{data.length}</Count></ListItem>
        <ListItem
          color={selectedOrder === OrderType.Rejected? colors.primary : "#B5B5B5"}
          active={selectedOrder === OrderType.Rejected}
          onClick={() => {
            onSlectedOrderTypeChange(OrderType.Rejected);
          }}
        >
          Rejected Orders
          <Count  active={selectedOrder === OrderType.Rejected} color={selectedOrder === OrderType.Rejected? colors.primary : "#B5B5B5"}>{data.length}</Count></ListItem>
        <ListItem
          color={selectedOrder === OrderType.All? colors.primary : "#B5B5B5"}
          active={selectedOrder === OrderType.All}
          onClick={() => {
            onSlectedOrderTypeChange(OrderType.All);
          }}
        >
          All Orders{" "}
          <Count  active={selectedOrder === OrderType.All} color={selectedOrder === OrderType.All? colors.primary : "#B5B5B5"}>{data.length}</Count></ListItem>
      </BottomRow>
    </Container>
  );
};
