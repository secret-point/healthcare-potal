export const localConfig = {
  apiUrl: "http://localhost:8080",
  googleClientId:
    "798126627437-d61jurgqkldgsie6eg0ek0q0nb79kno3.apps.googleusercontent.com",
};

export const stagingConfig = {
  apiUrl: "https://cpdashnode-dot-cynomys-nonprod.df.r.appspot.com/",
  googleClientId:
    "798126627437-d61jurgqkldgsie6eg0ek0q0nb79kno3.apps.googleusercontent.com",
};

export const prodConfig = {
  apiUrl: "https://cpdashnode-dot-cynomys-nonprod.df.r.appspot.com/",
  googleClientId:
    "798126627437-d61jurgqkldgsie6eg0ek0q0nb79kno3.apps.googleusercontent.com",
};

const config = (() => {
  switch (process.env.REACT_APP_ENV?.toLowerCase()) {
    case "staging":
      return stagingConfig;
    case "prod":
      return prodConfig;
    default:
      return localConfig;
  }
})();

export default config;
