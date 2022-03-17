import _ from "lodash";
import { FC, useEffect, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "src/app/types";
import { useAllCareProviderList } from "src/api/providerApi";
import { formatUserType } from "src/utils/helper";
import Container from "src/components/Container";
import { useLayoutStyles } from "src/components/useCommonStyles";
import BookingSearchBar from "src/components/Booking/BookingSearchBar";
import SmallCareProviderCard from "src/components/CareProvider/SmallCareProviderCard";
import { BookingSearchForm, ICareMemberWithAvailability } from "src/types";

import { CARE_PROVIDER_TYPES } from "./constants";
import useCareMemberAvailableTimes from "./useCareMemberAvailableTimes";

const BookingListPage: FC = () => {
  const history = useHistory();
  const layoutClasses = useLayoutStyles();

  const { data: careProviders = [] } = useAllCareProviderList();

  const { recordsByEmail, fetchNewRecords } = useCareMemberAvailableTimes();

  const [searchForm, setSearchForm] = useState<BookingSearchForm>({
    insurance: null,
    language: null,
    type: [],
    state: null,
  });

  const { insurances, languages, states } = useMemo(
    () => ({
      insurances: _(careProviders)
        .flatMap("insurance")
        .map("type")
        .uniq()
        .value(),
      languages: _(careProviders).flatMap("language").uniq().value(),
      states: _(careProviders).flatMap("state").uniq().value(),
    }),
    [careProviders]
  );

  /* prettier-ignore */
  const filteredCareProviders = useMemo(() => {
    return careProviders
      .filter((careProvider) => {
        if (careProvider.hidden) {
          return false;
        }
        const userType = formatUserType(careProvider.userType);
        if (searchForm.type.length) {
          return searchForm.type.some((each) => each === userType);
        }
        return CARE_PROVIDER_TYPES.some((type) => type === userType);
      })
      .map((careProvider) => {
        const matchings = [];

        const availabilityRecord =
          recordsByEmail[careProvider.email] ||
          { isLoading: true, data: null };

        const isAvailabilityLoading = availabilityRecord.isLoading;
        const availableDate = availabilityRecord.data?.availableDates?.[0]?.date;
        const isNotAvailable =
          availabilityRecord.error ||
          (!availabilityRecord.isLoading && !availabilityRecord.data?.availableDates.length);

        if (
          searchForm.insurance &&
          careProvider.insurance.some((insurance) => insurance.type === searchForm.insurance)
        ) {
          matchings.push(`Accepts ${careProvider.insurance.map((insurance) => insurance.type.toLowerCase()).join(", ")}`);
        }

        if (
          searchForm.language &&
          careProvider.language.some((language) => language === searchForm.language)
        ) {
          matchings.push(`Speaks ${searchForm.language}`);
        }

        if (
          searchForm.state &&
          careProvider.state.some((state) => state === searchForm.state)
        ) {
          matchings.push(`Accepts patients in ${searchForm.state}`);
        }

        return {
          ...careProvider,
          availableDate,
          isNotAvailable,
          isAvailabilityLoading,
          matchings,
        };
      })
      .sort((provider1, provider2) => {
        if (provider1.isNotAvailable && !provider2.isNotAvailable) {
          return 1;
        }
        if (!provider1.isNotAvailable && provider2.isNotAvailable) {
          return -1;
        }
        if (!provider1.isNotAvailable && !provider2.isNotAvailable) {
          if (!provider1.isAvailabilityLoading && provider2.isAvailabilityLoading) {
            return -1;
          }
          if (provider1.isAvailabilityLoading && !provider2.isAvailabilityLoading) {
            return 1;
          }
        }
        return provider2.matchings.length - provider1.matchings.length;
      }) as ICareMemberWithAvailability[];
  }, [careProviders, searchForm, recordsByEmail]);

  useEffect(() => {
    filteredCareProviders.forEach((provider) => {
      fetchNewRecords(provider.email);
    });
  }, [fetchNewRecords, filteredCareProviders]);

  const handleClickViewProfile = (providerId: string) => {
    history.push(`${ROUTES.BOOKING}/${providerId}`);
  };

  return (
    <Container showIcon>
      <Grid item xs={12} className={layoutClasses.mb4}>
        <BookingSearchBar
          searchForm={searchForm}
          insurances={insurances}
          languages={languages}
          providerTypes={CARE_PROVIDER_TYPES}
          states={states}
          showCount={3}
          onChange={setSearchForm}
        />
      </Grid>

      <Grid item xs={12}>
        {filteredCareProviders.map((provider) => (
          <SmallCareProviderCard
            key={provider._id}
            className={layoutClasses.mb2}
            careProvider={provider}
            onClickProfile={handleClickViewProfile}
          />
        ))}
      </Grid>
    </Container>
  );
};

export default BookingListPage;
