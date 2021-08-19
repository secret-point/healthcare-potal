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
  MEDICATION_TYPES,
  TREATMENT_TYPES,
  FAMILY_MEMBERS,
  MEDICATION_DELIVER_TYPES,
  CARE_PROVIDER_TYPES,
} from "../../constants/identity";
import { usStates } from "../../constants/usStates";

export enum InTakeFormSteps {
  START = "START",
  SELF_INFORMATION = "SELF_INFORMATION",
  ADDITIONAL_INFORMATION = "ADDITIONAL_INFORMATION",
  FEELING_INFORMATION = "FEELING_INFORMATION",
  MEDICAL_HISTORY = "MEDICAL_HISTORY",
  PHARMACY = "PHARMACY",
  COMPLETE = "COMPLETE",
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
            options: BIOLOGICAL_SEXES,
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
  [InTakeFormSteps.ADDITIONAL_INFORMATION]: {
    title:
      "Next, provide your doctor more information about yourself and your lifestyle!",
    groups: [
      {
        groupName: "Additional information",
        fields: [
          {
            label: "Where were you born?",
            path: "birthPlace",
            placeholder: "City/state you were born",
            xs: 6,
          },
          {
            label: "What is your highest educational degree?",
            path: "educationalDegree",
            placeholder: "Select your highest degree",
            type: FieldType.SELECT,
            options: EDUCATIONAL_DEGREES,
            xs: 6,
          },
          {
            label: "What is your marital status?",
            path: "maritalStatus",
            placeholder: "Select your marital status",
            type: FieldType.SELECT,
            options: MARITAL_STATUS,
            xs: 6,
          },
          {
            label: "What is your employment status?",
            path: "employmentStatus",
            placeholder: "Select your emloyment status",
            type: FieldType.SELECT,
            options: EMPLOYMENT_STATUS,
            xs: 6,
          },
          {
            label: "What is your current living arrangement?",
            path: "livingArrangement",
            placeholder: "Select your living arrangement",
            type: FieldType.SELECT,
            options: LIVING_ARRANGEMENT_TYPES,
            xs: 6,
          },
          {
            label: "Who are you currently living with? Check all that apply",
            path: "livingWithWhom",
            placeholder: "Select all who you are living with",
            type: FieldType.MULTI_SELECT,
            options: PEOPLE_LIVING_WITH,
            xs: 6,
          },
          {
            label: "How would you characterize your cultural background?",
            path: "culturalBackground",
            placeholder: "Cultural Background",
            xs: 12,
          },
          {
            label: "Are you currently using any substances?",
            path: "substances",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select type of substance",
                type: FieldType.MULTI_SELECT,
                options: SUBTANCE_TYPES,
              },
              {
                path: "description",
                placeholder:
                  "Tell us more about how you use the substance (frequency, dose)",
              },
            ],
            addButton: "Add more substances",
            xs: 12,
          },
          {
            label: "How would you describe your level of physical activity?",
            path: "physicalActivity",
            placeholder: "Physical activity",
            xs: 12,
          },
          {
            label: "How would you describe your level of sexual activity?",
            path: "sexualActivity",
            placeholder: "Sexual activity",
            xs: 12,
          },
          {
            label: "Do you current possess a weapon/firearm",
            path: "weaponPossess",
            type: FieldType.SINGLE_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select Yes/No",
                type: FieldType.SELECT,
                options: CONFIRMATION_TYPES,
              },
              {
                path: "description",
                placeholder: "If yes, please tell us a little more.",
              },
            ],
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
            path: "currentSymptoms",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select symptom",
                type: FieldType.SELECT,
                options: SYMPTOM_TYPES,
              },
              {
                path: "description",
                placeholder:
                  "Describe the symptom (Duration, frequency, severity, etc.)",
                type: FieldType.TEXT,
              },
            ],
            addButton: "Add more symptoms",
            xs: 12,
          },
          {
            label: "My symptoms improve when I...",
            path: "symptomsImproveWhen",
            placeholder: "What has been helpful in improving your symptoms?",
            required: true,
            xs: 12,
          },
          {
            label: "My symptoms worsen when I...",
            path: "symptomsWorsenWhen",
            placeholder: "What can cause your symptoms worse?",
            required: true,
            xs: 12,
          },
          {
            label: "Additional Comments",
            path: "additionalComments",
            placeholder:
              "Anything else your doctor should know about what you’re going through right now?",
            required: true,
            xs: 12,
          },
          {
            label:
              "Have you recently (in the past 3 years) tried to harm yourself, or tried to take your life?",
            path: "recentHarmYourself",
            type: FieldType.SINGLE_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select Yes/No",
                type: FieldType.SELECT,
                options: CONFIRMATION_TYPES,
              },
              {
                path: "description",
                placeholder: "If yes, please tell us more.",
              },
            ],
            required: true,
            xs: 12,
          },
          {
            label:
              "Have you recently (in the past 3 years) tried to harm anyone else?",
            path: "recentHarmAnyoneElse",
            type: FieldType.SINGLE_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select Yes/No",
                type: FieldType.SELECT,
                options: CONFIRMATION_TYPES,
              },
              {
                path: "description",
                placeholder: "If yes, please tell us more.",
              },
            ],
            required: true,
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
            label: "Which medication(s) are you currently taking?",
            path: "yourMedications",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select medication",
                type: FieldType.MULTI_SELECT,
                options: MEDICATION_TYPES,
              },
              {
                path: "description",
                placeholder:
                  "Describe the medication (strength/dose, frequency)",
              },
            ],
            addButton: "Add more medications",
            xs: 12,
          },
          {
            label: "Do you have drug allergies?",
            path: "drugAllergies",
            placeholder: "Drug Allergies",
            xs: 12,
          },
          {
            label:
              "Are you currently receiving any mental health treatment? (Seeing a therapist, psychologist, psychiatrist...)",
            path: "currentMentalHealthTreatments",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "type",
                placeholder: "Select type of treatment",
                type: FieldType.SELECT,
                options: TREATMENT_TYPES,
              },
              {
                path: "description",
                placeholder:
                  "Describe the treatment (provider, frequency,, location)",
              },
            ],
            addButton: "Add more treatments",
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
            path: "familyMentalIllness",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "member",
                placeholder: "Select family member",
                type: FieldType.SELECT,
                options: FAMILY_MEMBERS,
              },
              {
                path: "description",
                placeholder: "Describe their experience with mental illness",
                type: FieldType.TEXT,
              },
            ],
            addButton: "Add more family members",
            xs: 12,
          },
          {
            label:
              "Have you been hospitalized in the past due to mental illness?",
            path: "mentalIllnessHospitalization",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "date",
                placeholder: "Date",
                type: FieldType.DATE,
              },
              {
                path: "description",
                placeholder: "What were you hospitalized for?",
                type: FieldType.TEXT,
              },
            ],
            addButton: "Add more hospitalization history",
            xs: 12,
          },
          {
            label:
              "Have you had any surgery in the past due to mental illness?",
            path: "mentalIllnessSurgeries",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "date",
                placeholder: "Date",
                type: FieldType.DATE,
              },
              {
                path: "description",
                placeholder: "What was the surgery for?",
                type: FieldType.TEXT,
              },
            ],
            addButton: "Add more surgery history",
            xs: 12,
          },
          {
            label: "Do you have any traumatic experiences?",
            helperText:
              "You may also share this information directly with your doctor during your intake.",
            path: "traumaticExperience",
            placeholder: "Traumatic experience",
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
              "Is there a history of other medical conditions in your family?",
            path: "familyMedicalConditions",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "member",
                placeholder: "Select family member",
                type: FieldType.SELECT,
                options: FAMILY_MEMBERS,
              },
              {
                path: "description",
                placeholder: "Describe their medical conditions",
                type: FieldType.TEXT,
              },
            ],
            addButton: "Add more family members",
            xs: 12,
          },
          {
            label:
              "Have you been hospitalized in the past due to other medical conditions?",
            path: "medicalConditionsHospitalization",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "date",
                placeholder: "Date",
                type: FieldType.DATE,
              },
              {
                path: "description",
                placeholder: "What were you hospitalized for?",
                type: FieldType.TEXT,
              },
            ],
            addButton: "Add more hospitalization history",
            xs: 12,
          },
          {
            label:
              "Have you had any surgery in the past due to other medical conditions?",
            path: "medicalConditionsSurgery",
            type: FieldType.MULTI_INSTANCE,
            properties: [
              {
                path: "date",
                placeholder: "Date",
                type: FieldType.DATE,
              },
              {
                path: "description",
                placeholder: "What was the surgery for?",
                type: FieldType.TEXT,
              },
            ],
            addButton: "Add more surgery history",
            xs: 12,
          },
          {
            label: "Do you have any chronic conditions?",
            path: "chronicConditions",
            placeholder: "Chronic condition",
            xs: 12,
          },
        ],
      },
    ],
  },
  [InTakeFormSteps.PHARMACY]: {
    title: "Alright, we’re almost done!",
    groups: [
      {
        groupName: "Pharmacy Selection",
        helperText: `If you use Prairie's Delivery Service, we'll deliver your monthly batch of medication for a flat rate of $15 (per medication).
      While you may also pick up your medication at another pharmacy of your choice, the copay amount owed will differ from pharmacy to pharmacy, and be based on your insurance coverage.`,
        fields: [
          {
            label: "Would you like to get your medication delivered?",
            path: "pharmacyMedicationDeliverFrom",
            type: FieldType.RADIO_GROUP,
            options: MEDICATION_DELIVER_TYPES,
            xs: 12,
            required: true,
          },
          {
            label:
              "Please provide the information of the pharmacy you wish to use.",
            type: FieldType.SINGLE_INSTANCE,
            path: "pharmacyInformation",
            properties: [
              { path: "name", placeholder: "Name of the pharmacy" },
              { path: "phoneNumber", placeholder: "Phone number" },
              { path: "streetAddress1", placeholder: "Street address 1" },
              {
                path: "streetAddress2",
                placeholder: "Street address 2(optional)",
              },
              { path: "city", placeholder: "City" },
              { path: "zipcode", placeholder: "Zipcode" },
              {
                path: "state",
                placeholder: "Zipcode",
                type: FieldType.SELECT,
                options: usStates,
              },
            ],
            required: true,
          },
        ],
      },
      {
        groupName: "Coordination of Care",
        helperText: `Coordination of Care allows for your Prairie team to provide updates on your care with an outside provider like a therapist or your primary care provider. This leads to better outcomes on average, since everyone has the latest information about your care from your psychiatrist here at Prairie Health.<br/>
      Your care team at Prairie Health will share relevant medical information with the people with whom you'd like us to coordinate care via mail, fax or any other secure methods.`,
        fields: [
          {
            label: "Would you like to get your medication delivered?",
            path: "careMedicationDeliverFrom",
            type: FieldType.RADIO_GROUP,
            options: MEDICATION_DELIVER_TYPES,
            xs: 12,
            required: true,
          },
          {
            label: "Who would you like us to coordinate your care with?",
            type: FieldType.MULTI_INSTANCE,
            path: "pharmacyInformation",
            properties: [
              {
                path: "provider",
                placeholder: "Select type of provider",
                type: FieldType.SELECT,
                options: CARE_PROVIDER_TYPES,
              },
              { path: "name", placeholder: "Name of the person" },
              { path: "streetAddress1", placeholder: "Street address 1" },
              {
                path: "streetAddress2",
                placeholder: "Street address 2(optional)",
              },
              { path: "city", placeholder: "City" },
              { path: "zipcode", placeholder: "Zipcode" },
              {
                path: "state",
                placeholder: "Zipcode",
                type: FieldType.SELECT,
                options: usStates,
              },
              { path: "phoneNumber", placeholder: "Phone number" },
              { path: "faxNumber", placeholder: "Fax number(if available)" },
              {
                path: "emailAddress",
                placeholder: "Email address(if available)",
              },
            ],
            addButton: "Add another provider",
            required: true,
          },
        ],
      },
    ],
  },
};
