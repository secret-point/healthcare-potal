import { useState } from "react";
import Grid from "@material-ui/core/Grid";

import useAuth from "../../hooks/useAuth";
import Container from "../../components/Container";
import UpdateDialog from "../../components/UpdateDialog";
import VerifyIDDialog from "../../components/VerifyID/VerifyIDDialog";
import { EditableField } from "./types";
import { UPDATE_PROFILE_DIALOGS } from "./constants";
import AccountInformation from "./AccountInformation";
import ContactInformation from "./ContactInformation";
import PhotoInformation from "./PhotoInformation";
import { useUpdateProfile } from "../../api";
import { UpdateProfileFormRequest } from "../../types";

export default function Profile() {
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();
  const [editingField, setEditingField] = useState<EditableField>();
  const [showVerifyIDDialog, setShowVerifyIDDialog] = useState(false);

  if (!user) return null;

  const handleClickEdit = (fieldName: EditableField) => {
    setEditingField(fieldName);
  };

  const handleCloseUpdateDialog = () => {
    setEditingField(undefined);
  };

  const handleShowVerifyIDDialog = () => {
    setShowVerifyIDDialog(true);
  };

  const handleCloseVerifyIDDialog = () => {
    setShowVerifyIDDialog(false);
  };

  const handleUpdateProfile = (form: unknown) => {
    updateProfile.mutate(form as UpdateProfileFormRequest);
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PhotoInformation user={user} />
        </Grid>

        <Grid item xs={12}>
          <AccountInformation
            user={user}
            onClickEdit={handleClickEdit}
            onShowVerifyIDDialog={handleShowVerifyIDDialog}
          />
        </Grid>

        <Grid item xs={12}>
          <ContactInformation onClickEdit={handleClickEdit} />
        </Grid>
      </Grid>

      {editingField && (
        <UpdateDialog
          open
          title={UPDATE_PROFILE_DIALOGS[editingField].title}
          rows={UPDATE_PROFILE_DIALOGS[editingField].rows}
          onClose={handleCloseUpdateDialog}
          onSave={handleUpdateProfile}
        />
      )}

      {showVerifyIDDialog && (
        <VerifyIDDialog open onClose={handleCloseVerifyIDDialog} />
      )}
    </Container>
  );
}
