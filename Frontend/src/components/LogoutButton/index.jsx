import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <Button variant='contained' type='submit' color='error' sx={{ padding: '0.6rem', borderRadius: '0.5rem' }} 
      startIcon={<LogoutIcon/>}
      onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
      Logout
    </Button>
  );
};

export default LogoutButton;