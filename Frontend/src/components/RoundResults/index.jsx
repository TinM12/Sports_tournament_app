import { Box, Button, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RoundResults = ({ results, round, isOwner, tournamentid, refreshFunction }) => {

    const [enableUpdate, setEnableUpdate] = useState();
    const [homeScore, setHomeScore] = useState();
    const [awayScore, setAwayScore] = useState();
    const [refreshResults, setRefreshResults] = useState(0);
    const [localResults, setLocalResults] = useState(results);
    const [error, setError] = useState([]);

    const handleUpdate = (e) => {
        setHomeScore();
        setAwayScore();
        setEnableUpdate(Number(e.target.value));
    };

    const handleConfirm = async () => {
        setError();

        if(!parseInt(homeScore) || !parseInt(awayScore)) {
            const temp = []
            temp[enableUpdate] = "Scores must be Integer values!"
            setError(temp);
            return;
        }

        await axios.put(`${process.env.REACT_APP_BACKEND_URL}result`, {
            scorehome: parseInt(homeScore),
            scoreaway: parseInt(awayScore),
            resultid: enableUpdate
        });
        setHomeScore();
        setAwayScore();
        setEnableUpdate();
        setRefreshResults(refreshResults + 1);
        refreshFunction();
    };

    const handleCancel = () => {
        setError();
        setHomeScore();
        setAwayScore();
        setEnableUpdate();
    };

    useEffect(() => {
        
        const loadLocalResults = async() => {
            const temp = await axios.get(`${process.env.REACT_APP_BACKEND_URL}result?id=${tournamentid}`);
            setLocalResults(temp.data);
        };

        loadLocalResults();
    }, [refreshResults, tournamentid])

    return (
        <Box>
            <Grid container marginTop='2rem'>
                {localResults && localResults.filter((result) => result.round === round).map((result,index) => (
                    <Grid item md={6} key={index}>
                        <table style={{ backgroundColor: '#282A3A'}} width={'80%'}>
                            <tbody>
                                <tr>
                                    <td>{result.contestant_result_homecontestandidTocontestant.contestantName}</td>
                                    {enableUpdate && enableUpdate === result.resultid?  
                                        <td>
                                            <TextField color='secondary' required size='small' value={homeScore || ""}
                                                onChange={(e) => {
                                                    setHomeScore(e.target.value);
                                                }}
                                            />
                                        </td>
                                        : <td width={'20%'}>
                                            {result.scoreHome === null ?
                                                <Typography>
                                                    TBD
                                                </Typography>
                                                : <Typography>
                                                    {result.scoreHome}
                                                </Typography>
                                            }
                                        </td>
                                    }
                                </tr> 
                                <tr>
                                    <td>{result.contestant_result_awaycontestandidTocontestant.contestantName}</td>
                                    {enableUpdate && enableUpdate === result.resultid?
                                        <td>
                                            <TextField color='secondary' size='small' required value={awayScore || ""}
                                                onChange={(e) => {
                                                    setAwayScore(e.target.value);
                                                }}
                                            />
                                        </td>
                                        : <td>
                                            {result.scoreAway === null ?
                                                <Typography>
                                                    TBD
                                                </Typography>
                                                : <Typography>
                                                    {result.scoreAway}
                                                </Typography>
                                            }
                                        </td>
                                    }
                                </tr>
                            </tbody>
                        </table>
                        {error && error[result.resultid] &&
                            <Stack direction='column' marginTop='1rem'>
                                <Typography color='red'>
                                    {error[result.resultid]}
                                </Typography>
                            </Stack>
                        }    
                        <br/>
                        {isOwner &&
                            <Box marginBottom={'2rem'}>
                                {enableUpdate && enableUpdate === result.resultid ?
                                    <Box display='flex' spacing='1rem'>
                                        <Button variant='contained' color='success' onClick={handleConfirm}>
                                            Confirm
                                        </Button>
                                        <Button variant='contained' color='error'  onClick={handleCancel} sx={{ marginLeft: '1rem' }}>
                                            Cancel
                                        </Button>
                                    </Box>
                                    : <Button variant='contained' color='secondary' value={result.resultid} onClick={handleUpdate}>
                                        UPDATE
                                    </Button>
                                }
                            </Box>  
                        }
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default RoundResults;