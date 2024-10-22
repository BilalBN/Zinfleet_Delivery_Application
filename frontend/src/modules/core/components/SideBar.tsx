import styled from "@emotion/styled";
import Switch from "@mui/material/Switch";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import SettingsIcon from "@mui/icons-material/Settings";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../../store/hook";
import { SideBarItem } from "../../../types/sidebar";
import { UserType } from "../../../types/user";
import StorefrontIcon from "@mui/icons-material/Storefront";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import { useCurrentColors } from "../../../hooks/useCurrentColors";
type SidebarProps = {
  items: SideBarItem[];
};

const Sidebar = styled.div`
  width: 265px;
  height: 100%;
  background-color: #f6f6f6;
  flex-shrink: 0;
  flex-grow: 0;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
  gap: 10px;
  padding: 30px 10px 10px 10px;
  box-sizing: border-box;
`;
const ListItemContainer = styled.div<{ backgroundColor: string }>`
  display: flex;
  gap: 10px;
  cursor: pointer;
  background-color: ${(props) => props.backgroundColor};
  padding: 10px 10px 10px 20px;
  border-radius: 56px;
  transition: background-color 0.3s ease;
`;

const Statuscontainer = styled.div`
  display: flex;
  align-items: center;
  padding-left: 30px;
`;

const NavigationTitle = styled.div<{ color: string }>`
  color: ${(props) => (props.color)};
`;

export const SideBar = ({ items }: SidebarProps) => {
  const navigation = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const colors=useCurrentColors(user)

  const navigateUser = (path: string) => {
    const targetPath =
      user?.type === UserType.FLEET_USER
        ? path
          ? `/${user?.companyName}/${path}`
          : `/${user?.companyName}`
        : user?.type === UserType.ADMIN_USER
          ? path
            ? `/admin/${path}`
            : "/admin"
          : path
            ? `/warehouse/${path}`
            : "/warehouse";
    navigation(targetPath);
  };

  const isActivePath = (currentPath: string, item: SideBarItem) => {
    if (
      (currentPath === "/admin" && item.path === "") ||
      (currentPath === "/warehouse" && item.path === "") ||
      (currentPath === `/${user?.companyName}` && item.path === "")
    ) {
      return true;
    }
    return currentPath.split("/").filter(Boolean).includes(item.path);
  };

  const getSideBarIcon = (item: SideBarItem) => {
    switch (item.icon) {
      case "Dashboard":
        return (
          <SpaceDashboardIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />
        );
      case "Order":
        return <ListAltIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />;
      case "Driver":
        return (
          <ManageAccountsIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />
        );
      case "Settings":
        return <SettingsIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />;
      case "Shops":
        return (
          <StorefrontIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />
        );
      case "Fleets":
        return (
          <LocalShippingIcon sx={{ color: isActivePath(location.pathname, item) ? colors.primary : colors.default }} />
        );
      default:
        <div></div>;
    }
  };

  return (
    <Sidebar>
      <Container>
        {items.map((item) => (
          <ListItemContainer
            key={item.path}
            backgroundColor={isActivePath(location.pathname, item)?colors.secondary:"#fff"}
            onClick={() => {
              navigateUser(item.path);
            }}
          >
            {getSideBarIcon(item)}
            <NavigationTitle color={isActivePath(location.pathname, item)?colors.primary : colors.default}>{item.label}</NavigationTitle>
          </ListItemContainer>
        ))}
        <Statuscontainer>
          <NavigationTitle color={location.pathname === ""?colors.primary : colors.default}>Online Status</NavigationTitle>
          <Switch />
        </Statuscontainer>
      </Container>
    </Sidebar>
  );
};
