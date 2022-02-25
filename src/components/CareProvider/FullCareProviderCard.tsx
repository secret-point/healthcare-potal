import { FC } from "react";
import Grid from "@material-ui/core/Grid";

import { useLayoutStyles } from "src/components/useCommonStyles";
import { ICareMember } from "src/types";

import ProviderHeaderCard from "./ProviderHeaderCard";
import ProviderDetailsCard from "./ProviderDetailsCard";

interface FullCareProviderCardProps {
  careProvider: ICareMember;
}

const FullCareProviderCard: FC<FullCareProviderCardProps> = ({
  careProvider,
}) => {
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={layoutClasses.mt6}>
        <ProviderHeaderCard careProvider={careProvider} />
      </Grid>
      <Grid item xs={12} className={layoutClasses.mt3}>
        <ProviderDetailsCard careProvider={careProvider} />
      </Grid>
    </Grid>
  );
};

export default FullCareProviderCard;
