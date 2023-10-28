import { Box, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

const MyTournamentsList = () => {

    const [myTournaments, setMyTournaments] = useState([]);
    
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