import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import signInImg from "../assets/images/signin.png";
import LogoImg from "../assets/images/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  overflow: hidden;
`;
const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 50%;
  position: relative;
  margin: 4px;
  oveflow-y: hidden;
`;

const ZinfleetLogo = styled.img`
  display: flex;
  max-height: 30px;
  max-width: 160px;
  object-fit: contain;
  position: absolute;
  left: 35px;
  top: 30px;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content:center;
  flex: 1;
  padding: 0 15%;
  overflow-y: auto;
  gap: 10px;
`;
const SignInContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    white-space: nowrap;
`;
const WelcomeText = styled.div`
  font-weight: 500;
  font-size: 21px
`;
const RightText = styled.div`
  font-weight:300;
  font-size:16px;
`;
const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 10px;
`;
const RightContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 50%;
`;
const SignInImage = styled.img`
  height: 100%;
  width: 100%;
`;

const BaseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`
const ButtonContainer = styled(BaseContainer)`
  margin-top: 20px;
`
const Title = styled.div`
font-size: 55px;
padding: 20px 0;
`
const CompanyName = styled.span`
color:#04009A;
`
const CustomLink = styled(Link)`
text-decoration: none
`

const CustomButton = styled(Button)`
  width: 200px;
`
export const SignIn = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LeftContainer>
        <ZinfleetLogo src={LogoImg} />
        <FormContainer>
          <SignInContainer>
            <WelcomeText>
              Welcome to <CompanyName>ZeinFleet</CompanyName>
            </WelcomeText>
            <RightText>
              <div>No Account ?</div>
              <CustomLink to={"/signup"}>
                Sign up
              </CustomLink>
            </RightText>
          </SignInContainer>
          <Title>Sign in</Title>
          <InputField>
            <Typography>Username or email address </Typography>
            <TextField variant="outlined" placeholder="Enter your username or email address" fullWidth />
          </InputField>
          <InputField>
            <Typography>Password</Typography>
            <TextField variant="outlined" placeholder="Enter your Password" fullWidth sx={{ borderRadius: "8px" }} />
          </InputField>
          <BaseContainer>
            <CustomLink to={'/'}>
              Forget Password?
            </CustomLink>
          </BaseContainer>
          <ButtonContainer>
            <CustomButton
              variant="contained"
              onClick={() => { navigate("/dashboard") }}
            >
              Sign in
            </CustomButton>
          </ButtonContainer>
        </FormContainer>
      </LeftContainer>
      <RightContainer>
        <SignInImage src={signInImg} />
      </RightContainer>
    </Container>
  );
};
