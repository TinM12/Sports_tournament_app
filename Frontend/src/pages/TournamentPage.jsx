import { Box, Button, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import StandingsTable from '../components/StandingsTable';
import RoundsSummary from '../components/RoundsSummary';
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TournamentPage = () => {

    const { user, isAuthenticated } = useAuth0();
    const [tournamentId, setTournamentId] = useState();
    const [isOwner, setIsOwner] = useState(false);
    const [refreshStandings, setRefreshStandings] = useState(0);
    const [tournament, setTournament] = useState();
    const navigateTo = useNavigate();

    const handleClose = () => {
        navigateTo('/');
    }

    const incrementRefreshStandings = () => {
        setRefreshStandings(refreshStandings + 1)
    };  

    useEffect(() => {
        const loadTournamentId = async() => {
            const queryParams = new URLSearchParams(window.location.search);
            const id = parseInt(queryParams.get("id"));
            if(isNaN(id)) {
                navigateTo('/')
                return;
            }
            setTournamentId(id);

            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}tournament/owner?id=${id}`)
            const owner = res.data.owner;
            if(user && owner === user.email) {
                setIsOwner(true);
            }

            const tournament = await axios.get(`${process.env.REACT_APP_BACKEND_URL}tournament?id=${id}`);
            setTournament(tournament.data);
            if(tournament.data === "") {
                navigateTo('/')
            }
        }

        loadTournamentId();
    }, [user, navigateTo])

    return (
        <main>
            <Box display='flex' justifyContent='space-between' margin='1rem'> 
                {tournament && 
                    <Typography variant='h4' color='secondary' sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                        {tournament.name}
                    </Typography>
                }
                {isAuthenticated &&
                    <Button variant='contained' color='error' onClick={handleClose}>
                        CLOSE
                    </Button>
                }
            </Box>
            {tournamentId &&
                <StandingsTable tournamentid={tournamentId} refreshStandings={refreshStandings}/>
            }
            <hr color='#C69749'/>
            {tournamentId &&
                <RoundsSummary tournamentid={tournamentId} isOwner={isOwner} refreshFunction={incrementRefreshStandings}/>
            }
        </main>
    );
};

export default TournamentPage;