import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";
import { TProgress } from "src/types";

import { MAX_PRAIRIE_SCORE } from "../constants";
import PrairieScoreBar from "./PrairieScoreBar";

const useStyles = makeStyles((theme) =>
  createStyles({
    card: {
      borderRadius: theme.spacing(2),
    },
  })
);

interface LatestPrairieScoreProps {
  previousItem?: TProgress;
  latestItem: TProgress;
}

const LatestPrairieScore: FC<LatestPrairieScoreProps> = ({
  previousItem,
  latestItem,
}) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();
  const diffInDays = dayjs().diff(latestItem.updatedAt, "day");

  return (
    <Card
      variant="outlined"
      className={clsx(layoutClasses.fullHeight, classes.card)}
    >
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
            <Typography variant="body1">
              {diffInDays ? `Updated ${diffInDays} days ago` : "Updated Today"}
            </Typography>
          </Grid>

          <Grid
            container
            item
            xs={12}
            alignItems="flex-end"
            className={layoutClasses.mb2}
          >
            <Typography variant="h1">{latestItem.total}</Typography>
            <Typography variant="subtitle2">
              {["/", MAX_PRAIRIE_SCORE].join("")}
            </Typography>
            <Typography
              variant="subtitle2"
              className={colorClasses.secondaryGreen1}
            >
              {` (${latestItem.total - (previousItem?.total || 0)})`}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <PrairieScoreBar score={latestItem.total} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default LatestPrairieScore;
