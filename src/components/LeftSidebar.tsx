import { FC } from "react";
import { Link } from "react-router-dom";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

interface LinkProps {
  title: string;
  link?: string;
}

const MenuLink: FC<LinkProps> = ({ title, link, children }) => (
  <Link to={link || ""}>
    <Typography variant="h4">{title}</Typography>
    {children && <Box ml={2}>{children}</Box>}
  </Link>
);

interface LeftSidebarProps {
  userName: string;
  onClose: VoidFunction;
}

const LeftSidebar: FC<LeftSidebarProps> = ({ userName, onClose }) => (
  <Box width={320}>
    <Box width={1} display="flex" alignItems="space-between">
      <Typography variant="h3">{["Hi", userName].join(", ")}</Typography>
      <IconButton onClick={onClose}>
        <CloseIcon />
      </IconButton>
    </Box>

    <Box width={1}>
      <MenuLink title="Home" link="/dashboard" />
      <MenuLink title="My Care">
        <MenuLink title="Progress" link="/progress" />
        <MenuLink title="Appointments" link="/appointments" />
        <MenuLink title="Prescriptions" link="/prescriptions" />
      </MenuLink>
      <MenuLink title="My Account">
        <MenuLink title="Profile" link="/profile" />
        <MenuLink title="Billing" link="/billing" />
        <MenuLink title="Documents" link="/documents" />
      </MenuLink>
    </Box>
  </Box>
);

export default LeftSidebar;
