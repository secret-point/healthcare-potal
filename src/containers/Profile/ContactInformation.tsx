import { FC } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import useAuth from "../../hooks/useAuth";
import CustomList from "../../components/CustomList";
import { TextButton } from "../../components/Button";
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
        <TextButton onClick={() => onClickEdit(EditableField.EMAIL)} />
      ),
    },
    {
      label: "Phone Number",
      path: "phone",
      render: () => (
        <TextButton onClick={() => onClickEdit(EditableField.PHONE_NUMBER)} />
      ),
    },
    {
      label: "Emergency Contact",
      path: "emergencyContact",
      render: () => (
        <TextButton
          onClick={() => onClickEdit(EditableField.EMERGENCY_CONTACT)}
        />
      ),
    },
    {
      label: "Address",
      path: "address",
      render: () => (
        <TextButton onClick={() => onClickEdit(EditableField.ADDRESS)} />
      ),
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography>Contact Information</Typography>
      </Grid>

      <Grid item xs={12}>
        <CustomList value={user} fields={fields} />
      </Grid>
    </Grid>
  );
};

export default ContactInformation;
