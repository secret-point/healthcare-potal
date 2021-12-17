import { FieldType } from "../../types/general";
import {
  EMERGENCY_RELATIONSHIPS,
  ETHNICITIES,
  PRONOUNS,
  BIOLOGICAL_SEXES,
  EDUCATIONAL_DEGREES,
  MARITAL_STATUS,
  EMPLOYMENT_STATUS,
  LIVING_ARRANGEMENT_TYPES,
  PEOPLE_LIVING_WITH,
  SUBTANCE_TYPES,
  CONFIRMATION_TYPES,
  SYMPTOM_TYPES,
  TREATMENT_TYPES,
  FAMILY_MEMBERS,
} from "../../constants/identity";
import { TInTakeFormDef } from "./types";
import {
  validateEmail,
  feetInchPattern,
  phoneNumberPattern,
} from "../../utils/string";

export enum InTakeFormSteps {
  START = "START",
  SELF_INFORMATION = "SELF_INFORMATION",
  ADDITIONAL_INFORMATION = "ADDITIONAL_INFORMATION",
  FEELING_INFORMATION = "FEELING_INFORMATION",
  MEDICAL_HISTORY = "MEDICAL_HISTORY",
  COMPLETE = "COMPLETE",
}

export const IN_TAKE_FORM_STEPS: TInTakeFormDef = {
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
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 6,
            xs: 12,
          },
          {
            label: "What are your pronouns?",
            path: "pronouns",
            type: FieldType.SELECT,
            options: PRONOUNS,
            required: true,
            placeholder: "Select your pronouns",
            lg: 6,
            xs: 12,
          },
          {
            label: "What is your biological sex?",
            path: "gender",
            type: FieldType.SELECT,
            options: BIOLOGICAL_SEXES,
            required: true,
            placeholder: "Select your biological sex",
            lg: 6,
            xs: 12,
          },
          {
            label: "When's your birthday?",
            path: "dob",
            type: FieldType.DATE,
            placeholder: "MM/DD/YYYY",
            required: true,
            isTopLabel: true,
            validator: {
              required: "Birthday is required.",
              validate: {
                valid: (value: any) => {
                  const [year, month, day] = value
                    .split("-")
                    .map((each: string) => Number(each));
                  const isValid =
                    year >= 1900 &&
                    year <= new Date().getFullYear() &&
                    month >= 1 &&
                    month <= 12 &&
                    day >= 1 &&
                    day <= 10;
                  return isValid ? true : "Birthday is invalid.";
                },
              },
            },
            lg: 6,
            xs: 12,
          },
          {
            label: "What's your height?",
            path: "height",
            type: FieldType.SINGLE_INSTANCE,
            required: true,
            properties: [
              {
                path: "feet",
                placeholder: "Feet",
                lg: 6,
                xs: 6,
                validator: {
                  pattern: {
                    value: feetInchPattern,
                    message: "Please input the digits only for feet.",
                  },
                },
              },
              {
                path: "inches",
                placeholder: "Inches",
                lg: 6,
                xs: 6,
                validator: {
                  pattern: {
                    value: feetInchPattern,
                    message: "Please input the digits only for inches.",
                  },
                },
              },
            ],
            lg: 6,
            xs: 12,
          },
          {
            label: "What's your weight?",
            path: "weight",
            placeholder: "Weight (in lbs)",
            type: FieldType.NUMBER,
            isTopLabel: true,
            shrink: true,
            required: true,
            lg: 6,
            xs: 12,
          },
          {
            label: "How would you describe your ethnicity?",
            path: "race",
            placeholder: "Select your ethnicity",
            type: FieldType.SELECT,
            options: ETHNICITIES,
            required: true,
            lg: 6,
            xs: 12,
          },
        ],
      },
      {
        groupName: "Emergency Contact",
        fields: [
          {
            label: "What is the name of your emergency contact?",
            path: "emergencyContact.name",
            placeholder: "Name of emergency contact",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            required: true,
            lg: 6,
            xs: 12,
          },
          {
            label: "What is the relationship with your emergency contact?",
            path: "emergencyContact.relationship",
            placeholder: "Select relationship",
            type: FieldType.SELECT,
            options: EMERGENCY_RELATIONSHIPS,
            required: true,
            lg: 6,
            xs: 12,
          },
          {
            label: "What is the phone number of your emergency contact?",
            path: "emergencyContact.phone",
            placeholder: "Phone number of emergency contact",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            required: true,
            validator: {
              required: "Emergency contact phone number is required.",
              pattern: {
                value: phoneNumberPattern,
                message:
                  "Please enter a 10 digit number without any special characters.",
              },
            },
            lg: 6,
            xs: 12,
          },
          {
            label: "What is the email address of your emergency contact?",
            path: "emergencyContact.email",
            placeholder: "Email address of emergency contact",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            validator: {
              validate: (value: string) =>
                !value || validateEmail(value)
                  ? true
                  : "Please enter email address in the correct format.",
            },
            lg: 6,
            xs: 12,
          },
        ],
      },
    ],
  },
  [InTakeFormSteps.ADDITIONAL_INFORMATION]: {
    title:
      "Next, provide your doctor more information about yourself and your lifestyle!",
    groups: [
      {
        groupName: "Additional information",
        fields: [
          {
            label: "Where were you born?",
            path: "born",
            placeholder: "City/state you were born",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 6,
            xs: 12,
          },
          {
            label: "What is your highest educational degree?",
            path: "highestDegree",
            placeholder: "Select your highest degree",
            type: FieldType.SELECT,
            options: EDUCATIONAL_DEGREES,
            lg: 6,
            xs: 12,
          },
          {
            label: "What is your marital status?",
            path: "maritalStatus",
            placeholder: "Select your marital status",
            type: FieldType.SELECT,
            options: MARITAL_STATUS,
            lg: 6,
            xs: 12,
          },
          {
            label: "What is your employment status?",
            path: "employment",
            placeholder: "Select your emloyment status",
            type: FieldType.SELECT,
            options: EMPLOYMENT_STATUS,
            lg: 6,
            xs: 12,
          },
          {
            label: "What is your current living arrangement?",
            path: "livingArr",
            placeholder: "Select your living arrangement",
            type: FieldType.SELECT,
            options: LIVING_ARRANGEMENT_TYPES,
            lg: 6,
            xs: 12,
          },
          {
            label: "Who are you currently living with? Check all that apply",
            path: "livingWith",
            placeholder: "Select all who you are living with",
            type: FieldType.MULTI_SELECT,
            options: PEOPLE_LIVING_WITH,
            lg: 6,
            xs: 12,
          },
          {
            label: "How would you characterize your cultural background?",
            path: "cultureBackground",
            placeholder: "Cultural Background",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 12,
            xs: 12,
          },
          {
            label: "Are you currently using any substances?",
            path: "substanceList",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select type of substance",
                type: FieldType.SELECT,
                options: SUBTANCE_TYPES,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder:
                  "Tell us more about how you use the substance (frequency, dose)",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more substances",
            lg: 12,
            xs: 12,
          },
          {
            label: "How would you describe your level of physical activity?",
            path: "physicallyActive",
            placeholder: "Physical activity",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 12,
            xs: 12,
          },
          {
            label: "How would you describe your level of sexual activity?",
            path: "sexuallyActive",
            placeholder: "Sexual activity",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 12,
            xs: 12,
          },
          {
            label: "Do you currently possess a weapon/firearm?",
            path: "weapon",
            type: FieldType.SINGLE_INSTANCE,
            required: true,
            properties: [
              {
                path: "hasAccess",
                placeholder: "Select Yes/No",
                type: FieldType.SELECT,
                options: CONFIRMATION_TYPES,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder: "If yes, please tell us a little more.",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            lg: 12,
            xs: 12,
          },
        ],
      },
    ],
  },
  [InTakeFormSteps.FEELING_INFORMATION]: {
    title: "Now, tell us how you’ve been feeling recently.",
    groups: [
      {
        groupName: "Your Symptoms",
        fields: [
          {
            label: "Which symptoms are you currently experiencing?",
            path: "symptomList",
            type: FieldType.MULTI_INSTANCE,
            required: true,
            properties: [
              {
                path: "type",
                placeholder: "Select symptom",
                type: FieldType.SELECT,
                options: SYMPTOM_TYPES,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder:
                  "Describe the symptom (Duration, frequency, severity, etc.)",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more symptoms",
            lg: 12,
            xs: 12,
          },
          {
            label: "My symptoms improve when I...",
            path: "relievedBy",
            placeholder: "What has been helpful in improving your symptoms?",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            required: true,
            lg: 12,
            xs: 12,
          },
          {
            label: "My symptoms worsen when I...",
            path: "worsenedBy",
            placeholder: "What can cause your symptoms worse?",
            required: true,
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 12,
            xs: 12,
          },
          {
            label: "Additional Comments",
            path: "symptomRemark",
            placeholder:
              "Anything else your doctor should know about what you’re going through right now?",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            required: true,
            lg: 12,
            xs: 12,
          },
          {
            label:
              "Have you recently (in the past 3 years) tried to harm yourself, or tried to take your life?",
            path: "dangerToSelf",
            type: FieldType.SINGLE_INSTANCE,
            properties: [
              {
                path: "danger",
                placeholder: "Select Yes/No",
                type: FieldType.SELECT,
                options: CONFIRMATION_TYPES,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder: "If yes, please tell us more.",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            isTopLabel: true,
            shrink: true,
            required: true,
            lg: 12,
            xs: 12,
          },
          {
            label:
              "Have you recently (in the past 3 years) tried to harm anyone else?",
            path: "dangerToOthers",
            type: FieldType.SINGLE_INSTANCE,
            properties: [
              {
                path: "danger",
                placeholder: "Select Yes/No",
                type: FieldType.SELECT,
                options: CONFIRMATION_TYPES,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder: "If yes, please tell us more.",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            required: true,
            lg: 12,
            xs: 12,
          },
        ],
      },
      {
        groupName: "Your Medication & Treatment",
        helperText:
          "You may leave the fields blank if the question does not apply to you.",
        fields: [
          {
            label: "Name of medication",
            path: "medList",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Name of medication",
                type: FieldType.TEXT,
                shrink: true,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder: "Are you currently taking any medication?",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more medications",
            lg: 12,
            xs: 12,
          },
          {
            label: "Do you have drug allergies?",
            path: "drugAllergies",
            placeholder: "Drug Allergies",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 12,
            xs: 12,
          },
          {
            label:
              "Are you currently receiving any mental health treatment? (Seeing a therapist, psychologist, psychiatrist...)",
            path: "psychTreatmentList",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select type of treatment",
                type: FieldType.SELECT,
                options: TREATMENT_TYPES,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder:
                  "Describe the treatment (Provider, frequency, location)",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more treatments",
            lg: 12,
            xs: 12,
          },
        ],
      },
    ],
  },
  [InTakeFormSteps.MEDICAL_HISTORY]: {
    title:
      "Thanks you for sharing. Now, can you tell us more about your medical history?",
    groups: [
      {
        groupName: "Psychiatric History",
        helperText:
          "You may leave the fields blank if the question does not apply to you.",
        fields: [
          {
            label: "Is there a history of mental illness in your family?",
            path: "psychFamilyHistory",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "relationship",
                placeholder: "Select family member",
                type: FieldType.SELECT,
                options: FAMILY_MEMBERS,
                lg: 6,
                xs: 12,
              },
              {
                path: "psychHistory",
                placeholder: "Describe their experience with mental illness",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more family members",
            lg: 12,
            xs: 12,
          },
          {
            label:
              "Have you been hospitalized in the past due to mental illness?",
            path: "psychHospitalizationHistory",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "date",
                placeholder: "Date",
                type: FieldType.DATE,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder: "What were you hospitalized for?",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more hospitalization history",
            lg: 12,
            xs: 12,
          },
          {
            label: "Do you have any traumatic experiences?",
            helperText:
              "You may also share this information directly with your doctor during your intake.",
            path: "psychTrauma",
            placeholder: "Traumatic experience",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 12,
            xs: 12,
          },
        ],
      },
      {
        groupName: "Medical History",
        helperText:
          "You may leave the fields blank if the question does not apply to you.",
        fields: [
          {
            label:
              "Have you been diagnosed of any other medication conditions not related to mental health?",
            path: "medicalDiagnosisHistory",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "date",
                placeholder: "Date",
                type: FieldType.DATE,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder: "What was the diagnosis?",
                type: FieldType.TEXT,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more diagnosis",
          },
          {
            label:
              "Is there a history of other medical conditions in your family?",
            path: "medicalFamilyHistory",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "relationship",
                placeholder: "Select family member",
                type: FieldType.SELECT,
                options: FAMILY_MEMBERS,
                lg: 6,
                xs: 12,
              },
              {
                path: "medicalHistory",
                placeholder: "Describe their medical conditions",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more family members",
            lg: 12,
            xs: 12,
          },
          {
            label:
              "Have you been hospitalized in the past due to other medical conditions?",
            path: "medicalHospitalizationHistory",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "date",
                placeholder: "Date",
                type: FieldType.DATE,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder: "What were you hospitalized for?",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more hospitalization history",
            lg: 12,
            xs: 12,
          },
          {
            label: "Have you had any surgery in the past?",
            path: "medicalSurgeryHistory",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "date",
                placeholder: "Date",
                type: FieldType.DATE,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
              {
                path: "description",
                placeholder: "What was the surgery for?",
                type: FieldType.TEXT,
                isTopLabel: true,
                shrink: true,
                lg: 6,
                xs: 12,
              },
            ],
            addButton: "Add more surgery history",
            lg: 12,
            xs: 12,
          },
          {
            label: "Do you have any chronic conditions?",
            path: "medicalChronicCondition",
            placeholder: "Chronic condition",
            type: FieldType.TEXT,
            isTopLabel: true,
            shrink: true,
            lg: 12,
            xs: 12,
          },
        ],
      },
    ],
  },
};
