import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "../../../components/useCommonStyles";
import { TScoreHistory } from "../../../types";
import { MAX_PRAIRIE_SCORE } from "../constants";

interface ProgressSummaryProps {
  history: TScoreHistory;
}

const ProgressSummary: FC<ProgressSummaryProps> = ({ history }) => {
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const previousItem = history[history.length - 2];
  const latestItem = history[history.length - 1];
  const difference =
    (previousItem?.score || MAX_PRAIRIE_SCORE) - latestItem.score;
  const previousDate = dayjs(previousItem?.date).format("MMM DD, YYYY");

  if (difference <= 0) return null;

  return (
    <Card variant="outlined" className={layoutClasses.fullHeight}>
      <CardContent className={clsx(layoutClasses.padding3, layoutClasses.mb1)}>
        <Grid container>
          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="h3">
              You’re making great strides! 🎉
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">
              Your score &nbsp;
              <b
                className={clsx(
                  colorClasses.secondaryGreen1,
                  fontClasses.fontBolder
                )}
              >
                {`decreased by ${difference} points`}
              </b>
              {` since ${previousDate}. This means you’ve been experienceing
              less symptoms related to anxiety and depression.`}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ProgressSummary;
