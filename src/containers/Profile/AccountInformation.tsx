import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const fields = [
  { label: "First Name", path: "firstName" },
  { label: "Last Name", path: "lastName" },
  { label: "Preferred Name", path: "preferredName" },
  { label: "Date of Birth", path: "dob" },
  { label: "Preferred Pronoun", path: "pronouns" },
  { label: "Biological Sex", path: "gender" },
  { label: "Ethnicity", path: "race" },
  { label: "Password", path: "password" },
  { label: "ID", path: "idVerification" },
];

export default function AccountInformation() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>Account</Typography>
      </Grid>

      <Grid item xs={12}>
        <List>
          {fields.map((field) => (
            <ListItem key={field.label}>{field.label}</ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
