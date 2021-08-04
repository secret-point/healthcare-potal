import clsx from "clsx";
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
import { MAX_PRAIRIE_SCORE } from "../constants";
import PrairieScoreBar from "./PrairieScoreBar";

interface LatestPrairieScoreProps {
  current: number;
}

const LatestPrairieScore: FC<LatestPrairieScoreProps> = ({ current }) => {
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card variant="outlined" className={layoutClasses.fullHeight}>
      <CardContent className={clsx(layoutClasses.padding3, layoutClasses.mb1)}>
        <Grid container>
          <Grid
            container
            item
            xs={12}
            justify="space-between"
            alignItems="center"
            className={layoutClasses.mb3}
          >
            <Typography variant="h3" className={fontClasses.fontNormal}>
              Latest PrairieScore
            </Typography>
            <Typography variant="body1">Updated 7 days ago</Typography>
          </Grid>

          <Grid
            container
            item
            xs={12}
            alignItems="flex-end"
            className={layoutClasses.mb2}
          >
            <Typography variant="h1">{current}</Typography>
            <Typography variant="subtitle2">
              {["/", MAX_PRAIRIE_SCORE].join("")}
            </Typography>
            <Typography
              variant="subtitle2"
              className={colorClasses.secondaryGreen1}
            >
              &nbsp;(-3)
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <PrairieScoreBar score={40} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LatestPrairieScore;
