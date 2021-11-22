import dayjs from "dayjs";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useFetchProgressList } from "../../api/memberApi";
import { ROUTES } from "../../app/types";
import { ButtonLink } from "../../components/Link";
import {
  useFontStyles,
  useLayoutStyles,
} from "../../components/useCommonStyles";

import ProgressSummary from "./components/ProgressSummary";
import CheckInNotice from "./components/CheckInNotice";
import LatestPrairieScore from "./components/LatestPrairieScore";

const LatestProgress = () => {
  const fontClasses = useFontStyles();
  const layoutClasses = useLayoutStyles();
  const { data: progressList = [] } = useFetchProgressList();

  if (progressList.length < 1) return null;

  const latestItem = progressList[progressList.length - 1];
  const previousItem = progressList[progressList.length - 2] || latestItem;
  const requireCheckIn =
    dayjs().diff(latestItem.updatedAt, "hours") <= 24 ||
    (latestItem.total > 10 &&
      dayjs(latestItem.updatedAt).diff(previousItem.updatedAt, "day") > 5) ||
    (latestItem.total <= 10 &&
      dayjs(latestItem.updatedAt).diff(previousItem.updatedAt, "day") > 14);

  return (
    <Grid container>
      <Grid
        container
        item
        xs={12}
        justify="space-between"
        alignItems="center"
        className={layoutClasses.mb3}
      >
        <Typography variant="h2" className={fontClasses.font500}>
          Your Latest Progress
        </Typography>
        {!requireCheckIn && (
          <ButtonLink
            text="Take the assessment"
            to={ROUTES.ASSESSMENT}
            align="left"
          />
        )}
      </Grid>

      <Grid
        container
        spacing={2}
        alignItems="stretch"
        className={layoutClasses.mb3}
      >
        <Grid item xs={12} md={6}>
          <LatestPrairieScore
            previousItem={previousItem}
            latestItem={latestItem}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProgressSummary history={progressList} />
        </Grid>
      </Grid>

      {requireCheckIn && (
        <Grid item xs={12}>
          <CheckInNotice latestItem={progressList[progressList.length - 1]} />
        </Grid>
      )}
    </Grid>
  );
};

export default LatestProgress;
