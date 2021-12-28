import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { ICareMember } from "../types";
import {
  useColorStyles,
  useFontStyles,
  useLayoutStyles,
} from "./useCommonStyles";
import ProfileAvatar from "./ProfileAvatar";
import { formatUserType } from "../utils/helper";
import { ButtonLink } from "./Link";

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

      "& > *": {
        marginLeft: "0 !important",
      },
    },

    bookingPageLink: {
      alignSelf: "flex-start",
      marginLeft: `0px !important`,

      "& .MuiTypography-root": {
        fontWeight: "normal",
      },
    },
  })
);

interface CareTeamMemberCardProps {
  member: ICareMember;
}

const CareProviderCard = ({ member }: CareTeamMemberCardProps) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const fontClasses = useFontStyles();
  const colorClasses = useColorStyles();
  const userType = formatUserType(member.userType);

  return (
    <Card variant="outlined" className={classes.teamMemberCard}>
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        <ProfileAvatar
          firstName={member.firstName}
          lastName={member.lastName}
          picture={member.profilePic}
          className={layoutClasses.mb2}
        />
        <Typography variant="subtitle2" className={layoutClasses.mb05}>
          {userType}
        </Typography>
        <Typography
          variant="h3"
          className={clsx(fontClasses.fontNormal, layoutClasses.mb1)}
        >
          {[member.firstName, member.lastName].join(" ")}
        </Typography>
      </CardContent>
      <CardActions className={classes.actions}>
        {userType !== "Psychiatrist" ? (
          <Typography
            align="left"
            variant="subtitle1"
            className={colorClasses.secondaryGreen1}
          >
            {member.primaryContact || member.secondaryContact}
          </Typography>
        ) : member.bookingPageLink ? (
          <ButtonLink
            className={classes.bookingPageLink}
            text="Book an appointment"
            target="_blank"
            to={{ pathname: member.bookingPageLink }}
            rel="noopener noreferrer"
          />
        ) : (
          <Typography
            align="left"
            variant="subtitle1"
            className={colorClasses.disabled}
          >
            Book an appointment
          </Typography>
        )}
      </CardActions>
    </Card>
  );
};

export default CareProviderCard;
