import clsx from "clsx";
import { ChangeEvent, FC, MouseEventHandler, useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Divider from "@material-ui/core/Divider";
import Popover from "@material-ui/core/Popover";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "src/theme/types/createPalette";
import Button from "src/components/Button";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    chip: {
      border: `1px solid ${theme.palette.secondaryNavy2.main}`,
      borderRadius: 12,
      backgroundColor: "white !important",
      fontSize: 12,
      padding: theme.spacing(0, 1),
      height: theme.spacing(3),
    },
    selectedChip: {
      borderColor: theme.palette.secondary.main,
      borderRadius: 12,
      color: theme.palette.secondary.main,
    },
    formControlLabel: {
      width: "100%",
      margin: theme.spacing(0.5),
      "& > span": {
        padding: theme.spacing(0),
        fontSize: 12,
        "&:last-child": {
          marginLeft: theme.spacing(1),
          color: theme.palette.primaryNavy.main,
        },
      },
    },
    selectedFormControlLabel: {
      "& .MuiFormControlLabel-label": {
        color: theme.palette.secondaryGreen1.main,
      },
      "& span:last-child": {
        color: theme.palette.secondaryGreen1.main,
      },
    },
    popoverPaper: {
      padding: theme.spacing(2, 1, 1, 2),
      width: 200,
    },
    popoverLabel: {
      marginBottom: theme.spacing(1),
    },
    divider: {
      margin: theme.spacing(1, -3, 1.5, -3),
    },
    actionBox: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    clearButton: {
      padding: theme.spacing(0),
      marginLeft: theme.spacing(-1),
    },
    saveButton: {
      padding: theme.spacing(1),
    },
    buttonText: {
      fontSize: 12,
      textTransform: "none",
    },
    clearButtonText: {
      color: theme.palette.secondaryNavy1.main,
    },
    saveButtonText: {
      color: "white",
    },
  })
);

interface BookingSearchOptionProps {
  className?: string;
  label: string;
  type: "radio" | "check";
  value: Nullable<string | string[]>;
  options: string[];
  onChange: (value: Nullable<string | string[]>) => void;
}

const BookingSearchOption: FC<BookingSearchOptionProps> = ({
  className,
  label,
  type,
  value,
  options,
  onChange,
}) => {
  const classes = useStyles();
  const [current, setCurrent] = useState(value);
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  const handleClick: MouseEventHandler<HTMLDivElement> = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleChange = (value: Nullable<string | string[]>) => {
    onChange(value);
    handleClose();
  };

  const handleCheckboxChange = (
    event: ChangeEvent<HTMLInputElement>,
    option: string
  ) => {
    if (typeof current === "string" || !current) return;

    if (event.target.checked) {
      setCurrent([...current, option]);
    } else {
      setCurrent(current.filter((each) => each !== option));
    }
  };

  const isMenuOpen = Boolean(anchorEl);
  const id = isMenuOpen ? label : undefined;

  return (
    <div className={className}>
      <Chip
        label={Array.isArray(value) ? label : value || label}
        className={clsx(classes.chip, value && classes.selectedChip)}
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
        classes={{ paper: classes.popoverPaper }}
      >
        <Typography className={classes.popoverLabel}>{label}</Typography>

        {type === "radio" &&
          options.map((option) => (
            <FormControlLabel
              value={option}
              control={
                <Radio
                  color="secondary"
                  checked={option === current}
                  onClick={() => setCurrent(option)}
                />
              }
              label={option}
              className={clsx(
                classes.formControlLabel,
                option === value && classes.selectedFormControlLabel
              )}
            />
          ))}

        {type === "check" &&
          options.map((option) => (
            <FormControlLabel
              value={option}
              control={
                <Checkbox
                  color="secondary"
                  checked={(current as string[])?.some(
                    (each) => each === option
                  )}
                  onChange={(event) => handleCheckboxChange(event, option)}
                />
              }
              label={option}
              className={clsx(
                classes.formControlLabel,
                option === value && classes.selectedFormControlLabel
              )}
            />
          ))}

        <Divider className={classes.divider} />

        <Box className={classes.actionBox}>
          <Button
            text="Clear"
            noPadding
            className={classes.clearButton}
            textClassName={clsx(classes.buttonText, classes.clearButtonText)}
            fullWidth={false}
            variant="text"
            onClick={() => handleChange(Array.isArray(value) ? [] : null)}
          />
          <Button
            text="Save"
            className={classes.saveButton}
            textClassName={clsx(classes.buttonText, classes.saveButtonText)}
            fullWidth={false}
            variant="contained"
            color="secondary"
            onClick={() => handleChange(current)}
          />
        </Box>
      </Popover>
    </div>
  );
};

export default BookingSearchOption;
