import { FC, useState, useMemo } from "react";
import _ from "lodash";
import Grid from "@material-ui/core/Grid";

import { BookingSearchForm, ICareMemberWithMatchings } from "src/types";
import { useAllCareProviderList } from "src/api/providerApi";
import { formatUserType } from "src/utils/helper";
import Container from "src/components/Container";
import { useLayoutStyles } from "src/components/useCommonStyles";
import BookingSearchBar from "src/components/Booking/BookingSearchBar";
import SmallCareProviderCard from "src/components/Booking/SmallCareProviderCard";

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

  /* prettier-ignore */
  const filteredCareProviders = useMemo(() => {
    return careProviders
      .map((careProvider) => {
        const matchings = [];
        if (
          searchForm.insurance &&
          careProvider.insurance.some((insurance) => insurance.type === searchForm.insurance)
        ) {
          matchings.push(`Accepts ${searchForm.insurance}`);
        }

        if (
          searchForm.language &&
          careProvider.language.some((language) => language === searchForm.language)
        ) {
          matchings.push(`Accepts ${searchForm.language}`);
        }

        if (
          searchForm.type &&
          formatUserType(careProvider.userType) === searchForm.type
        ) {
          matchings.push(`Accepts ${searchForm.type}`);
        }

        if (
          searchForm.state &&
          careProvider.state.some((state) => state === searchForm.state)
        ) {
          matchings.push(`Accepts patients in ${searchForm.state}`);
        }

        return { ...careProvider, matchings };
      })
      .sort((provider1, provider2) => provider2.matchings.length - provider1.matchings.length)
      .slice(0, 3) as ICareMemberWithMatchings[];
  }, [careProviders, searchForm]);

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

      <Grid item xs={12}>
        {filteredCareProviders.map((provider) => (
          <SmallCareProviderCard
            key={provider._id}
            className={layoutClasses.mb1}
            careProvider={provider}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default BookingList;
