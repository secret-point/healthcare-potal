import { useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useFetchCareProviders } from "../../api";
import CareProviderCard from "../../components/CareProviderCard";
import { TextButton } from "../../components/Button";
import { useLayoutStyles } from "../../components/useCommonStyles";
import { useViewport } from "../../hooks/useViewport";
import EmptyCareTeamMemberCard from "../../components/EmptyCareTeamMemberCard";

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
      alignSelf: "stretch",
    },
  })
);

const CareTeam = () => {
  const classes = useStyles();
  const { isMobile } = useViewport();
  const layoutClasses = useLayoutStyles();
  const [showCareTeam, setShowCareTeam] = useState(false);
  const { data: careProviders = [] } = useFetchCareProviders();

  const handleToggleShowCareTeam = () => {
    setShowCareTeam(!showCareTeam);
  };

  return (
    <>
      <Typography variant="h2" className={layoutClasses.mb1}>
        Your Care Team
      </Typography>

      <Typography variant="subtitle2" className={layoutClasses.mb3}>
        Meet your personal team of providers. Your Care Coordinator is available
        to answer your questions Mon-Fri, 9AM to 5PM.
      </Typography>

      {isMobile && !showCareTeam && (
        <TextButton
          text="▾ View your care team"
          onClick={handleToggleShowCareTeam}
        />
      )}

      {(!isMobile || showCareTeam) && (
        <Grid container spacing={3} className={classes.teamMemberList}>
          {careProviders.map((careProvider) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={careProvider._id}
              className={classes.teamMemberItem}
            >
              <CareProviderCard member={careProvider} />
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            sm={6}
            md={4}
            lg={3}
            className={classes.teamMemberItem}
          >
            <EmptyCareTeamMemberCard />
          </Grid>
        </Grid>
      )}

      {isMobile && showCareTeam && (
        <TextButton
          text="▴ Hide your care team"
          className={layoutClasses.mt1}
          onClick={handleToggleShowCareTeam}
        />
      )}
    </>
  );
};

export default CareTeam;
