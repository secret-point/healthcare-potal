import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { EditButton } from "../../components/Button";
import { useFontStyles } from "../../components/useCommonStyles";

import GreatStrides from "./components/GreatStrides";
import CheckInNotice from "./components/CheckInNotice";
import LatestPrairieScore from "./components/LatestPrairieScore";

const LatestProgress = () => {
  const fontClasses = useFontStyles();

  return (
    <Grid container>
      <Grid container item xs={12}>
        <Typography variant="h2" className={fontClasses.font500}>
          Your Latest Progress
        </Typography>
        <EditButton title="Update my score" />
      </Grid>

      <Grid item xs={12}>
        <Grid item xs={6}>
          <LatestPrairieScore current={40} />
        </Grid>
        <Grid item xs={6}>
          <GreatStrides />
        </Grid>
      </Grid>

      <Grid item xs={12}>
        <CheckInNotice />
      </Grid>
    </Grid>
  );
};

export default LatestProgress;
