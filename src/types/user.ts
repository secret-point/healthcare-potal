export interface User {
  name: string;
}

export interface AuthorizedUser extends User {
  token: string;
}
