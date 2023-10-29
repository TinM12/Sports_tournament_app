import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography } from '@mui/material';

const StandingsTable = ({ tournamentid, refreshStandings }) => {

    const [standings, setStandings] = useState();

    useEffect(() => {
        const loadStandings = async () => {
            const temp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}contestant?id=${tournamentid}`);
            setStandings(temp.data);
        };    

        loadStandings();
    }, [tournamentid, refreshStandings])

    return (
        <Box margin='2rem'>
            <Typography variant='h5' sx={{ textDecoration: 'underline', fontWeight: 'bold'}}>
                Standings
            </Typography>
            <br/>
            <table style={{ backgroundColor: '#282A3A'}} width={'70%'}>
                {standings &&
                    <tbody>
                        <tr style={{ backgroundColor: '#C69749', color: 'black'}}>
                            <td>Position</td>
                            <td>Contestant</td>
                            <td>Played</td>
                            <td>Points</td>
                        </tr>
                        {standings.map((standing, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{standing.contestantName}</td>
                                <td>{standing.played}</td>
                                <td>{standing.points}</td>
                            </tr>
                        ))}
                    </tbody>
                }  
            </table>
        </Box>
    );
};

export default StandingsTable;