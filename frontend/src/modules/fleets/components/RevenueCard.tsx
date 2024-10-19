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
const active = "#000000";
const normal = "#747474";
const TimeRange = styled.div<{ isActive: boolean }>`
  color: ${(props) => (props.isActive ? active : normal)};
  background-color: ${(props) => (props.isActive ? "#ffffff" : "#f6f6f6")};
  width:39px;
  height:24px;
  border-radius: ${(props)=>(props.isActive ? "2px":null)};
  text-align: center;
  justify-content: center;
  cursor: pointer;
  box-shadow:  ${(props) => (props.isActive ? '-1px 1px 2px 1px rgba(0, 0, 0, 0.4)' : null)};;
`;

type ViewMode = "1D" | "1M" | "1W" | "1M" | "6M" | "1Y";
export const RevenueCard = () => {
  const [timeline, setTimeline] = useState<ViewMode>("1D");
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
          <TimeRange
            isActive={timeline === "1D"}
            onClick={() => {
              setTimeline("1D");
            }}
          >
            1D
          </TimeRange>
          <TimeRange
            isActive={timeline === "1W"}
            onClick={() => {
              setTimeline("1W");
            }}
          >
            1W
          </TimeRange>
          <TimeRange
            isActive={timeline === "1M"}
            onClick={() => {
              setTimeline("1M");
            }}
          >
            1M
          </TimeRange>
          <TimeRange
            isActive={timeline === "6M"}
            onClick={() => {
              setTimeline("6M");
            }}
          >
            6M
          </TimeRange>
          <TimeRange
            isActive={timeline === "1Y"}
            onClick={() => {
              setTimeline("1Y");
            }}
          >
            1Y
          </TimeRange>
        </TimeRangeSelection>
      </Header>
      <Body>
        <LineChart />
      </Body>
    </Container>
  );
};

export default RevenueCard;
