import styled from "@emotion/styled";
import { Box, Button, TextField, Typography } from "@mui/material";
import singUpImg from "../assets/signup.png";

const Container = styled(Box)`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  overflow: hidden; /* Prevent unnecessary scroll */
`;

const FormContainer = styled(Box)`
  flex: 1;
  padding: 40px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 50%;
  max-height: 90vh; /* Ensure content doesn't exceed viewport height */
  overflow-y: auto; /* Allow internal scrolling if needed */
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
  margin-bottom: 16px !important;
`;

export const SignUp: React.FC = () => {
  return (
    <Container>
      <TruckImageContainer>
        <TruckImage src={singUpImg} />
      </TruckImageContainer>
      <FormContainer>
        <Typography variant="h4" component="h1" gutterBottom>
          Welcome to <span style={{ color: "#0066ff" }}>ZINFLEET</span>
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Sign Up
        </Typography>
        <StyledTextField fullWidth label="Username or email address" variant="outlined" />
        <StyledTextField fullWidth label="User name" variant="outlined" />
        <StyledTextField fullWidth label="Contact Number" variant="outlined" />
        <StyledTextField fullWidth label="Password" type="password" variant="outlined" />
        <Button fullWidth variant="contained" color="primary" style={{ marginTop: "16px" }}>
          Sign up
        </Button>
        <Box mt={2} textAlign="center">
          <Typography variant="body2">
            Have an Account?{" "}
            <a href="#" style={{ color: "#0066ff" }}>
              Sign in
            </a>
          </Typography>
        </Box>
      </FormContainer>
    </Container>
  );
};
