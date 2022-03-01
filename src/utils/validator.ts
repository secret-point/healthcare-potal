export const birthdayValidator = {
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
        day <= 31;
      return isValid ? true : "Birthday is invalid.";
    },
  },
};
