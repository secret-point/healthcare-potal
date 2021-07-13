export interface User {
  firstName: string;
  lastName: string;
}

export interface AuthorizedUser extends User {
  token: string;
}

export enum VerificationStatus {
  VERIFIED = "Verified",
  SKIPPED = "Skipped",
  EXPIRED = "Expired",
  UNVERIFIED = "Unverified",
  PENDING = "Pending",
}
