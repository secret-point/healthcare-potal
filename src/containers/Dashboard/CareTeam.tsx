import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TCareTeamMember } from "../../types";
import { EditButton } from "../../components/Button";
import { theme } from "../../theme/theme";

const teamMembers: TCareTeamMember[] = [
  {
    id: 1,
    name: "Amy Tran",
    job: "Care Coordinator",
    contact: "Text (650)-200-0179",
  },
  {
    id: 2,
    name: "Dave Ravi",
    job: "Psychiatrist",
    contact: "Book an appointment",
  },
  {
    id: 3,
    name: "Amanda Lee",
    job: "Primary Care Physician",
    contact: "(650)-200-0171",
  },
];

const useStyles = makeStyles(() =>
  createStyles({
    teamMemberCard: {
      height: "100%",
    },
    noPadding: {
      padding: 0,
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
      <CardContent className={clsx(classes.noPadding, classes.mb2)}>
        <Typography variant="body2">{member.job}</Typography>
        <Typography
          variant="h3"
          className={clsx(classes.normalFontWeight, classes.mb2)}
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

const CareTeam = () => (
  <>
    <Typography variant="h2">Your Care Team</Typography>
    <Typography variant="body2">
      Meet your personal team of providers. Your Care Coordinator is available
      to answer your questions Mon-Fri, 9AM to 5PM.
    </Typography>
    <ul>
      {teamMembers.map((teamMember) => (
        <li key={teamMember.id}>
          <CareTeamMemberCard member={teamMember} />
        </li>
      ))}
    </ul>
  </>
);

export default CareTeam;
