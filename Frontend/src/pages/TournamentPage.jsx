import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StandingsTable from '../components/StandingsTable';
import RoundsSummary from '../components/RoundsSummary';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';

const TournamentPage = () => {

    const { isAuthenticated } = useAuth0();
    const [tournamentId, setTournamentId] = useState();
    const navigateTo = useNavigate();

    const loadTournamentId = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = parseInt(queryParams.get("id"));
        setTournamentId(id);
    }

    const handleClose = () => {
        navigateTo('/');
    }

    useEffect(() => {
        loadTournamentId();
    }, [])

    return (
        <main>
            {isAuthenticated &&
                <Box display='flex' justifyContent='end'  margin='1rem'> 
                    <Button variant='contained' color='secondary' onClick={handleClose}>
                        CLOSE
                    </Button>
                </Box>
            }
            {tournamentId &&
                <StandingsTable tournamentid={tournamentId}/>
            }
            <RoundsSummary/>
        </main>
    );
};

export default TournamentPage;