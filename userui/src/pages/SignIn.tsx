import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import signInImg from "../assets/images/signin.png";
import LogoImg from "../assets/images/logo.png";
import { useNavigate } from "react-router-dom";

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
  top: 20%;
  left: 20%;
  flex: 1;
  padding: 40px;
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
  font-weight:500;
  font-size:21px
`;
const RightText = styled.div`
  font-weight:300;
  font-size:16px;
`;
const InputField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
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

const ButtonContainer = styled.div`
display: flex;
justify-content: flex-end
`
const Title = styled.div`
font-size: 28px;
padding: 20px 0;
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
              Welcome to <span style={{ color: "#0066ff" }}>ZeinFleet</span>
            </WelcomeText>
            <RightText>
              <div>No Account ?</div>
              <Button sx={{ textTransform: "none" }} onClick={() => { navigate("/signup") }}>
                Sign up
              </Button>
            </RightText>
          </SignInContainer>
          <Title>Sign up</Title>
          <InputField>
            <Typography>Enter your username or email address</Typography>
            <TextField variant="outlined" placeholder="Username or email address" fullWidth />
          </InputField>
          <InputField>
            <Typography>Enter your Password</Typography>
            <TextField variant="outlined" placeholder="Password" fullWidth sx={{ borderRadius: "8px" }} />
          </InputField>
          <ButtonContainer>
            <Typography sx={{ color: "#0066ff", display: "flex", justifyContent: "flex-end" }}>
              Forget Password?
            </Typography>
          </ButtonContainer>
          <ButtonContainer>
            <Button
              variant="contained"
              sx={{ textTransform: "none", display: "flex", justifyContent: "flex-end", marginTop: "15px" }}
              onClick={() => { navigate("/dashboard") }}
            >
              Sign in
            </Button>
          </ButtonContainer>
        </FormContainer>
      </LeftContainer>
      <RightContainer>
        <SignInImage src={signInImg} />
      </RightContainer>
    </Container>
  );
};
