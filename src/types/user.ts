export interface User {
  _id: string;
  memberID: string;
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

export type TCareTeamMember = {
  id: string | number;
  name: string;
  job: string;
  contact: string;
};
