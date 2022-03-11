import _ from "lodash";
import { FC, useState, useMemo } from "react";
import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";

import { ROUTES } from "src/app/types";
import { useAllCareProviderList } from "src/api/providerApi";
import { formatUserType } from "src/utils/helper";
import Container from "src/components/Container";
import { useLayoutStyles } from "src/components/useCommonStyles";
import BookingSearchBar from "src/components/Booking/BookingSearchBar";
import SmallCareProviderCard from "src/components/CareProvider/SmallCareProviderCard";
import { BookingSearchForm, ICareMemberWithMatchings } from "src/types";
import { CARE_PROVIDER_TYPES } from "./constants";

const BookingListPage: FC = () => {
  const history = useHistory();
  const layoutClasses = useLayoutStyles();

  const { data: careProviders = [] } = useAllCareProviderList();

  const [searchForm, setSearchForm] = useState<BookingSearchForm>({
    insurance: null,
    language: null,
    type: null,
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
      .filter((careProvider) => !careProvider.hidden && (
        searchForm.type ? formatUserType(careProvider.userType) === searchForm.type :
        CARE_PROVIDER_TYPES.some((type) => type === formatUserType(careProvider.userType))
      ))
      .map((careProvider) => {
        const matchings = [];

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

        return { ...careProvider, matchings };
      })
      .sort((provider1, provider2) => provider2.matchings.length - provider1.matchings.length)
      .slice(0, 3) as ICareMemberWithMatchings[];
  }, [careProviders, searchForm]);

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
