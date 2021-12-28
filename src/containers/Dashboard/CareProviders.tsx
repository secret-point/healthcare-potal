import { useMemo, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { useFetchCareProviders } from "../../api";
import { useViewport } from "../../hooks/useViewport";
import useAuth from "../../hooks/useAuth";

import CareProviderCard from "../../components/CareProviderCard";
import ExtProviderCard from "../../components/ExtProviderCard";
import { TextButton } from "../../components/Button";
import { useLayoutStyles } from "../../components/useCommonStyles";
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

  const [showCareTeam, setShowCareTeam] = useState(false);

  const { user } = useAuth();
  const { isMobile } = useViewport();
  const layoutClasses = useLayoutStyles();
  const { data: careProviders = [] } = useFetchCareProviders();

  const extProviders = useMemo(
    () => [user?.extProvOne, user?.extProvTwo].filter((extProv) => extProv),
    [user]
  );

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
          {extProviders.map((extProvider) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              key={extProvider._id}
              className={classes.teamMemberItem}
            >
              <ExtProviderCard provider={extProvider} />
            </Grid>
          ))}
          {extProviders.length < 2 && (
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
          )}
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
