import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";
import Box from "@material-ui/core/Box";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TProgress } from "src/types";
import {
  useCardStyles,
  useColorStyles,
  useLayoutStyles,
} from "src/components/useCommonStyles";
import PrairieStatus from "./PrairieStatus";
import { ButtonGroup } from "src/components/ArrowButtonGroup";
import { getSeverityBasedOnScore } from "src/utils/helper";

const useStyles = makeStyles(() =>
  createStyles({
    buttonGroupWrapper: {
      marginTop: "auto",
    },
  })
);

interface PrairieStatusCardProps {
  previousScore?: TProgress;
  currentScore: TProgress;
  disabledNext: boolean;
  disabledPrevious: boolean;
  onClickNext: VoidFunction;
  onClickPrevious: VoidFunction;
}

const PrairieStatusCard: FC<PrairieStatusCardProps> = ({
  previousScore,
  currentScore,
  disabledNext,
  disabledPrevious,
  onClickNext,
  onClickPrevious,
}) => {
  const classes = useStyles();
  const cardClasses = useCardStyles();
  const colorClasses = useColorStyles();
  const layoutClasses = useLayoutStyles();

  if (!currentScore) {
    return null;
  }

  const scoreDifference = currentScore.total - (previousScore?.total || 0);

  return (
    <Card variant="outlined" className={clsx(cardClasses.card)}>
      <Grid container className={clsx(layoutClasses.fullHeight)}>
        <Grid item xs={12}>
          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="h3">
              {dayjs(currentScore.updatedAt).format("MMM D, YYYY")}
            </Typography>
          </Grid>

          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="subtitle2" className={layoutClasses.mb05}>
              PrairieScore
            </Typography>

            <Box width={1} display="flex" alignItems="flex-end">
              <Typography variant="h2">{currentScore.total}</Typography>
              <Typography
                variant="subtitle1"
                className={clsx(
                  colorClasses.secondaryGreen1,
                  layoutClasses.ml1
                )}
              >
                {`(${scoreDifference})`}
              </Typography>
            </Box>
          </Grid>

          <Grid container className={layoutClasses.mb2}>
            <Grid item xs={12} className={layoutClasses.mb1}>
              <Typography variant="subtitle2">Severity</Typography>
            </Grid>
            <PrairieStatus current={getSeverityBasedOnScore(currentScore)} />
          </Grid>

          <Grid item xs={12} className={layoutClasses.mb2}>
            <Typography variant="subtitle2">Symptoms</Typography>
            <Typography variant="subtitle1">
              {currentScore.sideEffects.join(", ") || "None reported"}
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={12} className={classes.buttonGroupWrapper}>
          <ButtonGroup
            disabledNext={disabledNext}
            disabledPrevious={disabledPrevious}
            onClickNext={onClickNext}
            onClickPrevious={onClickPrevious}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default PrairieStatusCard;
