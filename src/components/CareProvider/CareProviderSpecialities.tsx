import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import { makeStyles, createStyles } from "@material-ui/core/styles";
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
      color: theme.palette.secondaryNavy1.main,
      background: theme.palette.backgroundGray.main,
      fontWeight: "bold",
      borderRadius: theme.spacing(0.5),
    },
  })
);

interface CareProviderSpecialitiesProps {
  careProvider: ICareMember;
}

const CareProviderSpecialities: FC<CareProviderSpecialitiesProps> = ({
  careProvider,
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {careProvider.specialty
        .filter((speciality) => speciality)
        .slice(0, 10)
        .map((speciality) => (
          <Chip key={speciality} label={speciality} className={classes.chip} />
        ))}
    </Box>
  );
};

export default CareProviderSpecialities;
