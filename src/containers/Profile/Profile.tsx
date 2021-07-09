import Grid from "@material-ui/core/Grid";

import AccountInformation from "./AccountInformation";
import ContactInformation from "./ContactInformation";
import PhotoInformation from "./PhotoInformation";

export default function Profile() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <PhotoInformation />
      </Grid>

      <Grid item xs={12}>
        <AccountInformation />
      </Grid>

      <Grid item xs={12}>
        <ContactInformation />
      </Grid>
    </Grid>
  );
}
