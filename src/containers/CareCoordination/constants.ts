import { FieldType } from "src/types/general";
import { CARE_PROVIDER_TYPES, INFORMATION_TYPES } from "src/constants/identity";
import { usStates } from "src/constants/usStates";
import { phoneNumberPattern, validateEmail } from "src/utils/string";

export const CARE_PROVIDER = {
  label: "Who would you like us to coordinate your care with?",
  type: FieldType.MULTI_INSTANCE,
  path: "pharmacyInformation",
  properties: [
    {
      path: "type",
      label: "Select type of provider",
      placeholder: "Select type of provider",
      type: FieldType.SELECT,
      options: CARE_PROVIDER_TYPES,
      validator: {
        required: "Provider type is required.",
      },
      xs: 6,
    },
    {
      path: "name",
      label: "Name of the person",
      placeholder: "Name of the person",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      validator: {
        required: "Provider name is required.",
      },
      xs: 6,
    },
    {
      path: "address1",
      label: "Street address 1",
      placeholder: "Street address 1",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      validator: {
        required: "Street address 1 is required.",
      },
      xs: 6,
    },
    {
      path: "address2",
      label: "Street address 2 (optional)",
      placeholder: "Street address 2 (optional)",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
    {
      path: "city",
      label: "City",
      placeholder: "City",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      validator: {
        required: "City is required.",
      },
      xs: 6,
    },
    {
      path: "zip",
      label: "Zipcode",
      placeholder: "Zipcode",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      validator: {
        required: "Zipcode is required.",
      },
      xs: 6,
    },
    {
      path: "state",
      placeholder: "State",
      type: FieldType.SELECT,
      options: usStates,
      xs: 6,
    },
    {
      path: "phone",
      label: "Phone number",
      placeholder: "Phone number",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      validator: {
        required: "Phone number is required.",
        pattern: {
          value: phoneNumberPattern,
          message:
            "Please enter a 10 digit number without any special characters.",
        },
      },
      xs: 6,
    },
    {
      path: "fax",
      label: "Fax number (if available)",
      placeholder: "Fax number (if available)",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
    },
    {
      path: "email",
      label: "Email address (if available)",
      placeholder: "Email address (if available)",
      type: FieldType.TEXT,
      isTopLabel: true,
      shrink: true,
      xs: 6,
      validator: {
        validate: (value: string) =>
          !value || validateEmail(value)
            ? true
            : "Please enter email address in the correct format.",
      },
    },
    {
      path: "sharedInformationTypes",
      label: "Types of information shared",
      placeholder: "Types of information shared",
      type: FieldType.MULTI_SELECT,
      options: INFORMATION_TYPES,
      xs: 6,
    },
  ],
  addButton: "Add another provider",
  instanceLabel: "Provider",
  required: true,
};
