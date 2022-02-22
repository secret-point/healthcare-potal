import { FC, useState, useMemo } from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";

import { BookingSearchForm } from "src/types";
import { useAllCareProviderList } from "src/api/providerApi";
import { formatUserType } from "src/utils/helper";
import Container from "src/components/Container";
import { useLayoutStyles } from "src/components/useCommonStyles";
import BookingSearchBar from "src/components/Booking/BookingSearchBar";
import CareProviderCard from "src/components/Booking/CareProviderCard";

interface BookingListProps {}

const BookingList: FC<BookingListProps> = () => {
  const { data: careProviders = [] } = useAllCareProviderList();

  const layoutClasses = useLayoutStyles();

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

  const filteredCareProviders = useMemo(
    () =>
      careProviders
        .map((careProvider) => {
          let priority = 0;
          // prettier-ignore
          if (
            searchForm.insurance &&
            careProvider.insurance.some((insurance) => insurance.type === searchForm.insurance)
          ) {
            priority++;
          }
          // prettier-ignore
          if (
            searchForm.language &&
            careProvider.language.some((language) => language === searchForm.language)
          ) {
            priority++;
          }
          // prettier-ignore
          if (searchForm.type && formatUserType(careProvider.userType) === searchForm.type) {
            priority++;
          }
          // prettier-ignore
          if (searchForm.state && careProvider.state === searchForm.state) {
            priority++;
          }
          return { ...careProvider, priority };
        })
        .sort((provider1, provider2) => provider2.priority - provider1.priority)
        .slice(0, 3),
    [careProviders, searchForm]
  );

  return (
    <Container showIcon>
      <Grid item xs={12} className={layoutClasses.mb4}>
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

      <Grid container spacing={2}>
        {filteredCareProviders.map((provider) => (
          <CareProviderCard key={provider._id} careProvider={provider} />
        ))}
      </Grid>
    </Container>
  );
};

export default BookingList;
