import { Navigate, Outlet } from 'react-router-dom';
import { NavBar } from "../components/Navbar"
import { SideBar } from "../components/SideBar"
import styled from "@emotion/styled";
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
    const user = true

    return auth ? (
        user ? (
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
    ) : user ? (
        <Navigate to="/" />
    ) : (
        <Outlet />
    );
};

export default RequireAuth;
