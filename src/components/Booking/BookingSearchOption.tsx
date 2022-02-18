import clsx from "clsx";
import { FC, MouseEventHandler, useState } from "react";
import Chip from "@material-ui/core/Chip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Popover from "@material-ui/core/Popover";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "src/theme/types/createPalette";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControlLabel: {
      width: "100%",
      margin: theme.spacing(0),
      padding: theme.spacing(3, 2),
      borderRadius: theme.spacing(1),
      border: `1px solid rgba(0, 0, 0, 0.23)`,
      "& > span": {
        padding: theme.spacing(0, 2, 0, 0),
        fontSize: 18,
        "&:last-child": {
          color: theme.palette.primaryNavy.main,
        },
      },
    },
    selectedFormControlLabel: {
      "& .MuiFormControlLabel-label": {
        color: theme.palette.secondaryGreen1.main,
      },
      border: `1px solid ${theme.palette.secondaryGreen1.main}`,
      "& span:last-child": {
        color: theme.palette.secondaryGreen1.main,
      },
    },
  })
);

interface BookingSearchOptionProps {
  label: string;
  value: Nullable<string>;
  options: string[];
  onChange: (value: Nullable<string>) => void;
}

const BookingSearchOption: FC<BookingSearchOptionProps> = ({
  label,
  value,
  options,
  onChange,
}) => {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const isMenuOpen = Boolean(anchorEl);
  const id = isMenuOpen ? label : undefined;

  return (
    <>
      <Chip
        label={value || label}
        color={value ? "primary" : "default"}
        onClick={handleClick}
      />

      <Popover
        id={id}
        open={isMenuOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {options.map((option) => (
          <FormControlLabel
            value={option}
            control={
              <Radio color="secondary" onClick={() => onChange(option)} />
            }
            label={option}
            className={clsx(
              classes.formControlLabel,
              option === value && classes.selectedFormControlLabel
            )}
          />
        ))}
      </Popover>
    </>
  );
};

export default BookingSearchOption;
