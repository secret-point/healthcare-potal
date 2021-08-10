import { FC } from "react";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "../../theme/types/createPalette";
import { TCustomField, User } from "../../types";
import { shouldVerifyId } from "../../utils/string";
import CustomList from "../../components/CustomList";
import { EditButton } from "../../components/Button";
import { EditableField } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typoButton: {
      cursor: "pointer",
      color: theme.palette.secondaryGreen1.main,
    },

    editableFieldWrapper: {
      display: "flex",
      justifyContent: "center",
      flexDirection: "row",
      gap: theme.spacing(2),
    },

    listValue: {
      color: theme.palette.secondaryNavy2.main,
    },
  })
);

interface AccountInformationProps {
  user: User;
  onClickEdit: (fieldName: EditableField) => void;
  onShowVerifyIDDialog: () => void;
}

const AccountInformation: FC<AccountInformationProps> = ({
  user,
  onClickEdit,
  onShowVerifyIDDialog,
}) => {
  const classes = useStyles();

  const fields: TCustomField[] = [
    { label: "First Name", path: "firstName" },
    { label: "Last Name", path: "lastName" },
    {
      label: "Preferred Name",
      path: "preferredName",
      render: (value: string) => (
        <Box className={classes.editableFieldWrapper}>
          <Typography variant="subtitle1" className={classes.listValue}>
            {value}
          </Typography>
          <EditButton
            onClick={() => onClickEdit(EditableField.PREFERRED_NAME)}
          />
        </Box>
      ),
    },
    { label: "Date of Birth", path: "dob" },
    { label: "Preferred Pronoun", path: "pronouns" },
    { label: "Biological Sex", path: "gender" },
    { label: "Ethnicity", path: "race" },
    {
      label: "Password",
      path: "password",
      render: () => (
        <EditButton
          title="Reset Password"
          onClick={() => onClickEdit(EditableField.RESET_PASSWORD)}
        />
      ),
    },
    {
      label: "ID",
      path: "verificationStatus",
      render: (value: string) => (
        <Box className={classes.editableFieldWrapper}>
          <Typography variant="subtitle1" className={classes.listValue}>
            {value || "Unverified"}
          </Typography>
          {shouldVerifyId(value) && (
            <EditButton title="Verify ID" onClick={onShowVerifyIDDialog} />
          )}
        </Box>
      ),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Account</Typography>
      </Grid>

      <Grid item xs={12}>
        <CustomList fields={fields} value={user} />
      </Grid>
    </Grid>
  );
};

export default AccountInformation;
