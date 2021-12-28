import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { IExtProvider } from "../types";
import { formatPhoneNumber } from "../utils/string";
import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "./useCommonStyles";
import ProfileAvatar from "./ProfileAvatar";

const useStyles = makeStyles((theme) =>
  createStyles({
    teamMemberCard: {
      width: "100%",
      height: "100%",
      padding: theme.spacing(3),
      borderRadius: theme.spacing(1.5),

      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },

    textButton: {
      "& .MuiTypography-root": {
        textAlign: "left",
      },
    },

    actions: {
      padding: theme.spacing(0),
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
    },

    bookingPageLink: {
      alignSelf: "flex-start",
      marginLeft: `0px !important`,
    },
  })
);

interface CareTeamMemberCardProps {
  provider: IExtProvider;
}

const CareProviderCard = ({ provider }: CareTeamMemberCardProps) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const [firstName = "", lastName = ""] = provider.name.split(/\s+/g);

  return (
    <Card variant="outlined" className={classes.teamMemberCard}>
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <ProfileAvatar
          firstName={firstName}
          lastName={lastName}
          picture={null}
          className={layoutClasses.mb2}
        />
        <Typography variant="subtitle2" className={layoutClasses.mb05}>
          {provider.type}
        </Typography>
        <Typography
          variant="h3"
          className={clsx(fontClasses.fontNormal, layoutClasses.mb1)}
        >
          {provider.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        <Typography
          align="left"
          variant="subtitle1"
          className={colorClasses.secondaryGreen1}
        >
          {formatPhoneNumber(provider.phone || "")}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default CareProviderCard;
