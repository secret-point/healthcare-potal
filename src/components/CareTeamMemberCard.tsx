import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TCareTeamMember } from "../types";
import { EditButton } from "./Button";

const useStyles = makeStyles((theme) =>
  createStyles({
    teamMemberCard: {
      width: "100%",
      padding: theme.spacing(3),
    },
    noPadding: {
      padding: 0,
    },
    mb05: {
      marginBottom: theme.spacing(0.5),
    },
    mb1: {
      marginBottom: theme.spacing(1),
    },
    mb2: {
      marginBottom: theme.spacing(2),
    },
    normalFontWeight: {
      fontWeight: 400,
    },
  })
);

interface CareTeamMemberCardProps {
  member: TCareTeamMember;
}

const CareTeamMemberCard = ({ member }: CareTeamMemberCardProps) => {
  const classes = useStyles();

  return (
    <Card variant="outlined" className={classes.teamMemberCard}>
      <CardContent className={clsx(classes.noPadding, classes.mb1)}>
        <img
          width={40}
          height={40}
          alt="User Profile"
          src="https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg"
          className={classes.mb2}
        />
        <Typography variant="body2" className={classes.mb05}>
          {member.job}
        </Typography>
        <Typography
          variant="h3"
          className={clsx(classes.normalFontWeight, classes.mb1)}
        >
          {member.name}
        </Typography>
      </CardContent>
      <CardActions className={classes.noPadding}>
        <EditButton title={member.contact} />
      </CardActions>
    </Card>
  );
};

export default CareTeamMemberCard;
