import clsx from "clsx";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Theme } from "../../theme/types/createPalette";
import { useLayoutStyles } from "../useCommonStyles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    recommended: {
      fontSize: 12,
      lineHeight: 1.3,
      fontWeight: 700,
      color: theme.palette.secondaryGreen1.main,
    },
    weight700: {
      fontWeight: 700,
    },
    selectBox: {
      padding: theme.spacing(2),
      borderRadius: theme.spacing(2),
      border: `1px solid ${theme.palette.secondaryNavy2.main}`,
      cursor: "pointer",
    },
  })
);

interface InitialStepProps {
  onSkipVerification: VoidFunction;
  onUploadID: VoidFunction;
}

const InitialStep = ({ onSkipVerification, onUploadID }: InitialStepProps) => {
  const classes = useStyles();
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={layoutClasses.mb3}>
        <Typography variant="body1">
          Before we provide clinical service, we need to verify your
          identification. You may choose one of the following options:
        </Typography>
      </Grid>

      <Grid
        item
        xs={12}
        role="button"
        tabIndex={0}
        className={clsx(classes.selectBox, layoutClasses.mb2)}
        onClick={onUploadID}
      >
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography className={classes.recommended}>RECOMMENDED</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.weight700}>
              Upload a picture of your photo ID
            </Typography>
            <Typography variant="body2">
              Once we verify your ID, you won&apos;t have to bring your ID card
              to your online visit.
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        xs={12}
        role="button"
        tabIndex={0}
        className={classes.selectBox}
        onClick={onSkipVerification}
      >
        <Typography variant="h5" className={classes.weight700}>
          Manual Verification
        </Typography>
        <Typography variant="body2">
          Skip the verification now &&nbsp;
          <b>present your ID at the start of every visit.</b>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default InitialStep;
