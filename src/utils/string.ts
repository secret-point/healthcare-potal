export const validateEmail = (email: string): boolean =>
  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);

export const getCapitalizedValue = (value: string) => {
  if (value.length) return value[0].toUpperCase() + value.substr(1);
  return value;
};
