import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useLayoutStyles } from "src/components/useCommonStyles";
import Button from "src/components/Button";
import { ICareMember } from "src/types";
import { Theme } from "src/theme/types/createPalette";

import BookAppointmentCard from "./BookAppointmentCard";
import ProfileSetUpCard from "./ProfileSetUpCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bookAppointmentButton: {
      background: `${theme.palette.secondaryGreen1.main} !important`,
      borderRadius: theme.spacing(1),
      textTransform: "none",
      padding: theme.spacing(1.5, 2),

      "& .MuiTypography-root": {
        color: "white !important",
      },
    },
  })
);

interface CareProviderInTakeProps {
  careProvider: ICareMember;
}

const CareProviderInTake: FC<CareProviderInTakeProps> = ({ careProvider }) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={layoutClasses.mt6}>
        <BookAppointmentCard careProvider={careProvider} />
      </Grid>

      <Grid item xs={12} className={layoutClasses.mt4}>
        <ProfileSetUpCard />
      </Grid>

      <Grid item xs={12}>
        <Button
          text="Book an appointment"
          className={classes.bookAppointmentButton}
          fullWidth={false}
        />
      </Grid>
    </Grid>
  );
};

export default CareProviderInTake;
