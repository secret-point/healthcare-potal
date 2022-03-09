import { usStates } from "src/constants/usStates";
import { IFormGroup } from "src/types/form";
import { FieldType } from "src/types/general";
import { phoneNumberPattern } from "src/utils/string";
import { birthdayValidator } from "src/utils/validator";

const commons = {
  isTopLabel: true,
  shrink: true,
  lg: 6,
  xs: 12,
};

export const PROFILE_FIELD_GROUPS: IFormGroup[] = [
  {
    groupName: "Profile",
    fields: [
      {
        label: "First Name",
        path: "firstName",
        placeholder: "First Name",
        required: true,
        ...commons,
      },
      {
        label: "Last Name",
        path: "lastName",
        placeholder: "Last Name",
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
        required: true,
        ...commons,
      },
      {
        label: "Phone",
        path: "phone",
        placeholder: "Phone",
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
        // required: true,
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
        ...commons,
      },
    ],
  },
  {
    groupName: "Payment",
    fields: [
      {
        label: "Credit, Debit, or HSA Card",
        path: "stripeToken",
        type: FieldType.STRIPE_CARD,
        required: true,
        lg: 12,
      },
      {
        label: "Address Line 1",
        path: "billingAddress.address1",
        required: true,
        ...commons,
      },
      {
        label: "Address Line 2",
        path: "billingAddress.address2",
        ...commons,
      },
      {
        label: "City",
        path: "billingAddress.city",
        required: true,
        ...commons,
      },
      {
        label: "State",
        path: "billingAddress.state",
        type: FieldType.SELECT,
        required: true,
        options: usStates,
        xs: 6,
        lg: 3,
      },
      {
        label: "Zip Code",
        path: "billingAddress.zip",
        placeholder: "Zip Code",
        required: true,
        ...commons,
        xs: 6,
        lg: 3,
      },
    ],
  },
  {
    groupName: "Account Setup",
    fields: [
      {
        label: "Password",
        path: "password",
        placeholder: "Password",
        required: true,
        ...commons,
      },
      {
        label: "Confirm Password",
        path: "confirmPassword",
        placeholder: "Confirm Password",
        required: true,
        ...commons,
      },
    ],
  },
];
