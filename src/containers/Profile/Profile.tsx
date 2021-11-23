import { useState } from "react";
import { useSnackbar } from "notistack";
import Grid from "@material-ui/core/Grid";

import useAuth from "../../hooks/useAuth";
import Container from "../../components/Container";
import UpdateDialog from "../../components/UpdateDialog";
import VerifyIDDialog from "../../components/VerifyID/VerifyIDDialog";
import { EditableField } from "./types";
import { UPDATE_PROFILE_DIALOGS } from "./constants";
import AccountInformation from "./AccountInformation";
import ContactInformation from "./ContactInformation";
import UserProfilePhoto from "./UserProfilePhoto";
import { useUpdateProfile, useUploadFile } from "../../api";
import { UpdateProfileFormRequest } from "../../types";

export default function Profile() {
  const { user, loadUser } = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const uploadFile = useUploadFile();
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

  const handleUploadFile = async (file: File) => {
    const formData = new FormData();
    formData.append("upload", file);
    formData.append("fileTitle", file.name);
    formData.append("memberID", user._id);
    formData.append("documentType", "Avatar");

    await uploadFile.mutate(formData, {
      onSuccess: async ({ data }) => {
        await updateProfile.mutate(
          {
            profilePicture: data.documentURL,
          },
          { onSuccess: loadUser }
        );
      },
    });
  };

  const handleDeletePicture = () => {
    updateProfile.mutate(
      {
        profilePicture: null,
      },
      { onSuccess: loadUser }
    );
  };

  const handleUpdateProfile = async (title: string, form: unknown) => {
    try {
      await updateProfile.mutate(form as UpdateProfileFormRequest, {
        onSuccess: loadUser,
      });
      enqueueSnackbar(
        `You've successfully updated the ${title.toLowerCase()}.`,
        {
          variant: "success",
        }
      );
    } catch (error) {
      enqueueSnackbar(error.data?.errorMessage || error.message, {
        variant: "error",
      });
    } finally {
      handleCloseUpdateDialog();
    }
  };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <UserProfilePhoto
            user={user}
            onDeletePicture={handleDeletePicture}
            onUploadFile={handleUploadFile}
          />
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

      {editingField && user && (
        <UpdateDialog
          open
          defaultValues={{ ...user, password: "" }}
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
