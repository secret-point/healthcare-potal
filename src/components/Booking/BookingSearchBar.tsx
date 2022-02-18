import { FC } from "react";
import Box from "@material-ui/core/Box";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "src/theme/types/createPalette";
import { BookingSearchForm } from "src/types";

import BookingSearchOption from "./BookingSearchOption";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      background: "white",
      border: `1px solid ${theme.palette.distinctiveGray.main}`,
      borderRadius: theme.spacing(1),
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
  types: string[];
  states: string[];
  onChange: (form: BookingSearchForm) => void;
}

const BookingSearchBar: FC<BookingSearchBarProps> = ({
  insurances,
  languages,
  types,
  states,
  searchForm,
  onChange,
}) => {
  const classes = useStyles();

  const searchOptions: TSearchOption[] = [
    {
      label: "Type of provider",
      key: "type",
      options: types,
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
      {searchOptions.map((searchOption) => (
        <BookingSearchOption
          key={searchOption.key}
          value={searchForm[searchOption.key]}
          label={searchOption.label}
          options={searchOption.options}
          onChange={(value: Nullable<string>) => {
            onChange({ ...searchForm, [searchOption.key]: value });
          }}
        />
      ))}
    </Box>
  );
};

export default BookingSearchBar;
