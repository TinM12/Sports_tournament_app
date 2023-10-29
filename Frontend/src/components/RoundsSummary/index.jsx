import { Box, Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RoundResults from '../RoundResults';

const RoundsSummary = ({ tournamentid, isOwner, refreshFunction }) => {

    const [results, setResults] = useState();
    const [text, setText] = useState();

    useEffect(() => {
        const loadResults = async () => {
            const temp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}result?id=${tournamentid}`);
            setResults(temp.data);
            let maxRounds = -1;
            for(const pair of temp.data) {
                if(pair.round > maxRounds) {
                    maxRounds = pair.round
                }
            }

            const output = [];
            for (let i = 0; i < maxRounds; i++) {
                output.push(<Typography variant='h6' sx={{ fontWeight: 'bold', textDecoration: 'underline' }}>Round {i + 1}</Typography>)
            }
            setText(output);
        };    

        loadResults();
    }, [tournamentid])

    return (
        <Box margin='2rem'>
            {results && 
                <Stack direction='column'  sx={{ width:'100%' }}>
                    {text.map((t, index) => (
                        <Box key={index} marginTop='1rem'>
                            {t}
                            <RoundResults results={results} round={index + 1} isOwner={isOwner} tournamentid={tournamentid} refreshFunction={refreshFunction}/>
                            <br/>
                            <hr color='#C69749'/>
                        </Box>
                    ))}
                </Stack>
            }
        </Box>

    );
};

export default RoundsSummary;