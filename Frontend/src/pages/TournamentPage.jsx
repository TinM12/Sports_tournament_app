import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StandingsTable from '../components/StandingsTable';
import RoundsSummary from '../components/RoundsSummary';

const TournamentPage = () => {

    const [tournamentId, setTournamentId] = useState();

    const loadTournamentId = () => {
        const queryParams = new URLSearchParams(window.location.search);
        const id = parseInt(queryParams.get("id"));
        setTournamentId(id);
    }

    useEffect(() => {
        loadTournamentId();
    }, [])

    return (
        <main>
            <Box display='flex' justifyContent='end'> 
                <Button>
                    CLOSE
                </Button>
            </Box>
            {tournamentId &&
                <StandingsTable tournamentid={tournamentId}/>
            }
            <RoundsSummary/>
        </main>
    );
};

export default TournamentPage;