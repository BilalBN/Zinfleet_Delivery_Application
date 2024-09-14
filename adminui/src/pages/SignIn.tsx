import styled from "@emotion/styled";
import { Box, Button, FormLabel, TextField } from "@mui/material";
import singInImg from "../assets/signIn.png";

const Container = styled(Box)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  overflow: hidden; 
`;

const LeftContainer = styled(Box)`
  flex: 1;
  padding: 40px;
  max-width: 50%;
  overflow-y: auto;
`;

const FormContainer = styled(Box)`
  padding: 0 10%;
`;

const TruckImageContainer = styled(Box)`
  flex: 1;
  max-width: 50%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TruckImage = styled.img`
  width: 100%;
  height: 100%;
  display: block;
`;

const StyledTextField = styled(TextField)`
  margin: 5px 0 16px 0 !important;
`;
const StyledLabel = styled(FormLabel)`
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
`
const LeftTitle = styled.div`
  font-size: 21px; 
  & span{
    color: blue;
  }
`
const RightSection = styled.div`
  display:flex;
  flex-direction: column;
  font-size: 13px;
  & a{
    color: blue;
  }
`
const Title = styled.div`
  font-size: 55px;
  font-weight: 500;
  margin-bottom: 20px;
`
const ActionContainer= styled.div`
  display: flex;
  justify-content: flex-end;
`
export const SignIn: React.FC = () => {
  return (
    <Container>
      <LeftContainer>
        <FormContainer>
          <Header>
            <LeftTitle>
              Welcome to <span>ZINFLEET</span>
            </LeftTitle>
            <RightSection>
              <div>No Account?</div>
              <a>Sign up</a>
            </RightSection>
          </Header>
          <Title>Sign in</Title>
          <div>
            <StyledLabel>Username or email address</StyledLabel>
            <StyledTextField fullWidth placeholder="Username or email address" variant="outlined" />
          </div>

          <div>
            <StyledLabel>Password</StyledLabel>
            <StyledTextField fullWidth placeholder="Password" type="password" variant="outlined" />
          </div>
          <ActionContainer>
            <Button variant="contained" color="primary">
              Sign In
            </Button>
          </ActionContainer>
        </FormContainer>
      </LeftContainer>
      <TruckImageContainer>
        <TruckImage src={singInImg} />
      </TruckImageContainer>
    </Container>
  );
};
