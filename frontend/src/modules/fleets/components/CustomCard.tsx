import styled from "@emotion/styled";
import TrainIcon from "@mui/icons-material/Train";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ListAltIcon from "@mui/icons-material/ListAlt";
import MovingIcon from "@mui/icons-material/Moving";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
type CardType = "FLEETS" | "ORDERS" | "REVENUE";
type TrendStatus = "NORMAL" | "UP" | "DOWN";
type Props = {
  type: CardType;
  title: string;
  value: String;
  trendStatus: TrendStatus;
  trendLabel: string;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 275px;
  height: 174px;
  background: #fff;
  gap: 20px;
  border-radius: 10px;
  padding: 15px 15px 15px 25px;
  justify-content: center;
  box-sizing: border-box;
`;
const IconLabel = styled.div`
  display: flex;
  gap: 10px;
`;
const Title = styled.div`
  color: #6e6e6e;
`;
const Value = styled.div`
  font-size: 36px;
`;
const Trends = styled.div`
  display: flex;
  gap: 10px;
`;
const Label = styled.div`
  color: #6e6e6e;
`;

const CustomCard = ({ type, title, trendStatus, value, trendLabel }: Props) => {
  const getCardIcon = () => {
    switch (type) {
      case "FLEETS":
        return <TrainIcon sx={{ color: "#04009A" }}/>;
      case "ORDERS":
        return <ListAltIcon sx={{ color: "#04009A" }}/>;
      case "REVENUE":
        return <CurrencyRupeeIcon sx={{ color: "#04009A" }}/>;
    }
  };
  const getTrendStatus = () => {
    switch (trendStatus) {
      case "NORMAL":
        return <FiberManualRecordIcon sx={{ color: "#31BE00" }} />;
      case "UP":
        return <TrendingDownIcon sx={{ color: "#FF0000" }} />;
      case "DOWN":
        return <MovingIcon sx={{ color: "#1BC300" }} />;
    }
  };
  return (
    <Container>
      <IconLabel>
        {getCardIcon()}
        <Title>{title}</Title>
      </IconLabel>
      <Value>{value}</Value>
      <Trends>
        {getTrendStatus()}
        <Label>{trendLabel}</Label>
      </Trends>
    </Container>
  );
};

export default CustomCard;
