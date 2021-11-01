import { TDropItem } from "../types/general";

export const EMERGENCY_RELATIONSHIPS: TDropItem[] = [
  { code: "Father", display: "Father" },
  { code: "Husband", display: "Husband" },
  { code: "Mother", display: "Mother" },
  { code: "Partner", display: "Partner" },
  { code: "Wife", display: "Wife" },
  { code: "Friend", display: "Friend" },
];

export const ETHNICITIES: TDropItem[] = [
  { code: "White", display: "White" },
  { code: "African American", display: "African American" },
  { code: "Natie American", display: "Natie American" },
  { code: "Pacific Islander", display: "Pacific Islander" },
  { code: "Asian", display: "Asian" },
  { code: "Native Hawaiian", display: "Native Hawaiian" },
];

export const PRONOUNS: TDropItem[] = [
  { code: "HE", display: "He/Him" },
  { code: "She/Her/Her", display: "She/Her/Her" },
  { code: "THEY", display: "They/Them" },
];

export const BIOLOGICAL_SEXES: TDropItem[] = [
  { code: "Male", display: "Male" },
  { code: "Female", display: "Female" },
];

export const EDUCATIONAL_DEGREES: TDropItem[] = [
  { code: "Associate degree", display: "Associate degree" },
  { code: "Bachelor's degree", display: "Bachelor's degree" },
  { code: "Master's degree", display: "Master's degree" },
  { code: "Doctoral degree", display: "Doctoral degree" },
];

export const MARITAL_STATUS: TDropItem[] = [
  { code: "Single", display: "Single" },
  { code: "Married", display: "Married" },
  { code: "Widowed", display: "Widowed" },
  { code: "Divorced", display: "Divorced" },
  { code: "Domestic Partnership", display: "Domestic Partnership" },
];

export const EMPLOYMENT_STATUS: TDropItem[] = [
  { code: "WORKER", display: "Worker" },
  { code: "EMPLOYEE", display: "Employee" },
  { code: "SELF_EMPLOYED", display: "Self-Employed" },
];

export const LIVING_ARRANGEMENT_TYPES: TDropItem[] = [
  { code: "BUYING", display: "Buying" },
  { code: "RENTING", display: "Renting" },
  { code: "GROUP_HOMES", display: "Group Homes" },
  { code: "SUPERVISED_APARTMENTS", display: "Supervised Apartments" },
  { code: "SUPPORTED_LIVING", display: "Supported Living" },
  { code: "FOSTER_SPONSOR_FAMILIES", display: "Foster or Sponsor Families" },
  { code: "INDEPENDENT_LIVING", display: "Independent Living" },
];

export const PEOPLE_LIVING_WITH: TDropItem[] = [
  { code: "GRAND_PARENTS", display: "Grand Parents" },
  { code: "FATHER", display: "Father" },
  { code: "MOTHER", display: "Mother" },
  { code: "HUSBAND", display: "Hubsband" },
  { code: "WIFE", display: "Wife" },
  { code: "BROTHER", display: "Brother" },
  { code: "SISTER", display: "Sister" },
  { code: "RELATIVE", display: "Relative" },
  { code: "FRIEND", display: "Friend" },
];

export const FAMILY_MEMBERS: TDropItem[] = [
  { code: "GRAND FATHER", display: "Grand Father" },
  { code: "GRAND MOTHER", display: "Grand Mother" },
  { code: "FATHER", display: "Father" },
  { code: "MOTHER", display: "Mother" },
  { code: "BROTHER", display: "Brother" },
  { code: "SISTER", display: "Sister" },
];

export const SUBTANCE_TYPES: TDropItem[] = [
  { code: "ELEMENT", display: "Element" },
  { code: "COMPOUND", display: "Compound" },
  { code: "MIXTURE", display: "Mixture" },
];

export const CONFIRMATION_TYPES: TDropItem[] = [
  { code: "Yes", display: "Yes" },
  { code: "No", display: "No" },
];

export const SYMPTOM_TYPES: TDropItem[] = [
  { code: "REMITTING", display: "Remitting" },
  { code: "CHRONIC", display: "Chronic" },
  { code: "RELAPSING", display: "Relapsing" },
];

export const MEDICATION_TYPES: TDropItem[] = [
  { code: "LIQUID", display: "Liquid" },
  { code: "TABLET", display: "Tablet" },
  { code: "CAPSULES", display: "Capsules" },
  { code: "TOPICAL", display: "Topical medicines" },
  { code: "SUPPOSITORIES", display: "Suppositories" },
  { code: "DROPS", display: "Drops" },
  { code: "INHALERS", display: "Inhalers" },
  { code: "INJECTIONS", display: "Injections" },
  { code: "IMPLANTS", display: "Implants or patches" },
];

export const TREATMENT_TYPES: TDropItem[] = [
  { code: "TARGETED", display: "Targeted Therapies" },
  { code: "CHEMOTHERAPY", display: "Chemotherapy" },
  { code: "SURGEY", display: "Surgery" },
  { code: "RADIATION", display: "Radiation Therapies" },
  { code: "BIOLOGICAL", display: "Biological Therapy" },
  { code: "HORMONAL", display: "Hormonal Therapy" },
];

export const MEDICATION_DELIVER_TYPES: TDropItem[] = [
  {
    code: "YES",
    display:
      "Yes, I would like to get it delivered through Prairie (Recommended)",
  },
  {
    code: "NO",
    display: "No, I would like to pick up my medication at another pharmacy.",
  },
];

export const CARE_PROVIDER_TYPES: TDropItem[] = [
  { code: "PRIMARY", display: "Primary Care" },
  { code: "NURSING", display: "Nursing Care" },
  { code: "SPECIALITY", display: "Speciality Care" },
];

export const INFORMATION_TYPES: TDropItem[] = [
  { code: "ALL", display: "Select all" },
  { code: "DIAGNOSIS", display: "Diagnosis" },
  { code: "PRESCRIPTION", display: "Prescription" },
  { code: "CONSULTATION", display: "Consultation" },
  { code: "GENETIC_TEST", display: "Genetic test" },
  { code: "ASSESSMENT_RECORD", display: "Assessment record" },
  { code: "DISCHARGE_SUMMARY", display: "Discharge summary" },
];
