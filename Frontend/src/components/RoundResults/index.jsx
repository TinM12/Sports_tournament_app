import { Box, Button, Grid } from '@mui/material';
import React, { useEffect } from 'react';

const RoundResults = ({ results, round, isOwner}) => {

    useEffect(() => {
        console.log(isOwner)
    })

    return (
        <Box>
            <Grid container marginTop='2rem'>
                {results.filter((result) => result.round === round).map((result,index) => (
                    <Grid item md={6} key={index}>
                        <table style={{ backgroundColor: '#282A3A'}}>
                            <tbody>
                                <tr>
                                    <td>{result.contestant_result_homecontestandidTocontestant.contestantName}</td>
                                    <td>{result.scoreHome || "TBD"}</td>
                                </tr>
                                <tr>
                                    <td>{result.contestant_result_awaycontestandidTocontestant.contestantName}</td>
                                    <td>{result.scoreAway || "TBD"}</td>
                                </tr>
                            </tbody>
                        </table>
                        <br/>
                        {isOwner && 
                            <Button variant='contained' color='secondary'>
                                UPDATE
                            </Button>
                        }
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RoundResults;