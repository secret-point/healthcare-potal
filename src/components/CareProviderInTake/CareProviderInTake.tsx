import { FC, useMemo } from "react";
import Grid from "@material-ui/core/Grid";

import { useAllPayerList } from "src/api/payerApi";
import { useLayoutStyles } from "src/components/useCommonStyles";
import { ICareMember, ICareMemberAvailableDate, TDropItem } from "src/types";

import BookAppointmentCard from "./BookAppointmentCard";
import ProfileSetUpCard from "./ProfileSetUpCard";

interface CareProviderInTakeProps {
  availableDates: ICareMemberAvailableDate[];
  careProvider: ICareMember;
  selectedTime: string;
  onSelect: (time: string) => void;
}

const CareProviderInTake: FC<CareProviderInTakeProps> = ({
  availableDates,
  careProvider,
  selectedTime,
  onSelect,
}) => {
  const layoutClasses = useLayoutStyles();

  const { data: payers = [] } = useAllPayerList();
  const payerOptions: TDropItem[] = useMemo(() => {
    return payers.map((payer) => ({
      code: payer._id,
      display: payer.type,
    }));
  }, [payers]);

  return (
    <Grid container>
      <Grid item xs={12} className={layoutClasses.mt6}>
        <BookAppointmentCard
          availableDates={availableDates}
          careProvider={careProvider}
          selectedTime={selectedTime}
          onSelect={onSelect}
        />
      </Grid>

      <Grid item xs={12} className={layoutClasses.mt4}>
        <ProfileSetUpCard payerOptions={payerOptions} />
      </Grid>
    </Grid>
  );
};

export default CareProviderInTake;
