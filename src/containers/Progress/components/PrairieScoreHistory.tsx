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

import { TProgress } from "src/types";
import {
  useCardStyles,
  useFontStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";
import { Theme } from "src/theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    responsiveLineWrapper: {
      height: 300,
      maxWidth: 1200,

      "& circle": {
        r: 4,
        fill: theme.palette.secondaryGreen1.main,
      },

      '& [fill="#fc8d62"]': {
        r: 6,
        fill: theme.palette.primaryNavy.main,
      },
    },
  })
);

interface PrairieScoreHistoryProps {
  active: number;
  scoreHistory: TProgress[];
}

const PrairieScoreHistory = ({
  active,
  scoreHistory,
}: PrairieScoreHistoryProps) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  const data = useMemo(() => {
    if (!scoreHistory.length) return { id: "Score", data: [] };
    return [
      {
        id: "Score",
        data: scoreHistory.map((score) => ({
          x: dayjs(score.updatedAt).format("MM/DD/YYYY"),
          y: score.total || 0,
        })),
      },
      {
        id: "Current Score",
        data: scoreHistory.slice(active, active + 1).map((history) => ({
          x: dayjs(history.updatedAt).format("MM/DD/YYYY"),
          y: history.total || 0,
        })),
      },
    ] as any;
  }, [active, scoreHistory]);

  if (!scoreHistory.length) return null;

  return (
    <Card
      variant="outlined"
      className={clsx(cardClasses.card, layoutClasses.pb3)}
    >
      <Grid item xs={12}>
        <Typography
          variant="h3"
          className={clsx(fontClasses.font500, layoutClasses.mb1)}
        >
          PrairieScore History
        </Typography>
      </Grid>

      <Grid
        container
        spacing={1}
        item
        xs={12}
        className={classes.responsiveLineWrapper}
      >
        <ResponsiveLine
          colors={{ scheme: "set2" }}
          curve="linear"
          data={data}
          defs={[
            linearGradientDef("gradientA", [
              { offset: 0, color: "inherit" },
              { offset: 100, color: "inherit", opacity: 0 },
            ]),
          ]}
          enableArea
          enableSlices="x"
          isInteractive={false}
          margin={{ top: 4, bottom: 30, left: 30 }}
          lineWidth={1}
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
