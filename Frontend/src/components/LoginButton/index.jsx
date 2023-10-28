import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Button, CircularProgress, Stack } from "@mui/material";

const LoginButton = () => {
  const { loginWithRedirect, isLoading } = useAuth0();
  if(isLoading) {
    return <Stack direction='row' justifyContent='center'>
              <CircularProgress />
          </Stack>
  }
  return <Button variant='contained' type='submit' color='secondary' sx={{ padding: '0.6rem', width:'50%', borderRadius: '0.5rem' }} 
          onClick={() => loginWithRedirect()}>Log In</Button>;
};

export default LoginButton;