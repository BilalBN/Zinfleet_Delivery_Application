import { Navigate, Outlet } from 'react-router-dom';
import { NavBar } from "../components/Navbar"
import { SideBar } from "../components/SideBar"
import styled from "@emotion/styled";
import { useAppSelector } from '../store/hook';
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    height: 100%;
`
const Body = styled.div`
    display: flex;
    gap: 5px;
    height: 100%;
    width: 100%;
`
const RequireAuth = ({ auth }: { auth: boolean }) => {
    const { isAuthenticated } = useAppSelector((state) => state.auth);
    
    return auth ? (
        isAuthenticated ? (
            <Container>
                <NavBar />
                <Body>
                    <SideBar />

                    <Outlet />

                </Body>

            </Container>
        ) : (
            <Navigate to="/signin" />
        )
    ) : isAuthenticated ? (
        <Navigate to="/" />
    ) : (
        <Outlet />
    );
};

export default RequireAuth;
