import styled from "@emotion/styled";
import { Button, TextField, Typography } from "@mui/material";
import signInImg from "../../../assets/images/signin.png";
import LogoImg from "../../../assets/images/logo.png";
import { useAppDispatch } from "../../../store/hook";
import { login } from "../../../store/authSlice";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { setLoading } from "../../../store/rootslice";
import { useSnackbar } from "../components/SnackBar";
import { UserType } from "../../../types/user";

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
});

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
  overflow-y: hidden;
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
  justify-content: center;
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

// const RightText = styled.div`
//   font-weight: 300;
//   font-size: 16px;
// `;

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

const BaseContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ButtonContainer = styled(BaseContainer)`
  margin-top: 20px;
`;

const Title = styled.div`
  font-size: 55px;
  padding: 20px 0;
`;

const CompanyName = styled.span`
  color: #04009a;
`;

// const CustomLink = styled(Link)`
//   text-decoration: none;
// `;

const CustomButton = styled(Button)`
  width: 225px;
  height: 54px;
  text-transform: none;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 25px;
`;

interface SignInFormInputs {
  email: string;
  password: string;
}

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const { openSnackbar } = useSnackbar();
  // React Hook Form setup with Yup validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormInputs>({
    resolver: yupResolver(schema),
  });

  // Function to handle sign-in
  const userSignIn = (data: SignInFormInputs) => {
    dispatch(setLoading(true));
    const emailData = data.email.split("@");
    setTimeout(() => {
      const user = {
        email: data.email,
        name: emailData[0],
        companyName: "slate",
        type:
          emailData[1] == "gmail.com"
            ? UserType.ADMIN_USER
            : emailData[1] == "outlook.com"
            ? UserType.FLEET_USER
            : UserType.WAREHOUSE_USER,
      };
      dispatch(login(user));
      dispatch(setLoading(false));
      openSnackbar("Successfully loggedin", "success");
    }, 1000);
  };

  return (
    <Container>
      <LeftContainer>
        <ZinfleetLogo src={LogoImg} />
        <FormContainer>
          <SignInContainer>
            <WelcomeText>
              Welcome to <CompanyName>ZeinFleet</CompanyName>
            </WelcomeText>
            {/* <RightText>
              <div>No Account?</div>
              <CustomLink to={"/signup"}>Sign up</CustomLink>
            </RightText> */}
          </SignInContainer>
          <Title>Sign in</Title>
          <Form onSubmit={handleSubmit(userSignIn)}>
            <InputField>
              <Typography>Username or email address</Typography>
              <TextField
                variant="outlined"
                fullWidth
                placeholder="Enter your username or email address"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </InputField>
            <InputField>
              <Typography>Password</Typography>
              <TextField
                variant="outlined"
                fullWidth
                type="password"
                placeholder="Enter your Password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </InputField>
            {/* <BaseContainer>
              <CustomLink to={"/"}>Forget Password?</CustomLink>
            </BaseContainer> */}
            <ButtonContainer>
              <CustomButton type="submit" variant="contained" size="large">
                Sign In
              </CustomButton>
            </ButtonContainer>
          </Form>
        </FormContainer>
      </LeftContainer>
      <RightContainer>
        <SignInImage src={signInImg} />
      </RightContainer>
    </Container>
  );
};
