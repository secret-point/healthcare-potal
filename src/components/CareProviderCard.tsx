import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TCareMember } from "../types";
import { TextButton } from "./Button";
import { useFontStyles, useLayoutStyles } from "./useCommonStyles";
import ProfileAvatar from "./ProfileAvatar";
import { formatUserType } from "../utils/helper";

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

    roundImage: {
      borderRadius: 20,
    },

    textButton: {
      "& .MuiTypography-root": {
        textAlign: "left",
      },
    },
  })
);

interface CareTeamMemberCardProps {
  member: TCareMember;
}

const CareProviderCard = ({ member }: CareTeamMemberCardProps) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();
  const fontClasses = useFontStyles();

  return (
    <Card variant="outlined" className={classes.teamMemberCard}>
      <CardContent className={clsx(layoutClasses.noPadding, layoutClasses.mb1)}>
        {member.profilePic ? (
          <img
            width={40}
            height={40}
            alt="User Profile"
            src={member.profilePic}
            className={clsx(classes.roundImage, layoutClasses.mb2)}
          />
        ) : (
          <ProfileAvatar profile={member} className={layoutClasses.mb2} />
        )}
        <Typography variant="subtitle2" className={layoutClasses.mb05}>
          {formatUserType(member.userType)}
        </Typography>
        <Typography
          variant="h3"
          className={clsx(fontClasses.fontNormal, layoutClasses.mb1)}
        >
          {[member.firstName, member.lastName].join(" ")}
        </Typography>
      </CardContent>
      <CardActions className={layoutClasses.noPadding}>
        <TextButton
          text={member.primaryContact || member.secondaryContact}
          className={classes.textButton}
        />
      </CardActions>
    </Card>
  );
};

export default CareProviderCard;
