import { FC } from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "src/theme/types/createPalette";
import { BookingSearchForm } from "src/types";
import { useViewport } from "src/hooks/useViewport";
import { ReactComponent as SearchIcon } from "src/icons/Search.svg";

import BookingSearchOption from "./BookingSearchOption";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: "white",
      border: `1px solid ${theme.palette.distinctiveGray.main}`,
      borderRadius: theme.spacing(1),
      padding: theme.spacing(3),
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    optionListWithSearch: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
    },

    optionList: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      flexWrap: "wrap",
      gap: theme.spacing(1),
    },

    iconWrapper: {
      marginRight: theme.spacing(3),
    },

    searchOption: {
      "&:not(:last-child)": {
        marginRight: theme.spacing(1),
      },
    },

    showCount: {
      justifySelf: "flex-end",
    },
  })
);

type TSearchOption = {
  label: string;
  key: keyof BookingSearchForm;
  options: string[];
};

interface BookingSearchBarProps {
  searchForm: BookingSearchForm;
  insurances: string[];
  languages: string[];
  providerTypes: string[];
  states: string[];
  showCount: number;
  onChange: (form: BookingSearchForm) => void;
}

const BookingSearchBar: FC<BookingSearchBarProps> = ({
  insurances,
  languages,
  providerTypes,
  states,
  searchForm,
  showCount,
  onChange,
}) => {
  const classes = useStyles();
  const { isMobile } = useViewport();

  const searchOptions: TSearchOption[] = [
    {
      label: "Type of provider",
      key: "type",
      options: providerTypes,
    },
    {
      label: "State",
      key: "state",
      options: states,
    },
    {
      label: "Insurance",
      key: "insurance",
      options: insurances,
    },
    {
      label: "Language",
      key: "language",
      options: languages,
    },
  ];

  return (
    <Box className={classes.container}>
      <Box className={classes.optionListWithSearch}>
        <SearchIcon className={classes.iconWrapper} />

        <Box className={classes.optionList}>
          {searchOptions.map((searchOption) => (
            <BookingSearchOption
              key={searchOption.key}
              className={classes.searchOption}
              value={searchForm[searchOption.key]}
              label={searchOption.label}
              options={searchOption.options}
              onChange={(value: Nullable<string>) => {
                onChange({ ...searchForm, [searchOption.key]: value });
              }}
            />
          ))}
        </Box>
      </Box>

      {Boolean(showCount) && !isMobile && (
        <Typography className={classes.showCount}>
          {`Showing ${showCount} providers`}
        </Typography>
      )}
    </Box>
  );
};

export default BookingSearchBar;
