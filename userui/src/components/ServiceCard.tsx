import styled from "@emotion/styled";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 275px;
  height: 174px;
  background: #fff;
  border-radius: 10px;
  padding: 15px 15px 15px 15px;
  box-sizing: border-box;
  gap:20px;
`;
const Title = styled.div`
  display: flex;
  gap:10px;
`;
const Headline = styled.div`
  color: #6e6e6e;
`;
const TaskStatus = styled.div`
  display: flex;
  justify-content:space-between;
`;
const TaskItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:20px;
  
`;
const TaskLabel = styled.div`
  font-size: 14px;
  color: #6e6e6e;
`;
const TaskCount = styled.div`
  font-size: 36px;
  color:#6E6E6E;
`;
export const ServiceCard = () => {
  return (
    <Container>
      <Title>
        <NotificationsNoneIcon sx={{ color: "#04009A" }} />
        <Headline>SERVICE REMINDER</Headline>
      </Title>
      <TaskStatus>
        <TaskItem>
          <TaskCount style={{color:"##6E6E6E"}}>2</TaskCount>
          <TaskLabel>overdue</TaskLabel>
        </TaskItem>
        <TaskItem>
          <TaskCount style={{color:"#DD0000"}} >3</TaskCount>
          <TaskLabel>Due soon</TaskLabel>
        </TaskItem>
        <TaskItem>
          <TaskCount style={{color:"#1BC300"}}>8</TaskCount>
          <TaskLabel>InProgress</TaskLabel>
        </TaskItem>
      </TaskStatus>
    </Container>
  );
};
