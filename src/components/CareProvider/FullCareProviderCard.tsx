import { FC } from "react";
import Grid from "@material-ui/core/Grid";

import { useLayoutStyles } from "src/components/useCommonStyles";
import { ICareMember } from "src/types";

import ProviderHeaderCard from "./ProviderHeaderCard";
import ProviderDetailsCard from "./ProviderDetailsCard";

interface FullCareProviderCardProps {
  careProvider: ICareMember;
  nextAvailableAt: Nullable<Date>;
  isLoadingAvailability: boolean;
  onClickBookAppointment: VoidFunction;
}

const FullCareProviderCard: FC<FullCareProviderCardProps> = ({
  careProvider,
  nextAvailableAt,
  isLoadingAvailability,
  onClickBookAppointment,
}) => {
  const layoutClasses = useLayoutStyles();

  return (
    <Grid container>
      <Grid item xs={12} className={layoutClasses.mt6}>
        <ProviderHeaderCard
          careProvider={careProvider}
          nextAvailableAt={nextAvailableAt}
          isLoadingAvailability={isLoadingAvailability}
          onClickBookAppointment={onClickBookAppointment}
        />
      </Grid>
      <Grid item xs={12} className={layoutClasses.mt3}>
        <ProviderDetailsCard careProvider={careProvider} />
      </Grid>
    </Grid>
  );
};

export default FullCareProviderCard;
