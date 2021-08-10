import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useAuth from "../../hooks/useAuth";
import Container from "../../components/Container";

const InTakeForm = () => {
  const { user } = useAuth();

  return (
    <Container>
      <Grid container spacing={4}>
        <Typography>InTake-Form(In Progress)</Typography>
        <Typography>{user?.firstName}</Typography>
      </Grid>
    </Container>
  );
};

export default InTakeForm;
