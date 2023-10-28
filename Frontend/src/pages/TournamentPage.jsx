import { Box, Button } from '@mui/material';
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
    const navigateTo = useNavigate();

    

    const handleClose = () => {
        navigateTo('/');
    }

    useEffect(() => {
        const loadTournamentId = async() => {
            const queryParams = new URLSearchParams(window.location.search);
            const id = parseInt(queryParams.get("id"));
            setTournamentId(id);

            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}tournament/owner?id=${id}`)
            const owner = res.data.owner;
            if(user && owner === user.email) {
                setIsOwner(true);
            }
        }

        loadTournamentId();
    }, [user])

    return (
        <main>
            {isAuthenticated &&
                <Box display='flex' justifyContent='end' margin='1rem'> 
                    <Button variant='contained' color='error' onClick={handleClose}>
                        CLOSE
                    </Button>
                </Box>
            }
            {tournamentId &&
                <StandingsTable tournamentid={tournamentId}/>
            }
            <hr color='#C69749'/>
            {tournamentId &&
                <RoundsSummary tournamentid={tournamentId} isOwner={isOwner}/>
            }
        </main>
    );
};

export default TournamentPage;