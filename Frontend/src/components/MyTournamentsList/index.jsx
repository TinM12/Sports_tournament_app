import { useAuth0 } from '@auth0/auth0-react';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MyTournamentsList = () => {

    const [myTournaments, setMyTournaments] = useState(null);
    const { user, isLoading } = useAuth0();
    const navigateTo = useNavigate();

    const handleUpdate = (e) => {
        const fullLink = e.target.value;
        const link = fullLink.replace("http://localhost:3000/", "");
        navigateTo(link)
    }

    useEffect(() => {
        const loadTournaments = async() => {
            const tournaments = await axios.get(`${process.env.REACT_APP_BACKEND_URL}tournament`, {
                owner: user.email
            });
    
            setMyTournaments(tournaments.data);
        };

        loadTournaments();
    }, [user])

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    return (
        <Box sx={{ margin: '1rem'}}> 
            <Typography variant='h6' sx={{ textDecoration: 'underline', fontWeight: 'bold', color: '#C69749', marginLeft:'1rem' }}>
                MY TOURNAMENTS:
            </Typography>
            { myTournaments &&
                <Box>
                    <br/>
                    { myTournaments.length > 0 ? 
                        <Stack direction='column' spacing='1rem' marginLeft={'1rem'}>
                            {myTournaments.map((tournament, index) => (
                                <Box key={index}>
                                    <Box display='flex' alignItems='center' justifyContent='space-between' key={index}>
                                        <Typography sx={{ fontWeight: 'bold', fontSize: '1.2rem', width:'40%'}}>
                                            {tournament.name}
                                        </Typography>
                                        <Typography sx={{ width: '40%' }}>
                                            LINK: {tournament.link}
                                        </Typography>
                                        <Button color='secondary' variant='contained' value={tournament.link} onClick={handleUpdate}>
                                            Update
                                        </Button>
                                    </Box>
                                    <hr/>
                                </Box>
                            ))}
                        </Stack>
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
            }
        </Box>
    );
};

export default MyTournamentsList;