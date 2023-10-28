import { Box, Button, Grid } from '@mui/material';
import React from 'react';

const RoundResults = ({ results, round, isOwner}) => {

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
                            <Box marginBottom={'2rem'}>
                                <Button variant='contained' color='secondary'>
                                    UPDATE
                                </Button>
                            </Box>  
                        }
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RoundResults;