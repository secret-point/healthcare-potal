import { FC, useState, useMemo } from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";

import { BookingSearchForm } from "src/types";
import Container from "src/components/Container";
import BookingSearchBar from "src/components/Booking/BookingSearchBar";
import { useAllCareProviderList } from "src/api/providerApi";
import { formatUserType } from "src/utils/helper";

interface BookingListProps {}

const BookingList: FC<BookingListProps> = () => {
  const { data: careProviders = [] } = useAllCareProviderList();

  const [searchForm, setSearchForm] = useState<BookingSearchForm>({
    insurance: null,
    language: null,
    type: null,
    state: null,
  });

  const { insurances, languages, types, states } = useMemo(
    () => ({
      insurances: _(careProviders)
        .flatMap("insurance")
        .map("type")
        .uniq()
        .value(),
      languages: _(careProviders).flatMap("language").uniq().value(),
      types: _(careProviders)
        .flatMap("userType")
        .map((type) => formatUserType(type))
        .uniq()
        .value(),
      states: _(careProviders).flatMap("state").uniq().value(),
    }),
    [careProviders]
  );

  return (
    <Container showIcon>
      <Grid item xs={12}>
        <BookingSearchBar
          searchForm={searchForm}
          insurances={insurances}
          languages={languages}
          types={types}
          states={states}
          showCount={3}
          onChange={setSearchForm}
        />
      </Grid>
    </Container>
  );
};

export default BookingList;
