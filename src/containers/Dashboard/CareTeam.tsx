import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { TCareTeamMember } from "../../types";
import CareTeamMemberCard from "../../components/CareTeamMemberCard";

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

const useStyles = makeStyles((theme) =>
  createStyles({
    mb1: {
      marginBottom: theme.spacing(1),
    },
    mb3: {
      marginBottom: theme.spacing(3),
    },
    teamMemberList: {
      display: "flex",
      flexDirection: "row",
      alignItems: "flex-start",
      padding: 0,
    },
    teamMemberItem: {
      width: 274,
      padding: 0,
    },
  })
);

const CareTeam = () => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h2" className={classes.mb1}>
        Your Care Team
      </Typography>
      <Typography variant="body2" className={classes.mb3}>
        Meet your personal team of providers. Your Care Coordinator is available
        to answer your questions Mon-Fri, 9AM to 5PM.
      </Typography>
      <Grid container className={classes.teamMemberList}>
        {teamMembers.map((teamMember) => (
          <Grid
            item
            xs={3}
            key={teamMember.id}
            className={classes.teamMemberItem}
          >
            <CareTeamMemberCard member={teamMember} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default CareTeam;
