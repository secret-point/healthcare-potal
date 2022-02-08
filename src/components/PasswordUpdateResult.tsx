import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { ReactComponent as GreenCheckIcon } from "src/icons/GreenCheckIcon.svg";
import { ReactComponent as RedCrossIcon } from "src/icons/RedCrossIcon.svg";

import { useLayoutStyles } from "./useCommonStyles";

interface PasswordUpdateResultProps {
  shouldPasswordMatch: boolean;
  shouldLongerThan8: boolean;
}

const PasswordUpdateResult: FC<PasswordUpdateResultProps> = ({
  shouldPasswordMatch,
  shouldLongerThan8,
}) => {
  const layoutClasses = useLayoutStyles();

  return (
    <Grid item xs={12} className={layoutClasses.mt2}>
      <Grid container item xs={12} alignItems="center">
        {shouldPasswordMatch ? <GreenCheckIcon /> : <RedCrossIcon />}
        <Typography className={layoutClasses.ml2}>Password matches</Typography>
      </Grid>
      <Grid container item xs={12} alignItems="center">
        {shouldLongerThan8 ? <GreenCheckIcon /> : <RedCrossIcon />}
        <Typography className={layoutClasses.ml2}>
          Minimum of 8 characters
        </Typography>
      </Grid>
    </Grid>
  );
};

export default PasswordUpdateResult;
