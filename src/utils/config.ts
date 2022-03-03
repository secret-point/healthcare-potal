export const localConfig = {
  apiUrl: "http://localhost:8080",
  googleClientId:
    "798126627437-d61jurgqkldgsie6eg0ek0q0nb79kno3.apps.googleusercontent.com",
  stripePublicKey: "pk_test_wgcyEuMiEXjbRXJzdywce5Z900k1ZXqk4Q",
};

export const stagingConfig = {
  apiUrl: "https://cpdashnode-dot-cynomys-nonprod.df.r.appspot.com",
  googleClientId:
    "798126627437-d61jurgqkldgsie6eg0ek0q0nb79kno3.apps.googleusercontent.com",
  stripePublicKey: "pk_test_wgcyEuMiEXjbRXJzdywce5Z900k1ZXqk4Q",
};

export const prodConfig = {
  apiUrl: "https://cpdashnodeprod-dot-cynomys-prod.uc.r.appspot.com",
  googleClientId:
    "796116242709-22u22b4v06bafs9tsit6qkh70sqnj417.apps.googleusercontent.com",
  stripePublicKey: "pk_test_wgcyEuMiEXjbRXJzdywce5Z900k1ZXqk4Q",
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
