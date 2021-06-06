import React, { useState, useRef } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { PASS_REGEX, PASS_VALID_MSGS } from "../../global.js";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      BANKS
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();

  const passwordRef = useRef();
  const confPasswordRef = useRef();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorsState, setErrorsState] = useState({
    firstName: false,
    lastName: false,
    email: false,
    password: false,
    confirmPassword: false,
    passwordsSame: false,
  });
  const [passwordContains, setPasswordContains] = useState({
    length: false,
    digit: false,
    case: false,
    specialCharacter: false,
  });
  const [enteringPassword, setEnteringPassword] = useState(false);
  const history = useHistory();

  function setAnErrorInErrorsState(property, state = true) {
    let obj = { ...errorsState };
    obj[property] = state;
    setErrorsState(obj);
  }

  function checkIfPasswordSame() {
    if (
      passwordRef.current.value !== confPasswordRef.current.value ||
      !passwordRef.current.value
    ) {
      if (!errorsState["confirmPassword"])
        setAnErrorInErrorsState("confirmPassword");
    } else if (errorsState["confirmPassword"]) {
      setAnErrorInErrorsState("confirmPassword", false);
    }
  }

  function validatePassword() {
    const keys = Object.keys(PASS_REGEX);
    const values = Object.values(PASS_REGEX);

    if (!passwordRef.current.value) {
      setPasswordContains({
        length: false,
        digit: false,
        case: false,
        specialCharacter: false,
      });
    }

    const testObj = { ...passwordContains };
    values.forEach((ele, i) => {
      if (ele.test(passwordRef.current.value)) {
        testObj[keys[i]] = true;
      } else {
        testObj[keys[i]] = false;
      }
      if (!ele.test(passwordRef.current.value)) {
        if (!errorsState["password"]) setAnErrorInErrorsState("password");
      } else if (errorsState["password"]) {
        setAnErrorInErrorsState("password", false);
      }
    });
    setPasswordContains(testObj);

    if (!enteringPassword) setEnteringPassword(true);
  }


  function checkFormValidity() {
    let obj = { ...errorsState };

    if (validateEmail(email)) obj.email = true;
    else obj.email = false;
    if (firstName) obj.firstName = true;
    else obj.firstName = false;
    if (lastName) obj.lastName = true;
    else obj.lastName = false;
    if (password) obj.password = true;
    else obj.password = false;
    if (confirmPassword) obj.confirmPassword = true;
    else obj.confirmPassword = false;
    if (password === confirmPassword) obj.passwordsSame = true;
    else obj.passwordsSame = false;

    setErrorsState(obj);

    for (let i in obj) if (!obj[i]) return false;
    return true;
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (checkFormValidity()) {
      const response = await axios.post("http://localhost:5000/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      });
      console.log(response.data);
      if (response.data.success) {
        console.log("redirecting");
        history.push("/");
      } else {
        alert(response.data.message);
      }
    }
  }

  function validateEmail(emailAddress) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(emailAddress).toLowerCase());
  }

  return (
    <Container component="main" maxWidth="xs" style={{ height: "70vh" }}>
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                onBlur={checkFormValidity}
                error={!errorsState.firstName}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onBlur={checkFormValidity}
                error={!errorsState.lastName}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                type="email"
                onBlur={checkFormValidity}
                error={!errorsState.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                inputRef={passwordRef}
                onInput={() => validatePassword()}
                onBlur={() => {
                  checkFormValidity();
                  validatePassword();
                }}
                error={!errorsState.password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              {enteringPassword ? (
                <ul style={{ color: "red" }}>
                  {Object.keys(PASS_VALID_MSGS).map((ele, i) => {
                    if (passwordContains[ele]) {
                      return (
                        <li style={{ color: "green" }} key={i}>
                          {Object.values(PASS_VALID_MSGS)[i]}
                        </li>
                      );
                    } else {
                      return (
                        <li key={i}>{Object.values(PASS_VALID_MSGS)[i]}</li>
                      );
                    }
                  })}
                </ul>
              ) : null}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                error={
                  !errorsState.confirmPassword || !errorsState.passwordsSame
                }
                value={confirmPassword}
                inputRef={confPasswordRef}
                onBlur={checkIfPasswordSame}
                onInput={checkIfPasswordSame}
                onChange={(e) => setConfirmPassword(e.target.value)}
                name="confirm-password"
                label="Confirm Password"
                type="password"
                id="confirm-password"
                autoComplete="confirm-password"
                helperText={
                  errorsState.passwordsSame
                    ? null
                    : "Your passwords are not the same"
                }
              />
            </Grid>
          </Grid>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/signin" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
