import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { EditButton } from "../../../components/Button";

import { useBackgroundColorStyles } from "../../../components/useCommonStyles";

const CheckInNotice = () => {
  const backgroundClasses = useBackgroundColorStyles();

  return (
    <Card className={backgroundClasses.backgroundYellow}>
      <CardContent>
        <Grid container justify="space-between">
          <Typography>It’s been 7 days since your last check-in.</Typography>
          <EditButton title="Take the survey" />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CheckInNotice;
