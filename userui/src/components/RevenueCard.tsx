import styled from "@emotion/styled";
import MovingIcon from "@mui/icons-material/Moving";
import LineChart from "./LineChart";
import { useState } from "react";

const Container = styled.div`
  display: flex;
  width: 731px;
  height: 400px;
  border-radius: 10px;
  background-color: #ffffff;
  padding: 10px;
  box-sizing: border-box;
  flex-direction: column;
  gap: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Revenue = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const Title = styled.div`
  font-size: 20px;
  color: #6e6e6e;
`;
const RevenueCount = styled.div`
  display: flex;
  gap: 10px;
`;
const Count = styled.div`
  font-size: 24px;
`;
const Growth = styled.div`
  display: flex;
  gap: 2px;
  background-color: #f0fdeb;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  color: #169201;
  padding: 0 5px 0 5px;
`;
const TimeRangeSelection = styled.div`
  display: flex;
  width: 319px;
  height: 46px;
  justify-content: space-around;

  align-items: center;
  background-color: #f6f6f6;
  border-radius: 9px;
  padding: 4px;
`;

const Body = styled.div`
  height: 300px;
`;
type ViewMode = "1D" | "1M" | "1W" | "1M" | "6M" | "1Y";
export const RevenueCard = () => {
  const [timeline, setTimeline] = useState<ViewMode>("1M");
  return (
    <Container>
      <Header>
        <Revenue>
          <Title>Your Revenue</Title>
          <RevenueCount>
            <Count>275,340.40</Count>
            <Growth>
              <MovingIcon />
              <div>13% growth</div>
            </Growth>
          </RevenueCount>
        </Revenue>
        <TimeRangeSelection>
          <div
            onClick={() => {
              setTimeline("1D");
            }}
          >
            1D
          </div>
          <div>1W</div>
          <div>1M</div>
          <div>6M</div>
          <div>1Y</div>
        </TimeRangeSelection>
      </Header>
      <Body>
        <LineChart />
      </Body>
    </Container>
  );
};

export default RevenueCard;
