import { TCareTeamMember } from "../../types";

const defaultPic =
  "https://png.pngtree.com/png-vector/20190710/ourmid/pngtree-user-vector-avatar-png-image_1541962.jpg";

export const teamMembers: TCareTeamMember[] = [
  {
    _id: "1",
    memberID: "1",
    firstName: "Amy",
    lastName: "Tran",
    type: "Care Coordinator",
    picture: defaultPic,
    contact: "Text (650)-200-0179",
  },
  {
    _id: "2",
    memberID: "2",
    firstName: "Dave",
    lastName: "Ravi",
    type: "Psychiatrist",
    picture: defaultPic,
    contact: "Book an appointment",
  },
  {
    _id: "3",
    memberID: "3",
    firstName: "Amanda",
    lastName: "Lee",
    type: "Primary Care Physician",
    contact: "(650)-200-0171",
  },
];
