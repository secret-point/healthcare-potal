import { emailPattern, phoneNumberPattern } from "src/utils/string";
import { usStates } from "src/constants/usStates";
import { FieldType } from "src/types/general";
import { EMERGENCY_RELATIONSHIPS } from "src/constants/identity";

import { EditableField } from "./types";

export const UPDATE_PROFILE_DIALOGS = {
  [EditableField.PREFERRED_NAME]: {
    title: "Preferred Name",
    rows: [
      {
        row: "Name",
        fields: [
          {
            label: "Preferred Name",
            path: "preferredName",
            isTopLabel: true,
            shrink: true,
            xs: 12,
          },
        ],
      },
    ],
  },
  [EditableField.EMAIL]: {
    title: "Email",
    rows: [
      {
        row: "Email",
        fields: [
          {
            label: "Email Address",
            path: "email",
            isTopLabel: true,
            shrink: true,
            xs: 12,
            validator: {
              required: "Your email address is required.",
              pattern: {
                value: emailPattern,
                message:
                  "Please enter your email address in the correct format.",
              },
            },
          },
        ],
      },
    ],
  },
  [EditableField.PHONE_NUMBER]: {
    title: "Phone Number",
    rows: [
      {
        row: "Phone Number",
        fields: [
          {
            label: "Phone Number",
            path: "phone",
            isTopLabel: true,
            shrink: true,
            xs: 12,
            validator: {
              required: "Your phone number is required.",
              pattern: {
                value: phoneNumberPattern,
                message:
                  "Please enter a 10 digit number without any special characters.",
              },
            },
          },
        ],
      },
    ],
  },
  [EditableField.EMERGENCY_CONTACT]: {
    title: "Emergency Contact",
    rows: [
      {
        row: "Name",
        fields: [
          {
            label: "Emergency Contact Name",
            path: "emergencyContact.name",
            isTopLabel: true,
            shrink: true,
            xs: 12,
            validator: {
              required: "Your contact name is required.",
            },
          },
        ],
      },
      {
        row: "Relationship",
        fields: [
          {
            label: "Emergency Contact Relationship",
            path: "emergencyContact.relationship",
            type: FieldType.SELECT,
            isTopLabel: true,
            shrink: true,
            options: EMERGENCY_RELATIONSHIPS,
            xs: 12,
          },
        ],
      },
      {
        row: "Phone Number",
        fields: [
          {
            label: "Emergency Contact Phone Number",
            path: "emergencyContact.phone",
            isTopLabel: true,
            shrink: true,
            xs: 12,
            validator: {
              required: "Your emergency contact phone number is required.",
              pattern: {
                value: phoneNumberPattern,
                message:
                  "Please enter a 10 digit number without any special characters.",
              },
            },
          },
        ],
      },
    ],
  },
  [EditableField.ADDRESS]: {
    title: "Address",
    rows: [
      {
        row: "Line 1",
        fields: [
          {
            label: "Address Line 1",
            path: "billingAddress.address1",
            isTopLabel: true,
            shrink: true,
            xs: 12,
          },
        ],
      },
      {
        row: "Line 2",
        fields: [
          {
            label: "Address Line 2",
            path: "billingAddress.address2",
            isTopLabel: true,
            shrink: true,
            xs: 12,
          },
        ],
      },
      {
        row: "City",
        fields: [
          {
            label: "City",
            path: "billingAddress.city",
            isTopLabel: true,
            shrink: true,
            xs: 12,
          },
        ],
      },
      {
        row: "State & Zip",
        fields: [
          {
            label: "State",
            path: "billingAddress.state",
            type: FieldType.SELECT,
            options: usStates,
            xs: 6,
          },
          {
            label: "Zip Code",
            path: "billingAddress.zip",
            isTopLabel: true,
            shrink: true,
            xs: 6,
          },
        ],
      },
    ],
  },
  [EditableField.RESET_PASSWORD]: {
    title: "Reset your password",
    rows: [
      {
        row: "Password",
        fields: [
          {
            label: "Enter New Password",
            path: "password",
            isTopLabel: true,
            shrink: true,
            type: FieldType.PASSWORD,
            validator: {
              required: "Your password is required.",
              minLength: {
                value: 8,
                message: "Your password should be 8 characters or longer.",
              },
            },
            xs: 12,
          },
        ],
      },
      {
        row: "Confirm Password",
        fields: [
          {
            label: "Confirm New Password",
            path: "confirmPassword",
            isTopLabel: true,
            shrink: true,
            type: FieldType.PASSWORD,
            validator: {
              required: "Your confirm password is required.",
            },
            xs: 12,
          },
        ],
      },
    ],
  },
};
