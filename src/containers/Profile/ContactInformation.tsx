import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useAuth } from "src/hooks/useAuth";
import CustomList from "src/components/CustomList";
import { TextButton } from "src/components/Button";
import { AccountEditableField } from "src/types/form";

interface ContactInformationProps {
  onClickEdit: (fieldName: AccountEditableField) => void;
}

const ContactInformation: FC<ContactInformationProps> = ({ onClickEdit }) => {
  const { user } = useAuth();

  const fields = [
    {
      label: "Email",
      path: "email",
      render: () => (
        <span>
          {user?.email}
          <TextButton onClick={() => onClickEdit(AccountEditableField.EMAIL)} />
        </span>
      ),
    },
    {
      label: "Phone Number",
      path: "phone",
      render: () => (
        <span>
          {user?.phone}
          <TextButton
            onClick={() => onClickEdit(AccountEditableField.PHONE_NUMBER)}
          />
        </span>
      ),
    },
    {
      label: "Emergency Contact",
      path: "emergencyContact",
      render: () => (
        <span>
          {user?.emergencyContact?.name}
          <TextButton
            onClick={() => onClickEdit(AccountEditableField.EMERGENCY_CONTACT)}
          />
        </span>
      ),
    },
    {
      label: "Address",
      path: "address",
      render: () => (
        <span>
          {user?.billingAddress?.address1}
          <TextButton
            onClick={() => onClickEdit(AccountEditableField.ADDRESS)}
          />
        </span>
      ),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">Contact Information</Typography>
      </Grid>

      <Grid item xs={12}>
        <CustomList value={user} fields={fields} />
      </Grid>
    </Grid>
  );
};

export default ContactInformation;
