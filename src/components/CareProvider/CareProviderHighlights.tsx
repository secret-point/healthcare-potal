import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import dayjs from "dayjs";
import { FC } from "react";

import { Theme } from "src/theme/types/createPalette";
import { ICareMember } from "src/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      gap: theme.spacing(0.5),
    },
    chip: {
      color: theme.palette.primaryMint.main,
      fontWeight: "bold",
      borderRadius: theme.spacing(0.5),
    },
    availableChip: {
      backgroundColor: "#ECF5E4",
      color: theme.palette.secondaryGreen1.main,
      fontWeight: "bold",
      borderRadius: theme.spacing(0.5),
    },
  })
);

interface CareProviderHighlightsProps {
  careProvider: ICareMember;
}

const CareProviderHighlights: FC<CareProviderHighlightsProps> = ({
  careProvider,
}) => {
  const classes = useStyles();

  const ceritification = () => {
    if (careProvider.boardCertification >= 3) {
      return "Triple Board-Certified";
    }
    if (careProvider.boardCertification === 2) {
      return "Double Board-Certified";
    }
    if (careProvider.boardCertification === 1) {
      return "Board-Certified";
    }
    return null;
  };

  const experience = () => {
    if (careProvider.experience >= 30) {
      return "30+ Years of Experience";
    }
    if (careProvider.experience >= 20) {
      return "20+ Years of Experience";
    }
    if (careProvider.experience >= 10) {
      return "10+ Years of Experience";
    }
    return null;
  };

  return (
    <Box className={classes.container}>
      {careProvider.boardCertification ? (
        <Chip
          label={ceritification()}
          color="primary"
          className={classes.chip}
        />
      ) : null}

      {careProvider.experience > 10 ? (
        <Chip label={experience()} color="primary" className={classes.chip} />
      ) : null}

      {dayjs().diff(careProvider.nextAvailableAt, "day") <= 7 && (
        <Chip label="Available Soon" className={classes.availableChip} />
      )}
    </Box>
  );
};

export default CareProviderHighlights;
