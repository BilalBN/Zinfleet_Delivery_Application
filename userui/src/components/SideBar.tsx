import styled from "@emotion/styled";
import logoImg from "../assets/logo.png";
import { Typography } from "@mui/material";
import dashboardIcon from "../assets/space_dashboard.png";
import OrderIcon from "../assets/ordermgmt.png";
import driverIcon from "../assets/chauffer.png";
import settingIcon from "../assets/setting.png";

const Sidebar = styled.div`
  height: 100%;
  width: 20%;
  background-color: #f6f6f6;
`;
const LogoImage = styled.img`
  height: 30px;
`;
const UpperContainer = styled.div`
  display: flex;
  height: 15%;
  width: 100%;
  background-color: #ffffff;
  justify-content: center;
  align-items: center;
  margin-bottom: 4px;
`;
const LowerContainer = styled.div`
  display: flex;
  background-color: #ffffff;
  height: 100%;
`;
const ListContainer = styled.div`
  display: flex;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  margin: 10px;
  padding: 10px;
  gap: 10px;
`;
const TextConatiner = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px;

  gap: 10px;
`;
const Dashboard = styled.img``;
const Order = styled.img``;
const Driver = styled.img``;
const Setting = styled.img``;
export const SideBar = () => {
  return (
    <Sidebar>
      <UpperContainer>
        <LogoImage src={logoImg} />
      </UpperContainer>
      <LowerContainer>
        <ListContainer>
          <div style={{display:"flex"}}>
            <Dashboard src={dashboardIcon} />
            <Typography>DashBoard</Typography>
          </div>
          <div style={{display:"flex"}}>
            <Order src={OrderIcon} />
            <Typography>Order Management</Typography>
          </div>
        </ListContainer>

        {/* 
          <Driver src={driverIcon} />
          <Setting src={settingIcon} /> */}

        {/* <TextConatiner>
          
          
          <Typography>Driver Management</Typography>
          <Typography>Settings</Typography>
        </TextConatiner> */}
      </LowerContainer>
    </Sidebar>
  );
};
