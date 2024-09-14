import styled from "@emotion/styled";
import { Padding } from "@mui/icons-material";
import { Button, TextField } from '@mui/material';
import {Link} from 'react-router-dom'

const SignInWrapper = styled.div`
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7L9TFR900S87mp7hRmwcErUsJO0KruQUspw&s') no-repeat center center;
  background-size: cover;
`;

const SignInBox = styled.div`
  background: rgba(255, 255, 255, 0.1); /* Slightly transparent */
  border-radius: 15px;
  padding: 40px;
  max-width: 400px;
  width: 100%;
  backdrop-filter: blur(10px); /* Creates the blur effect */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* Adds a shadow for depth */
  border: 1px solid rgba(255, 255, 255, 0.3); /* Optional, creates an inner border */
`;

const Header= styled.div`
  display: flex;
  justify-content: space-between;
`

const LeftSide= styled.div`
  font-size: 21px;
`

const RightSide= styled.div`
 font-size: 21px;
`

const Title=styled.div`
  font-size: 55px;
  font-weight: 500;
`
const FormConatiner=styled.div`
 display: flex;
 flex-direction: column;
 gap: 20px;
`

const ActionContainer=styled.div`
display: flex;
justify-content: flex-end;
`

const CustomLabel=styled.label`
position: relative;
top: 10px;
`

export const SignIn=() =>{
  return (
    <SignInWrapper>
      <SignInBox>
        <Header>
          <LeftSide >
            Welcome to <Link to="/" color="primary">ZINFLEET</Link>
          </LeftSide>
          <RightSide>
          <div>
            No Account ?
          </div>
          <Link to="/signup">
            Signup
          </Link>
          </RightSide>
        </Header>
        <Title>
          SignIn
        </Title>
          <FormConatiner>
          <div>
          <CustomLabel>Username or email address</CustomLabel>
          <TextField
            placeholder="Username or email address"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              style: { backgroundColor: 'white' }, // White background
            }}
            InputLabelProps={{
              shrink: true, // Keeps the label shrunk and hides placeholder on focus
            }}
          />
          </div>
          <div>
          <CustomLabel>Password</CustomLabel>
          <TextField
            placeholder="Password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            InputProps={{
              style: { backgroundColor: 'white' }, // White background
            }}
            InputLabelProps={{
              shrink: true, // Keeps the label shrunk and hides placeholder on focus
            }}
          />
          </div>
          <ActionContainer>
            <Link to="/forgotpassword">
              Forgot Password?
            </Link>
          </ActionContainer>
          <ActionContainer>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ padding: "10px 60px" }}
            >
              Sign in
            </Button>
          </ActionContainer>
        </FormConatiner>
      </SignInBox>
    </SignInWrapper>
  );
}
