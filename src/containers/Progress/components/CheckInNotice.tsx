import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { EditButton } from "../../../components/Button";

import { useBackgroundColorStyles } from "../../../components/useCommonStyles";

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      padding: `${theme.spacing(2, 4)} !important`,
    },
  })
);

const CheckInNotice = () => {
  const classes = useStyles();
  const backgroundClasses = useBackgroundColorStyles();

  return (
    <Card>
      <CardContent
        className={clsx(classes.content, backgroundClasses.backgroundYellow)}
      >
        <Grid container justify="space-between">
          <Typography>It’s been 7 days since your last check-in.</Typography>
          <EditButton title="Take the survey" />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CheckInNotice;
