import clsx from "clsx";
import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useLayoutStyles } from "../../../components/useCommonStyles";
import { TScoreHistory } from "../../../types";
import { ScoreHistorySummary } from "../../../models/ScoreHistorySummary";

interface ProgressSummaryProps {
  history: TScoreHistory;
}

const ProgressSummary: FC<ProgressSummaryProps> = ({ history }) => {
  const layoutClasses = useLayoutStyles();
  const progressSummary = new ScoreHistorySummary(history).getSummary();

  return (
    <Card variant="outlined" className={layoutClasses.fullHeight}>
      <CardContent className={clsx(layoutClasses.padding3, layoutClasses.mb1)}>
        <Grid container>
          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="h3">{progressSummary.title}</Typography>
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