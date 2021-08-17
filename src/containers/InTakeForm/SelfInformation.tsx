import { FC } from "react";

import Grid from "@material-ui/core/Grid";

import useAuth from "../../hooks/useAuth";

interface SelfInformationProps {}

const SelfInformation: FC<SelfInformationProps> = () => {
  const { user } = useAuth();

  return <Grid container>{user?.firstName}</Grid>;
};

export default SelfInformation;
