import clsx from "clsx";
import dayjs from "dayjs";
import { useMemo } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { ResponsiveLine } from "@nivo/line";
// @ts-ignore
import { linearGradientDef } from "@nivo/core";

import { ROUTES } from "src/app/types";
import { TProgress } from "src/types";
import { formatFullDay } from "src/utils/date";
import {
  useCardStyles,
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";
import { ButtonLink } from "src/components/Link";

const useStyles = makeStyles(() =>
  createStyles({
    responsiveLineWrapper: {
      height: 180,
      maxWidth: 300,
    },
    viewMyProgress: {
      alignSelf: "flex-end !important",
    },
  })
);

interface PrairieScoreProps {
  progressList: TProgress[];
}

const PrairieScore = ({ progressList }: PrairieScoreProps) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  const data = useMemo(() => {
    if (!progressList.length) return { id: "PrairieScore", data: [] };
    const firstDate = progressList[0].updatedAt;
    return [
      {
        id: "PrairieScore",
        data: progressList.map((history) => ({
          x: dayjs(firstDate).diff(history.updatedAt, "day") + 1,
          y: history.total || 0,
        })),
      },
    ] as any;
  }, [progressList]);

  if (!progressList.length) return null;
  const firstScoreItem = progressList[0];
  const lastScoreItem = progressList[progressList.length - 1];

  return (
    <Card
      variant="outlined"
      className={clsx(
        cardClasses.card,
        cardClasses.grayBorder,
        layoutClasses.pb0,
        layoutClasses.pt4
      )}
    >
      <Grid container spacing={4}>
        <Grid item xs={12} sm={7}>
          <Box className={classes.responsiveLineWrapper}>
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
              margin={{ top: 4, bottom: 30, left: 30 }}
              lineWidth={1}
              pointSize={10}
              pointBorderColor={{ theme: "background" }}
              pointBorderWidth={2}
              xFormat="time:%m/%d/%y"
              yScale={{
                type: "linear",
                max: 48,
              }}
              layers={["crosshair", "lines", "slices", "points"]}
              fill={[{ match: "*", id: "gradientA" }]}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Grid container className={layoutClasses.fullHeight}>
            <Box width={1}>
              <Typography variant="subtitle2" className={layoutClasses.mb1}>
                Prairie Score
              </Typography>
              <Box width={1} display="flex">
                <Typography variant="h2">
                  {lastScoreItem.total}
                  &nbsp;
                </Typography>
                {progressList.length > 1 && (
                  <Typography
                    variant="h2"
                    className={clsx(
                      colorClasses.secondaryGreen1,
                      fontClasses.fontNormal
                    )}
                  >
                    {`(${lastScoreItem.total - firstScoreItem.total})`}
                  </Typography>
                )}
              </Box>
              <Typography variant="subtitle2" className={layoutClasses.mb15}>
                {formatFullDay(lastScoreItem.updatedAt)}
              </Typography>
            </Box>

            <ButtonLink
              text="View my progress"
              to={ROUTES.PROGRESS}
              align="left"
              className={classes.viewMyProgress}
            />
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

export default PrairieScore;
