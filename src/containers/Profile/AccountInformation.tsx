import { FC } from "react";
import dayjs from "dayjs";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles, createStyles } from "@material-ui/core/styles";

import { Theme } from "src/theme/types/createPalette";
import { TCustomField, User } from "src/types";
import CustomList from "src/components/CustomList";
import { TextButton } from "src/components/Button";
import { AccountEditableField } from "src/types/form";

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
  onClickEdit: (fieldName: AccountEditableField) => void;
  onShowVerifyIDDialog: () => void;
}

const AccountInformation: FC<AccountInformationProps> = ({
  user,
  onClickEdit,
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
          <TextButton
            onClick={() => onClickEdit(AccountEditableField.PREFERRED_NAME)}
          />
        </Box>
      ),
    },
    {
      label: "Date of Birth",
      path: "dob",
      render: (value) => dayjs(value).format("MM/DD/YYYY"),
    },
    { label: "Preferred Pronoun", path: "pronouns" },
    { label: "Biological Sex", path: "gender" },
    { label: "Ethnicity", path: "race" },
    {
      label: "Password",
      path: "password",
      render: () => (
        <TextButton
          text="Reset Password"
          onClick={() => onClickEdit(AccountEditableField.RESET_PASSWORD)}
        />
      ),
    },
    // Hide the verify id for now
    // {
    //   label: "ID",
    //   path: "IDStatus",
    //   render: (value: string) => (
    //     <Box className={classes.editableFieldWrapper}>
    //       <Typography variant="subtitle1" className={classes.listValue}>
    //         {value}
    //       </Typography>
    //       {false && shouldVerifyId(value as UserIDVerificationStatus) && (
    //         <TextButton text="Verify ID" onClick={onShowVerifyIDDialog} />
    //       )}
    //     </Box>
    //   ),
    // },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Account</Typography>
      </Grid>

      <Grid item xs={12}>
        <CustomList fields={fields} value={user} />
      </Grid>
    </Grid>
  );
};

export default AccountInformation;
