import clsx from "clsx";
import dayjs from "dayjs";
import { useMemo } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ResponsiveLine } from "@nivo/line";
// @ts-ignore
import { linearGradientDef } from "@nivo/core";

import { TScoreHistory } from "../../../types/general";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "../../../components/useCommonStyles";

const useStyles = makeStyles(() =>
  createStyles({
    responsiveLineWrapper: {
      height: 300,
      maxWidth: 1200,
    },
  })
);

interface PrairieScoreHistoryProps {
  scoreHistory: TScoreHistory;
}

const PrairieScoreHistory = ({ scoreHistory }: PrairieScoreHistoryProps) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  const data = useMemo(() => {
    if (!scoreHistory.length) return { id: "Score", data: [] };
    return [
      {
        id: "Score",
        data: scoreHistory.map((history) => ({
          x: dayjs(history.date).format("MM/DD/YYYY"),
          y: history.score,
        })),
      },
    ] as any;
  }, [scoreHistory]);

  if (!scoreHistory.length) return null;

  return (
    <Card
      variant="outlined"
      className={clsx(cardClasses.card, layoutClasses.pb0)}
    >
      <Grid item xs={12}>
        <Typography variant="h3" className={layoutClasses.mb1}>
          PrairieScore History
        </Typography>
        <Typography
          variant="subtitle2"
          className={clsx(layoutClasses.mb1, colorClasses.secondaryNavy2)}
        >
          Select a dot on the graph to view your progress from that date
        </Typography>
      </Grid>

      <Grid
        container
        spacing={1}
        item
        xs={12}
        className={clsx(
          layoutClasses.fullHeight,
          classes.responsiveLineWrapper
        )}
      >
        <ResponsiveLine
          margin={{ top: 4, bottom: 30, left: 30 }}
          animate
          enableSlices="x"
          enableArea
          curve="natural"
          colors={{ scheme: "set2" }}
          data={data}
          lineWidth={1}
          defs={[
            linearGradientDef("gradientA", [
              { offset: 0, color: "inherit" },
              { offset: 100, color: "inherit", opacity: 0 },
            ]),
          ]}
          pointSize={10}
          pointBorderColor={{ theme: "background" }}
          pointBorderWidth={2}
          layers={[
            "areas",
            "crosshair",
            "lines",
            "slices",
            "points",
            "axes",
            "mesh",
          ]}
          fill={[{ match: "*", id: "gradientA" }]}
          xFormat="time:%m/%d/%y"
          yScale={{
            type: "linear",
            max: 48,
          }}
        />
      </Grid>
    </Card>
  );
};

export default PrairieScoreHistory;
