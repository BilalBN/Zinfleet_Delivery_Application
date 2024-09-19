import styled from "@emotion/styled";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import logo from "../assets/images/logo.png";
import { Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { grey } from '@mui/material/colors';
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = styled.div`
  display: flex;
  width: 100%;
  height: 90px;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
`;
const NavbarRight = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;
const Logo = styled.img`
  height: 27px;
  width: 137px;
  position: relative;
  left: 60px;
`;
const LogoWrapper = styled.div`
  height: 98px;
  width: 264px;
  border-right: 5px solid #EFEFEF;
  align-items: center;
  display: flex;
`;
const NavbarLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 15px;
  gap: 20px;
  position: relative;
`;
const SearchIcon = styled.div`
  display: flex;
  position: absolute;
  padding: 10px;
`;
const InputField = styled.input`
  padding: 15px 15px 15px 40px;
  width: 306px;
  border-radius: 9px;
  background-color: #f6f6f6;
  border: none;
`;
const Title = styled.div`
  display: flex;
`;

const Divider = styled.div`
    width: 3px;
    background-color: #EFEFEF;
    height: 50px;
`
export const NavBar = () => {
  const location = useLocation()

  const getNavContext = (): string => {
    switch (location.pathname) {
      case '/':
        return 'Dashboard'
      case '/order':
        return 'Order Managment'
      case '/shop':
        return 'Shops'
      case '/fleets':
        return 'Fleets'
      case '/settings':
        return 'Settings'
      default:
        return ''
    }
  }
  return (
    <Navbar>
      <NavbarRight>
        <LogoWrapper>
          <Logo src={logo} />
        </LogoWrapper>

        <Title>
          <Typography>{getNavContext()}</Typography>
        </Title>
      </NavbarRight>
      <NavbarLeft>
        <SearchIcon>
          <SearchOutlinedIcon sx={{ color: grey[500] }} />
        </SearchIcon>
        <InputField type="text" placeholder="Search here" />
        <Divider></Divider>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>

          <PermIdentityOutlinedIcon />
        </IconButton>
      </NavbarLeft>
    </Navbar>
  );
};
