import styled from "@emotion/styled";
import signUpImg from "../../../assets/images/signup.png";
import LogoImg from "../../../assets/images/logo.png";
import { Button, TextField, Typography } from "@mui/material";
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
  overflow-y: hidden;
`;
const SignUpImage = styled.img`
  height: 100%;
  width: 100%;
`;
const ZinfleetLogo = styled.img`
  display: flex;
  max-height: 30px;
  max-width: 160px;
  object-fit: contain;
  position: absolute;
  right: 35px;
  top: 30px;
`;

const RightContainer = styled.div`
  display: flex;
  flex: 1;
  max-width: 50%;
  position: relative;
  margin: 4px;
  oveflow-y: hidden;
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
  font-size: 21px;
`;

const RightText = styled.div`
  font-weight: 500;
  font-size: 16px;
`;

const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 15px;
`;

const PersonalInformation = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 15px;
`;

const PersonalDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex:1;
`;

const CustomLink = styled(Link)`
text-decoration: none;
`
const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`
const CustomButton = styled(Button)`
  width: 200px;
`
const CompanyName = styled.span`
color:#04009A;
`
const Title = styled.div`
font-size: 55px;
padding: 10px 0;
`

export const SignUp = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <LeftContainer>
        <SignUpImage src={signUpImg} />
      </LeftContainer>
      <RightContainer>
        <ZinfleetLogo src={LogoImg} />
        <FormContainer>
          <SignInContainer>
            <WelcomeText>
              Welcome to <CompanyName>ZeinFleet</CompanyName>
            </WelcomeText>
            <RightText>
              <div>Have an Account ?</div>
              <CustomLink to="/"
              >
                Sign in
              </CustomLink>
            </RightText>
          </SignInContainer>
          <Title>Sign up</Title>
          <InputField>
            <Typography>Enter your username or email address</Typography>
            <TextField variant="outlined" placeholder="Username or email address" fullWidth />
          </InputField>
          <PersonalInformation>
            <PersonalDetails>
              <Typography>User name</Typography>
              <TextField variant="outlined" placeholder="User name" fullWidth />
            </PersonalDetails>
            <PersonalDetails>
              <Typography>Contact Number</Typography>
              <TextField variant="outlined" placeholder="Contact Number" fullWidth />
            </PersonalDetails>
          </PersonalInformation>
          <InputField>
            <Typography>Enter your Password</Typography>
            <TextField variant="outlined" placeholder="Password" fullWidth />
          </InputField>
          <ButtonContainer>
            <CustomButton
              variant="contained"
              onClick={() => {
                navigate("/");
              }}
            >
              Sign up
            </CustomButton>
          </ButtonContainer>
        </FormContainer>
      </RightContainer>
    </Container>
  );
};
