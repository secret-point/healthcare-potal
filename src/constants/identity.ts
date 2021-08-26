import { TDropItem } from "../types/general";

export const EMERGENCY_RELATIONSHIPS: TDropItem[] = [
  { code: "FATHER", display: "Father" },
  { code: "HUSBAND", display: "Husband" },
  { code: "MOTHER", display: "Mother" },
  { code: "PARTNER", display: "Partner" },
  { code: "WIFE", display: "Wife" },
  { code: "FRIEND", display: "Friend" },
];

export const ETHNICITIES: TDropItem[] = [
  { code: "WHITE", display: "White" },
  { code: "AFRICAN", display: "African American" },
  { code: "NATIVE", display: "Natie American" },
  { code: "PACIFIC", display: "Pacific Islander" },
  { code: "ASIAN", display: "Asian" },
  { code: "HAWAIIAN", display: "Native Hawaiian" },
];

export const PRONOUNS: TDropItem[] = [
  { code: "HE", display: "He/Him" },
  { code: "SHE", display: "She/Her" },
  { code: "THEY", display: "They/Them" },
];

export const BIOLOGICAL_SEXES: TDropItem[] = [
  { code: "MALE", display: "Male" },
  { code: "FEMALE", display: "Female" },
];

export const EDUCATIONAL_DEGREES: TDropItem[] = [
  { code: "ASSOCIATE", display: "Associate degree" },
  { code: "BACHELOR", display: "Bachelor's degree" },
  { code: "MASTER", display: "Master's degree" },
  { code: "DOCTOR", display: "Doctoral degree" },
];

export const MARITAL_STATUS: TDropItem[] = [
  { code: "SINGLE", display: "Single" },
  { code: "MARRIED", display: "Married" },
  { code: "WIDOWED", display: "Widowed" },
  { code: "DIVORCED", display: "Divorced" },
  { code: "DOMESTIC", display: "Domestic Partnership" },
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
  { code: "YES", display: "Yes" },
  { code: "NO", display: "No" },
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
  { code: "PRIMARY", display: "Primary" },
  { code: "SECONDARY", display: "Secondary" },
  { code: "TERITARY", display: "Teritary" },
];
