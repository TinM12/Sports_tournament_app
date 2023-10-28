import { AppBar, Box, Grid, Stack, Toolbar, Typography } from '@mui/material';
import React from 'react'
import LogoutButton from '../LogoutButton'
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const { user } = useAuth0();

    return (
        <AppBar position='static' color='primary' enableColorOnDark>
            <Toolbar>
                <Grid container alignItems='center'>
                    <Grid item md={5}>
                        <Stack>
                            <Typography variant='h6' sx={{ letterSpacing: '.1rem'}}>
                                Welcome, {user.nickname}!
                            </Typography>
                        </Stack>
                    </Grid>
                    <Box sx={{ flexGrow: 1 }}></Box>
                    <LogoutButton />             
                </Grid>
            </Toolbar>
        </AppBar>
    );
};

export default Header;