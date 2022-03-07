import { FC } from "react";
import Card from "@material-ui/core/Card";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useLayoutStyles } from "src/components/useCommonStyles";
import { ICareMember } from "src/types";
import { Theme } from "src/theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    divider: {
      margin: theme.spacing(3, 0),
      width: "100%",
    },

    chip: {
      color: theme.palette.secondaryNavy1.main,
      fontWeight: "bold",
      borderRadius: theme.spacing(0.5),
      marginRight: theme.spacing(1),
    },

    insuranceList: {
      paddingLeft: theme.spacing(2),
      margin: 0,

      "& li": {
        width: "50%",
        float: "left",
      },
    },

    priceList: {
      paddingLeft: theme.spacing(2),
      margin: 0,
    },

    subtitle: {
      fontWeight: "bold",
      marginBottom: theme.spacing(2),
    },
  })
);

interface ProviderDetailsCardProps {
  careProvider: ICareMember;
}

const ProviderDetailsCard: FC<ProviderDetailsCardProps> = ({
  careProvider,
}) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Card className={layoutClasses.padding4}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.subtitle} variant="subtitle1">
            In-Network Insurances
          </Typography>

          <ul className={classes.insuranceList}>
            {careProvider.insurance.map((insurance) => (
              <li key={insurance.type}>
                <Typography variant="subtitle2">{insurance.type}</Typography>
              </li>
            ))}
          </ul>
        </Grid>

        <Divider className={classes.divider} />

        <Grid item xs={12}>
          <Typography className={classes.subtitle} variant="subtitle1">
            Specialities
          </Typography>

          {careProvider.specialty
            .filter((each) => each)
            .map((speciality) => (
              <Chip
                key={speciality}
                label={speciality}
                className={classes.chip}
              />
            ))}
        </Grid>

        <Divider className={classes.divider} />

        <Grid item xs={12}>
          <Typography className={classes.subtitle} variant="subtitle1">
            Languages
          </Typography>

          {careProvider.language
            .filter((each) => each)
            .map((language) => (
              <Chip key={language} label={language} className={classes.chip} />
            ))}
        </Grid>

        <Divider className={classes.divider} />

        <Grid item xs={12}>
          <Typography className={classes.subtitle} variant="subtitle1">
            License
          </Typography>

          {careProvider.state
            .filter((each) => each)
            .map((state) => (
              <Chip key={state} label={state} className={classes.chip} />
            ))}
        </Grid>

        <Divider className={classes.divider} />

        <Grid item xs={12}>
          <Typography className={classes.subtitle} variant="subtitle1">
            Price
          </Typography>

          <ul className={classes.priceList}>
            <li>
              <Typography variant="subtitle2">
                In-network patients will usuallly pay a small amount of copay,
                depending on the plan.
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle2">
                Cash/out-of-network price for intake appointment: $295
              </Typography>
            </li>
            <li>
              <Typography variant="subtitle2">
                Cash/out-of-network price for follow-up appointment: $160
              </Typography>
            </li>
          </ul>
        </Grid>
      </Grid>
    </Card>
  );
};

export default ProviderDetailsCard;
