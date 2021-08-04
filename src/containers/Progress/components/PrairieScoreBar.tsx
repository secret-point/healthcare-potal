import clsx from "clsx";
import { FC } from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { MAX_PRAIRIE_SCORE, prairieScoreDefs } from "../constants";
import {
  useFontStyles,
  useBackgroundColorStyles,
} from "../../../components/useCommonStyles";

type StyleProps = {
  percent: number;
};

const useStyles = makeStyles((theme) =>
  createStyles({
    progressBar: {
      width: "100%",
      height: theme.spacing(1),
      borderRadius: theme.spacing(1),
      position: "relative",
    },
    gradientProgress: {
      width: ({ percent }: StyleProps) => `${percent}%`,
      height: theme.spacing(1),
      borderRadius: theme.spacing(1),
      background: "linear-gradient(45deg, #6D9147 0%, #EB5757 100%)",
      position: "absolute",
      left: 0,
      top: 0,
    },
    scoreLabel: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
    },
    labelsContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
  })
);

interface PrairieScoreBarProps {
  score: number;
}

const PrairieScoreBar: FC<PrairieScoreBarProps> = ({ score }) => {
  const classes = useStyles({ percent: (score / MAX_PRAIRIE_SCORE) * 100 });
  const fontClasses = useFontStyles();
  const backgroundClasses = useBackgroundColorStyles();

  return (
    <div>
      <div
        className={clsx(classes.progressBar, backgroundClasses.distinctiveGray)}
      >
        <div className={classes.gradientProgress} />
      </div>
      <div className={classes.labelsContainer}>
        {prairieScoreDefs.map((scoreDef) => (
          <div key={scoreDef.type} className={classes.scoreLabel}>
            <Typography variant="caption" className={fontClasses.fontBolder}>
              {scoreDef.type}
            </Typography>
            <Typography variant="caption">
              {`(${scoreDef.range.min}~${scoreDef.range.max})`}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PrairieScoreBar;