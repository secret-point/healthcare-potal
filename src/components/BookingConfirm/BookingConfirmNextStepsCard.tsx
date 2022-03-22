import { FC } from "react";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles, withStyles } from "@material-ui/core/styles";

import { useFontStyles, useLayoutStyles } from "src/components/useCommonStyles";
import Button from "src/components/Button";
import { Theme } from "src/theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      margin: 0,
      marginInlineStart: theme.spacing(-2),
    },

    signInButton: {
      background: `${theme.palette.secondaryGreen1.main} !important`,
      borderRadius: theme.spacing(1),
      textTransform: "none",
      padding: theme.spacing(1.5, 2),

      "& .MuiTypography-root": {
        color: "white !important",
        letterSpacing: 0,
      },
    },
  })
);

const BodyTypography = withStyles(() => ({
  root: {
    fontWeight: "normal",
  },
}))(Typography);

interface BookingConfirmNextStepsCardProps {
  onSignIn: VoidFunction;
}

const BookingConfirmNextStepsCard: FC<BookingConfirmNextStepsCardProps> = ({
  onSignIn,
}) => {
  const classes = useStyles();
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();

  const LIST = [
    "Sign into your Prairie account, using the email and password you provided",
    "Complete your intake form",
    "Complete your first assessment",
  ];

  return (
    <Card className={layoutClasses.padding4}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" className={fontClasses.fontBold}>
            Next Steps
          </Typography>
        </Grid>

        <Grid item xs={12}>
          {/* eslint-disable */}
          <BodyTypography variant="h6">
            The following next steps are <b>required</b>. If they are not
            completed 48 hours prior to your appointment, your appiontment may
            be cancelled.
          </BodyTypography>
        </Grid>

        <Grid item xs={12}>
          <ul className={classes.list}>
            {LIST.map((each, index) => (
              <li key={index}>
                <Typography variant="h6">{each}</Typography>
              </li>
            ))}
          </ul>
        </Grid>

        <Grid item xs={12}>
          <Button
            text="Sign into my Prairie account"
            className={classes.signInButton}
            onClick={onSignIn}
          />
        </Grid>
      </Grid>
    </Card>
  );
};

export default BookingConfirmNextStepsCard;
