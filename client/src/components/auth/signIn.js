import {
  TextField,
  Grid,
  Container,
  Button,
  makeStyles,
  Paper,
} from "@material-ui/core";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

//auth context
import { useAuth } from "../contexts/AuthContext";

//alert
import Alert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

//make styles
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
  paper: {
    width: "100%",
    padding: "2rem",
    // backgroundColor:'#fdfdfd'
  },
  paperFormDiv: {
    display: "flex",
    flexDirection: "column",
  },
  textFieldMargin: {
    margin: "1.2rem 0 0 0",
  },
  lastSection: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: "1rem",
  },
  errorPTag: {
    fontSize: ".9rem",
    color: "red",
    marginTop: "-.1rem",
  },
  butonStyle: {
    marginTop: "1.2rem",
  },
  headingH1: {
    textAlign: "center",
    color: "#3f51b5",
  },
  forgotPasswordSection: {
    marginTop: "1rem",
  },
  linkStyle: {
    color: "#3f51b5",
  },
});

const SignIn = () => {
  const { register, errors, handleSubmit } = useForm();

  //classes
  const classes = useStyles();

  //local state
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  //useAuth
  const { signIn } = useAuth();

  //usehistory
  const { push } = useHistory();

  const handleFormSubmit = (data) => {
    setErr("");
    setLoading(true);
    signIn(data.email, data.password)
      .then(() => {
        push("/userprofile");
        console.log("pushh it");
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        setErr("Please enter correct email or password");
      });
  };

  return (
    <Container maxWidth="xs">
      <Grid container className={classes.root}>
        <Paper className={classes.paper} elevation={7}>
          <h1 className={classes.headingH1}>Sign In</h1>
          {err && <Alert severity="error">{err}</Alert>}
          <form
            className={classes.paperFormDiv}
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <TextField
              fullWidth
              label="Email"
              className={classes.textFieldMargin}
              name="email"
              variant="outlined"
              inputRef={register({
                required: true,
                pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
              })}
            />
            {/* {errors.email?.type === 'required' && <p className={classes.errorPTag}>Required*</p>} */}
            {errors.email?.type === "pattern" && (
              <p className={classes.errorPTag}>
                please enter correct email address
              </p>
            )}
            <TextField
              fullWidth
              label="Password"
              className={classes.textFieldMargin}
              name="password"
              variant="outlined"
              type="password"
              inputRef={register({ required: true, minLength: 5 })}
            />
            {/* {errors.password?.type === 'required' && <p className={classes.errorPTag}>Required*</p>} */}
            {/* {errors.password?.type === "minLength" && (
              <p className={classes.errorPTag}>minimum length 5*</p>
            )} */}
            <Button
              disabled={loading}
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              className={classes.butonStyle}
            >
              {loading ? "Signing In..." : "Sign In"}
            </Button>
          </form>
          <section className={classes.forgotPasswordSection}>
            <p>
              <Link className={classes.linkStyle} to="/forgotpassword">
                Forgot Password?
              </Link>
            </p>
          </section>
          <section className={classes.lastSection}>
            <p>
              need an account?{" "}
              <Link className={classes.linkStyle} to="/signup">
                Sign Up
              </Link>
            </p>
          </section>
        </Paper>
      </Grid>
    </Container>
  );
};

export default SignIn;
