import clsx from "clsx";
import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useFontStyles, useLayoutStyles } from "src/components/useCommonStyles";
import { TProgress } from "src/types";
import { ScoreHistorySummary } from "src/models/ScoreHistorySummary";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      borderRadius: theme.spacing(2),
    },
    title: {
      lineHeight: 1.5,
    },
  })
);

interface ProgressSummaryProps {
  history: TProgress[];
}

const ProgressSummary: FC<ProgressSummaryProps> = ({ history }) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();
  const progressSummary = new ScoreHistorySummary(history).getSummary();

  return (
    <Card
      variant="outlined"
      className={clsx(layoutClasses.fullHeight, classes.card)}
    >
      <CardContent className={clsx(layoutClasses.padding3, layoutClasses.mb1)}>
        <Grid container>
          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography
              variant="h3"
              className={clsx(fontClasses.fontNormal, classes.title)}
            >
              {progressSummary.title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="subtitle1"
              dangerouslySetInnerHTML={{ __html: progressSummary.summary }}
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProgressSummary;
