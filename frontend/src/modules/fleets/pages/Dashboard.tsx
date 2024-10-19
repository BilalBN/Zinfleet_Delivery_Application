import styled from "@emotion/styled";
import CustomCard from "../components/CustomCard";
import { ServiceCard } from "../components/ServiceCard";
import { RevenueCard } from "../components/RevenueCard";
import { OrderCard } from "../components/OrderCard";

const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 20px 0 10px 20px;
`;
const WidgetContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  overflow-y: auto;
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0px;
  width: 100%;
  margin-bottom: 100px;
  gap: 20px;
`;
const CardsRow = styled.div`
  display: flex;
  gap:15px;
  flex-wrap: wrap;
`;
export const Dashboard = () => {
  return (
    <Container>
      <WidgetContainer>
        <CardsRow>
          <CustomCard
            type={"FLEETS"}
            title={"TOTAL FLEETS"}
            trendStatus={"NORMAL"}
            value={"12,450"}
            trendLabel={"7,332 Active Fleets"}
          />
          <CustomCard
            type={"ORDERS"}
            title={"TOTAL ORDERS"}
            trendStatus={"UP"}
            value={"52,120"}
            trendLabel={"11% less than month"}
          />
          <CustomCard
            type={"REVENUE"}
            title={"TOTAL REVENUE"}
            trendStatus={"DOWN"}
            value={"112,452"}
            trendLabel={"15% growth"}
          />
          <ServiceCard />
        </CardsRow>
        <div style={{display:"flex", gap:"20px"}}>
        <RevenueCard />
        <OrderCard/>
        </div>
        
      </WidgetContainer>
    </Container>
  );
};
