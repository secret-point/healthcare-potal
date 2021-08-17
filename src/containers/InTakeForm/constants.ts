import { FieldType } from "../../types/general";
import {
  EMERGENCY_RELATIONSHIPS,
  ETHNICITIES,
  PRONOUNS,
  SEXES,
} from "../../constants/identity";

export enum InTakeFormSteps {
  START = "START",
  SELF_INFORMATION = "SELF_INFORMATION",
}

export const IN_TAKE_FORM_STEPS = {
  [InTakeFormSteps.SELF_INFORMATION]: {
    title: (data: any) =>
      `${data.firstName}, let’s get started! Tell us a little bit about yourself.`,
    groups: [
      {
        groupName: "Your Profile",
        fields: [
          {
            label: "Do you prefer using a different first name?",
            path: "preferredName",
            placeholder: "Preferred name",
            xs: 6,
          },
          {
            label: "What are your pronouns?",
            path: "pronouns",
            type: FieldType.SELECT,
            options: PRONOUNS,
            required: true,
            placeholder: "Select your pronouns",
            xs: 6,
          },
          {
            label: "What is your biological sex?",
            path: "sex",
            type: FieldType.SELECT,
            options: SEXES,
            required: true,
            placeholder: "Select your biological sex",
            xs: 6,
          },
          {
            label: "When's your birthday?",
            path: "birthday",
            type: FieldType.DATE,
            placeholder: "MM/DD/YYYY",
            required: true,
            xs: 6,
          },
          {
            label: "What's your height?",
            path: "height",
            placeholder: "X Feet Y Inches",
            required: true,
            xs: 6,
          },
          {
            label: "What's your weight?",
            path: "weight",
            placeholder: "Weight (in lbs)",
            required: true,
            xs: 6,
          },
          {
            label: "How would you describe your ethnicity?",
            path: "ethnicity",
            placeholder: "Select your ethnicity",
            type: FieldType.SELECT,
            options: ETHNICITIES,
            required: true,
            xs: 6,
          },
        ],
      },
      {
        groupName: "Emergency Contact",
        fields: [
          {
            label: "What is the name of your emergency contact?",
            path: "emergencyContact",
            placeholder: "Name of emergency contact",
            required: true,
            xs: 6,
          },
          {
            label: "What is the relationship with your emergency contact?",
            path: "emergencyRelationship",
            placeholder: "Select relationship",
            type: FieldType.SELECT,
            options: EMERGENCY_RELATIONSHIPS,
            required: true,
            xs: 6,
          },
          {
            label: "What is the phone number of your emergency contact?",
            path: "emergencyPhoneNumber",
            placeholder: "Phone number of emergency contact",
            required: true,
            xs: 6,
          },
          {
            label: "What is the email address of your emergency contact?",
            path: "emergencyEmailAddress",
            placeholder: "Email address of emergency contact",
            required: true,
            xs: 6,
          },
        ],
      },
    ],
  },
};
