import { Navigate, Outlet } from "react-router-dom";
import { NavBar } from "../components/Navbar";
import { SideBar } from "../components/SideBar";
import styled from "@emotion/styled";
import { useAppSelector } from "../../../store/hook";
import { UserType } from "../../../store/authSlice";
import { AdminSidebar, FleetSidebar, WareHouseSidebar } from "../../../utils/sidebar";

// Styled components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 100%;
`;

const Body = styled.div`
  display: flex;
  gap: 5px;
  height: 100%;
  width: 100%;
`;

// Utility function to get sidebar items based on user type
const getSidebarItems = (userType: UserType | undefined) => {
  switch (userType) {
    case UserType.ADMIN_USER:
      return AdminSidebar;
    case UserType.FLEET_USER:
      return FleetSidebar;
    default:
      return WareHouseSidebar;
  }
};

const RequireAuth = ({ auth }: { auth: boolean }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  // If not authenticated and trying to access a protected route, redirect to signin
  if (auth && !isAuthenticated) {
    return <Navigate to="/signin" />;
  }

  // If authenticated and trying to access a public route, redirect to the home page
  if (!auth && isAuthenticated) {
    return <Navigate to="/" />;
  }

  // Get the sidebar items based on user type
  const sideBarItems = getSidebarItems(user?.type);

  return isAuthenticated ? (
    <Container>
      <NavBar />
      <Body>
        <SideBar items={sideBarItems} />
        <Outlet />
      </Body>
    </Container>
  ) : (
    <Outlet />
  );
};

export default RequireAuth;
