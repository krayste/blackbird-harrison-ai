import { useState } from "react";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import logo from "../../assets/logo.svg";
import * as EmailValidator from "email-validator";

export function isValidEmail(email) {
  return EmailValidator.validate(email);
}

export function getPasswordProperties(password) {
  let upperFormat = "^(?=.*[A-Z])";
  let lowerFormat = "^(?=.*[a-z])";
  // eslint-disable-next-line no-useless-escape
  let specialFormat = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let numberFormat = "^(?=.*[0-9])";
  const lengthCorrect = password.length >= 8;
  const upperCorrect = password.match(upperFormat) ? true : false;
  const lowerCorrect = password.match(lowerFormat) ? true : false;
  const specialCorrect = password.match(specialFormat) ? true : false;
  const numberCorrect = password.match(numberFormat) ? true : false;
  return {
    lengthCorrect,
    upperCorrect,
    lowerCorrect,
    specialCorrect,
    numberCorrect,
  };
}

export function isValidPassword(passwordProperties) {
  return (
    passwordProperties.lengthCorrect &&
    passwordProperties.lowerCorrect &&
    passwordProperties.upperCorrect &&
    passwordProperties.specialCorrect &&
    passwordProperties.numberCorrect
  );
}

export function getEmailErrorMessage(emailValid) {
  if (!emailValid) {
    return "Please enter valid email address";
  }
  return "";
}

export function getPasswordErrorMessage(passwordProperties) {
  if (!passwordProperties.lengthCorrect) {
    return "Password should contain 8 or more characters";
  }
  if (!passwordProperties.upperCorrect || !passwordProperties.lowerCorrect) {
    return "Password should contain a minimum of 1 uppercase and lowercase letter";
  }
  if (!passwordProperties.numberCorrect) {
    return "Password should contain a minimum of 1 digit of numeric value";
  }
  if (!passwordProperties.specialCorrect) {
    return "Password should contain a minimum of 1 special character";
  }

  return "";
}

export default function LoginForm() {
  const [showAlert, setShowAlert] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [emailErrorString, setEmailErrorString] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);
  const [passwordErrorString, setPasswordErrorString] = useState("");

  const validateForm = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    const validEmail = isValidEmail(email);
    setEmailValid(validEmail);
    setEmailErrorString(getEmailErrorMessage(validEmail));

    const passwordProperties = getPasswordProperties(password);
    const validPassword = isValidPassword(passwordProperties);
    setPasswordValid(validPassword);
    setPasswordErrorString(getPasswordErrorMessage(passwordProperties));

    return validEmail && validPassword;
  };

  const resetEmailField = (event) => {
    event.preventDefault();
    setEmailValid(true);
    setEmailErrorString("");
    setShowAlert(false);
  };

  const resetPasswordField = (event) => {
    event.preventDefault();
    setPasswordValid(true);
    setPasswordErrorString("");
    setShowAlert(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    const isValid = validateForm(event);
    if (isValid) {
      setShowAlert("Login Successful");
    }
  };

  return (
    <>
      {showAlert && (
        <Snackbar
          open={showAlert}
          autoHideDuration={6000}
          onClose={() => setShowAlert(false)}
          message={showAlert}
        >
          <Alert>{showAlert}</Alert>
        </Snackbar>
      )}
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              my: 2,
            }}
          >
            <img src={logo} width="147" alt="harrison.ai" />
          </Box>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onInput={resetEmailField}
              error={!emailValid}
              helperText={emailErrorString}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onInput={resetPasswordField}
              error={!passwordValid}
              helperText={passwordErrorString}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
          </Box>
        </Box>
      </Grid>
    </>
  );
}
