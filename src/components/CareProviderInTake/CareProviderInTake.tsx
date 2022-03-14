import { FC, useMemo } from "react";
import Grid from "@material-ui/core/Grid";

import { useAllPayerList } from "src/api/payerApi";
import { useLayoutStyles } from "src/components/useCommonStyles";
import {
  ICareMember,
  ICareMemberAvailableDate,
  TDropItem,
  IProfileSetUpCardForm,
} from "src/types";

import BookAppointmentCard from "./BookAppointmentCard";
import ProfileSetUpCard from "./ProfileSetUpCard";

interface CareProviderInTakeProps {
  availableDates: ICareMemberAvailableDate[];
  careProvider: ICareMember;
  selectedTime: string;
  onSelect: (time: string) => void;
  onSubmit: (form: IProfileSetUpCardForm) => void;
}

const CareProviderInTake: FC<CareProviderInTakeProps> = ({
  availableDates,
  careProvider,
  selectedTime,
  onSelect,
  onSubmit,
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
        <ProfileSetUpCard
          selectedTime={selectedTime}
          payerOptions={payerOptions}
          onSubmit={onSubmit}
        />
      </Grid>
    </Grid>
  );
};

export default CareProviderInTake;
