import clsx from "clsx";
import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import {
  useColorStyles,
  useLayoutStyles,
} from "../../../components/useCommonStyles";
import { MAX_PRAIRIE_SCORE } from "../constants";

interface LatestPrairieScoreProps {
  current: number;
}

const LatestPrairieScore: FC<LatestPrairieScoreProps> = ({ current }) => {
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card variant="outlined">
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h3">Latest PrairieScore</Typography>
            <Typography variant="caption">Updated 7 days ago</Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="body1">{current}</Typography>
            <Typography variant="body2">
              {["/", MAX_PRAIRIE_SCORE].join("")}
            </Typography>
            <Typography
              variant="body2"
              className={colorClasses.secondaryGreen1}
            >
              &nbsp;(-3)
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LatestPrairieScore;
