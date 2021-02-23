// React Hooks
import { useForm } from "react-hook-form";
// React Router
import { Link } from "react-router-dom";
// Material Design UI
import {
  TextField,
  Grid,
  Container,
  Button,
  makeStyles,
  Paper,
} from "@material-ui/core";

// Custom Styles
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
    alignItems: "flex-end",
    marginTop: "1rem",
    flexDirection: "column",
  },
  errorPTag: {
    fontSize: ".8rem",
    color: "red",
  },
  buttonStyle: {
    marginTop: "1.2rem",
  },
  headingH1: {
    textAlign: "center",
    color: "#3f51b5",
  },
  linkStyle: {
    color: "#3f51b5",
  },
});

const SignIn = () => {
  const { register, errors, handleSubmit } = useForm();

  // Initialized classes
  const classes = useStyles();

  const handleFormSubmit = (data) => {
    console.log("data", data);
  };

  return (
    <Container maxWidth="xs">
      <Grid container className={classes.root}>
        <Paper className={classes.paper} elevation={7}>
          <h1 className={classes.headingH1}>Reset Password</h1>
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
              inputRef={register({ required: true })}
            />
            {errors.email?.type === "required" && (
              <p className={classes.errorPTag}>Required*</p>
            )}
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              className={classes.buttonStyle}
            >
              Reset Password
            </Button>
          </form>
          <section className={classes.lastSection}>
            <p>
              Already have an account?{" "}
              <Link className={classes.linkStyle} to="/signin">
                Sign In
              </Link>
            </p>
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
