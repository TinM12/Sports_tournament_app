import { useAuth0 } from '@auth0/auth0-react';
import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

const MyTournamentsList = () => {

    const [myTournaments, setMyTournaments] = useState([]);
    const { user } = useAuth0();

    const loadTournaments = async() => {
        
    };
    
    useEffect(() => {
        loadTournaments();
    }, [])
    
    return (
        <Box sx={{ margin: '1rem'}}> 
            <Typography variant='h6' sx={{ textDecoration: 'underline', fontWeight: 'bold', color: '#C69749', marginLeft:'1rem' }}>
                MY TOURNAMENTS:
            </Typography>
            {myTournaments.length > 0 ? 
                <Box></Box>
                : <Box>
                    <br/>
                    <Stack direction='column' spacing='1rem' marginLeft={'1rem'}>
                        <Typography>
                            You do not have any tournaments.
                        </Typography>
                    </Stack>
                </Box>
            }
        </Box>
    );
};

export default MyTournamentsList;