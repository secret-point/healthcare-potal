import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { ButtonLink } from "../../../components/Link";
import { useBackgroundColorStyles } from "../../../components/useCommonStyles";
import { ROUTES } from "../../../app/types";
import { TProgress } from "../../../types";
import { Theme } from "../../../theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      boxShadow: "none",
      border: `1px solid ${theme.palette.yellow.main}`,
    },
    content: {
      padding: `${theme.spacing(2, 2, 2, 4)} !important`,
    },
  })
);

interface CheckInNoticeProps {
  latestItem: TProgress;
}

const CheckInNotice: FC<CheckInNoticeProps> = ({ latestItem }) => {
  const classes = useStyles();
  const backgroundClasses = useBackgroundColorStyles();

  const diffInDays = dayjs().diff(latestItem.updatedAt, "day");

  return (
    <Card className={classes.card}>
      <CardContent
        className={clsx(classes.content, backgroundClasses.backgroundYellow)}
      >
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">
            {diffInDays
              ? `It’s been ${diffInDays} days since your last assessment.`
              : "You last took your assessment today."}
          </Typography>
          <ButtonLink
            text="Take the survey"
            to={ROUTES.ASSESSMENT}
            align="left"
          />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CheckInNotice;
