import styled from "@emotion/styled";
import CustomPieChart from "./PieChart";
import SquareIcon from "@mui/icons-material/Square";
import { ManagersActitvity } from "../../../types/chart";

const data: ManagersActitvity[] = [
  { name: 'Manager A', value: 50, color: '#4A3AFF' },
  { name: 'Manager B', value: 80, color: '#962DFF' },
  { name: 'Manager C', value: 50, color: '#ACBEFF' },
  { name: 'Manager D', value: 50, color: '#D7B5FE' },
];
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 397px;
  height: 400px;
  border-radius: 10px;
  background-color: #ffff;
  padding: 15px;
  box-sizing: border-box;
`;
const Title = styled.div`
  font-size: 20px;
  color: #6e6e6e;
`;
const Branches = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BranchGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;
const BranchSubGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`;
const BranchItem = styled.div`
  font-size: 14px;
`;

export const OrderCard = () => {
  return (
    <Container>
      <Title>Total Orders</Title>
      <CustomPieChart data={data}/>
      <Branches>
        <BranchGroup>
          <BranchSubGroup>
            <SquareIcon sx={{ width: "14px", color: "#4A3AFF" }} />
            <BranchItem>Palm Meadows</BranchItem>
          </BranchSubGroup>
          <BranchSubGroup>
            <SquareIcon sx={{ width: "14px", color: "#962DFF" }} />
            <BranchItem>12th main Rd Shop</BranchItem>
          </BranchSubGroup>
        </BranchGroup>
        <BranchGroup>
          <BranchSubGroup>
            <SquareIcon sx={{ width: "14px", color: "#ACBEFF" }} />
            <BranchItem>Prestige Eureka</BranchItem>
          </BranchSubGroup>
          <BranchSubGroup>
            <SquareIcon sx={{ width: "14px", color: "#D7B5FE" }} />
            <BranchItem>Other</BranchItem>
          </BranchSubGroup>
        </BranchGroup>
      </Branches>
    </Container>
  );
};
