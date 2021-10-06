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
import { TScoreItem } from "../../../types";

const useStyles = makeStyles((theme) =>
  createStyles({
    content: {
      padding: `${theme.spacing(2, 2, 2, 4)} !important`,
    },
  })
);

interface CheckInNoticeProps {
  latestItem: TScoreItem;
}

const CheckInNotice: FC<CheckInNoticeProps> = ({ latestItem }) => {
  const classes = useStyles();
  const backgroundClasses = useBackgroundColorStyles()();

  const diffInDays = dayjs().diff(latestItem.date, "day");

  return (
    <Card>
      <CardContent
        className={clsx(classes.content, backgroundClasses.backgroundYellow)}
      >
        <Grid container justify="space-between" alignItems="center">
          <Typography variant="h5">
            {`It’s been ${diffInDays} days since your last check-in.`}
          </Typography>
          <ButtonLink text="Take the survey" to={ROUTES.CHECKIN} align="left" />
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CheckInNotice;
