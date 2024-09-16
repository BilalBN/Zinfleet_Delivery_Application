import styled from "@emotion/styled";
import signUpImg from "../assets/images/signup.png";
import LogoImg from "../assets/images/logo.png";
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
  oveflow-y: hidden;
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
  flex-direction: column;
  flex: 1;
  max-width: 50%;
  justify-content: center;
  align-items: center;
`;

const FormContainer = styled.div`
display: flex;
flex-direction: column;
justify-content:center;
top: 20%;
left: 20%;
flex: 1;
padding: 40px;
overflow-y: auto;
gap: 10px;
overflow-y: auto;
`;
const SignInContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  white-space: nowrap;
`;
const WelcomeText = styled.div`
  font-weight: 500;
  font-size: 21px;
`;
const RightText = styled.div`
  font-weight: 300;
  font-size: 16px;
`;
const InputField = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
`;
const PersonalInformation = styled.div`
  display: flex;
`;
const PersonalDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CustomLink= styled(Link)`
text-transform: none
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
              Welcome to <span style={{ color: "#0066ff" }}>ZeinFleet</span>
            </WelcomeText>
            <RightText>
              <div>Have an Account ?</div>
              <CustomLink to="/"
              >
                Sign in
              </CustomLink>
            </RightText>
          </SignInContainer>
          <Typography variant="h4">Sign up</Typography>
          <InputField>
            <Typography>Enter your username or email address</Typography>
            <TextField variant="outlined" placeholder="Username or email address" fullWidth />
          </InputField>
          <InputField>
            <PersonalInformation>
              <PersonalDetails>
                <Typography>User name</Typography>
                <TextField variant="outlined" placeholder="User name" sx={{ marginright: "4px" }} />
              </PersonalDetails>
              <PersonalDetails>
                <Typography>Contact Number</Typography>
                <TextField variant="outlined" placeholder="Contact Number" sx={{ marginLeft: "4px" }} />
              </PersonalDetails>
            </PersonalInformation>
          </InputField>
          <InputField>
            <Typography>Enter your Password</Typography>
            <TextField variant="outlined" placeholder="Password" fullWidth />
          </InputField>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                display: "flex",
                justifyContent: "flex-end",
                marginTop: "15px",
              }}
              onClick={() => {
                navigate("/");
              }}
            >
              Sign up
            </Button>
          </div>
        </FormContainer>
      </RightContainer>
    </Container>
  );
};
