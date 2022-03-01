import { FormGroup } from "src/types/form";
import { FieldType } from "src/types/general";
import { phoneNumberPattern } from "src/utils/string";
import { birthdayValidator } from "src/utils/validator";

const commons = {
  isTopLabel: true,
  shrink: true,
  lg: 6,
  xs: 12,
};

export const PROFILE_FIELD_GROUPS: FormGroup[] = [
  {
    groupName: "Profile",
    fields: [
      {
        label: "First Name",
        path: "firstName",
        placeholder: "First Name",
        type: FieldType.TEXT,
        required: true,
        ...commons,
      },
      {
        label: "Last Name",
        path: "lastName",
        placeholder: "Last Name",
        type: FieldType.TEXT,
        required: true,
        ...commons,
      },
      {
        label: "Date of Birth",
        path: "dob",
        placeholder: "Date of Birth",
        type: FieldType.DATE,
        validator: birthdayValidator,
        required: true,
        ...commons,
      },
      {
        label: "Preferred Name",
        path: "preferredName",
        placeholder: "Preferred Name",
        type: FieldType.TEXT,
        ...commons,
      },
    ],
  },
  {
    groupName: "Contact",
    fields: [
      {
        label: "Email",
        path: "email",
        placeholder: "Email",
        type: FieldType.TEXT,
        required: true,
        ...commons,
      },
      {
        label: "Phone",
        path: "phone",
        placeholder: "Phone",
        type: FieldType.TEXT,
        required: true,
        validator: {
          required: "Phone number is required.",
          pattern: {
            value: phoneNumberPattern,
            message:
              "Please enter a 10 digit number without any special characters.",
          },
        },
        ...commons,
      },
    ],
  },
  {
    groupName: "Insurance",
    fields: [
      {
        label: "Insurance",
        path: "insurances",
        placeholder: "Insurance",
        type: FieldType.MULTI_SELECT,
        required: true,
        // To be placed with the api response
        options: [],
        ...commons,
      },
      {
        label: "Insurance Member ID",
        path: "insuranceMemberId",
        placeholder: "Member ID",
        type: FieldType.TEXT,
        required: true,
        /**
         * Deactivate the “member ID” section if insurance is chosen as “cash pay”
         * store insurance information +
         * referral auth number at “memo”
         * section of the pt’s profile
         */
        ...commons,
      },
      {
        label: "Do you have a referral reference/authorization number?",
        path: "referral",
        placeholder: "Referral reference number",
        type: FieldType.TEXT,
        ...commons,
      },
    ],
  },
];
