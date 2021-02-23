import { Button, Paper, Container, Divider } from "@material-ui/core";
import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

//css
const sectionStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
};

const paperStyle = {
  padding: "2rem",
  display: "flex",
  flexDirection: "column",
  width: "100%",
  gap: ".5rem",
};

export default function Profile() {
  const { currentUser, logout } = useAuth();

  //localstate
  const [loading, setLoading] = useState(false);

  const logoutButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      logout()
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }, 1200);
  };

  return (
    <Container maxWidth="xs">
      <section style={sectionStyle}>
        <Paper style={paperStyle} elevation={7}>
          <h2>Profile</h2>
          <h3>Email: {currentUser && currentUser.email}</h3>
          <Button color="primary" variant="contained">
            Update Profile
          </Button>
          <Divider />
          <Button
            disabled={loading}
            onClick={logoutButtonClick}
            color="primary"
          >
            {loading ? "Logging Out..." : "Log Out"}
          </Button>
        </Paper>
      </section>
    </Container>
  );
}
