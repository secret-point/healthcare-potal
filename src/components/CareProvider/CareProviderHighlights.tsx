import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import dayjs from "dayjs";
import { FC } from "react";

import { useViewport } from "src/hooks/useViewport";
import { Theme } from "src/theme/types/createPalette";
import { ICareMemberWithAvailability } from "src/types";

interface StyleProps {
  isMobile: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      alignItems: "center",
      flexWrap: "wrap",
      gap: theme.spacing(1.5, 1),
    },
    chip: {
      color: theme.palette.primaryMint.main,
      fontWeight: "bold",
      borderRadius: theme.spacing(0.5),
      height: ({ isMobile }: StyleProps) => (isMobile ? 20 : 32),

      "& .MuiChip-label": {
        padding: ({ isMobile }: StyleProps) =>
          isMobile ? theme.spacing(0, 0.75) : theme.spacing(0, 1.5),
      },
    },
    availableChip: {
      backgroundColor: "#ECF5E4",
      color: theme.palette.secondaryGreen1.main,
    },
  })
);

interface CareProviderHighlightsProps {
  careProvider: ICareMemberWithAvailability;
}

const CareProviderHighlights: FC<CareProviderHighlightsProps> = ({
  careProvider,
}) => {
  const { isMobile } = useViewport();
  const classes = useStyles({ isMobile });

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

      {careProvider.availableDate &&
        dayjs(careProvider.availableDate).diff(new Date(), "day") <= 14 && (
          <Chip
            label="Available Soon"
            className={clsx(classes.chip, classes.availableChip)}
          />
        )}
    </Box>
  );
};

export default CareProviderHighlights;
