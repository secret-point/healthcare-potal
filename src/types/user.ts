export interface User {
  firstName: string;
  lastName: string;
}

export interface AuthorizedUser extends User {
  token: string;
}
