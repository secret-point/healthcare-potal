import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const fields = [
  { label: "Email", path: "email" },
  { label: "Phone Number", path: "phoneNumber" },
  { label: "Emergency Contact", path: "contact" },
  { label: "Address", path: "address" },
];

export default function ContactInformation() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>Contact Information</Typography>
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
