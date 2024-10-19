import styled from "@emotion/styled";
import Emptyimagesrc from "../../../assets/images/Group.png";

const EmptyImageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  gap: 10px;
  color: #545454;
`;
const EmptyImage = styled.img`
  height: 367px;
  width: 366px;
`;
export const NoDataAvailable = () => {
  return (
    <EmptyImageWrapper>
      <EmptyImage src={Emptyimagesrc} />
      <div>No Orders Found</div>
    </EmptyImageWrapper>
  );
};
