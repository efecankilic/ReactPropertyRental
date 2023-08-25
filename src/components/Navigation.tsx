import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext, { AuthContextType } from "./auth/AuthContext";

export default function Navigation() {
  const auth = React.useContext(AuthContext) as AuthContextType;

  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleSignOut = () => {
    auth.logout();
    navigate("/signin");
  };

  return (
    <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Home" value="/" component={NavLink} to="/" />
        {auth.isLoggedIn ? (
          [
            <Tab
              key="bookings"
              label="Bookings"
              value="/bookings"
              component={NavLink}
              to="/bookings"
            />,
            <Tab key="signout" label="Sign Out" onClick={handleSignOut} />,
          ]
        ) : (
          <Tab
            label="Sign In"
            value="/signin"
            component={NavLink}
            to="/signin"
          />
        )}
      </Tabs>
    </Box>
  );
}
