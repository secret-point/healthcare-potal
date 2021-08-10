import { EditableField } from "./types";
import { usStates } from "../../constants/usStates";
import { FieldType } from "../../types/general";

export const UPDATE_PROFILE_DIALOGS = {
  [EditableField.PREFERRED_NAME]: {
    title: "Update your preferred name",
    rows: [
      {
        row: "Name",
        fields: [{ label: "Preferred Name", path: "preferredName", xs: 12 }],
      },
    ],
  },
  [EditableField.EMAIL]: {
    title: "Update your email",
    rows: [
      {
        row: "Email",
        fields: [{ label: "Email Address", path: "email", xs: 12 }],
      },
    ],
  },
  [EditableField.PHONE_NUMBER]: {
    title: "Update your phone number",
    rows: [
      {
        row: "Phone Number",
        fields: [{ label: "Phone Number", path: "phoneNumber", xs: 12 }],
      },
    ],
  },
  [EditableField.EMERGENCY_CONTACT]: {
    title: "Update your emergency contact",
    rows: [
      {
        row: "Name",
        fields: [
          {
            label: "Emergency Contact Name",
            path: "emergencyContact.name",
            xs: 12,
          },
        ],
      },
      {
        row: "Relationship",
        fields: [
          {
            label: "Emergency Contact Relationship",
            path: "emergencyContact.relationship",
            xs: 12,
          },
        ],
      },
      {
        row: "Phone Number",
        fields: [
          {
            label: "Emergency Contact Phone Number",
            path: "emergencyContact.phoneNumber",
            xs: 12,
          },
        ],
      },
    ],
  },
  [EditableField.ADDRESS]: {
    title: "Update your address",
    rows: [
      {
        row: "Line 1",
        fields: [{ label: "Address Line 1", path: "address.line1", xs: 12 }],
      },
      {
        row: "Line 2",
        fields: [{ label: "Address Line 2", path: "address.line2", xs: 12 }],
      },
      {
        row: "City",
        fields: [{ label: "City", path: "address.city", xs: 12 }],
      },
      {
        row: "State & Zip",
        fields: [
          {
            label: "State",
            path: "address.state",
            type: FieldType.SELECT,
            options: usStates,
            xs: 6,
          },
          { label: "Zip Code", path: "address.zipCode", xs: 6 },
        ],
      },
    ],
  },
  [EditableField.RESET_PASSWORD]: {
    title: "Reset your password",
    rows: [
      {
        row: "Password",
        fields: [{ label: "Password", path: "password", xs: 12 }],
      },
      {
        row: "Confirm Password",
        fields: [
          { label: "Confirm Password", path: "confirmPassword", xs: 12 },
        ],
      },
    ],
  },
};
