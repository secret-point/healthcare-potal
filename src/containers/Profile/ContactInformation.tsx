import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import { useAuth } from "src/hooks/useAuth";
import CustomList from "src/components/CustomList";
import { TextButton } from "src/components/Button";

import { EditableField } from "./types";

interface ContactInformationProps {
  onClickEdit: (fieldName: EditableField) => void;
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
          <TextButton onClick={() => onClickEdit(EditableField.EMAIL)} />
        </span>
      ),
    },
    {
      label: "Phone Number",
      path: "phone",
      render: () => (
        <span>
          {user?.phone}
          <TextButton onClick={() => onClickEdit(EditableField.PHONE_NUMBER)} />
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
            onClick={() => onClickEdit(EditableField.EMERGENCY_CONTACT)}
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
          <TextButton onClick={() => onClickEdit(EditableField.ADDRESS)} />
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
