import { Box, Button, CircularProgress, Grid, Stack, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import CtrTextField from '../CtrTextField'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const CreateTournamentForm = () => {

    const { control, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [contestants, setContestants] = useState();
    const [winPoints, setWinPoints] = useState();
    const [drawPoints, setDrawPoints] = useState();
    const [lossPoints, setLossPoints] = useState();
    const navigateTo = useNavigate();

    const { user } = useAuth0();

    const onSubmit = async (data) => {
        setError(); 
        if(contestants.indexOf(';') !== -1) {
            if(contestants.split(';').length < 4 || contestants.split(';').length > 8) {
                setError("Number of contestants must be between 4 and 8.")
                return;
            }
        } else {
            if(contestants.split('\n').length < 4 || contestants.split('\n').length > 8) {
                setError("Number of contestants must be between 4 and 8.")
                return;
            }
        }

        if(!parseFloat(winPoints) || !parseFloat(drawPoints) || !parseFloat(drawPoints)) {
            setError("Points must be a number.")
            return;
        }

        try {
            setLoading(true);
            console.log(process.env.REACT_APP_BACKEND_URL)
            await axios.post(`${process.env.REACT_APP_BACKEND_URL}tournament`, {
                name: data.name,
                winpoints: parseFloat(winPoints),
                losspoints: parseFloat(lossPoints),
                drawpoints: parseFloat(drawPoints),
                contestants: contestants,
                owner: user.email,
            });
            
            navigateTo('/');
        } catch(err) {
            setError("An error occured, try again!");
        } finally {
            setLoading(false)
        }
    }

    const handleContestantsInput = (e) => {
        setContestants(e.target.value)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box sx={{ margin: '1rem'}}>
                <Typography variant='h6' sx={{ textDecoration: 'underline', fontWeight: 'bold', color: '#C69749', marginLeft:'1rem' }}>
                    CREATE NEW TOURNAMENT:
                </Typography>
                <br/>
                <Stack direction='column' spacing='1rem' marginLeft={'1rem'}>
                    <Grid container alignItems={'center'} >
                        <Grid item md={6}>
                            <Stack direction='column' >
                                <CtrTextField label='Name' control={control} name='name' defaultVal={''} color='secondary' required/>
                            </Stack>
                        </Grid>
                        <Grid item md={1}>
                        </Grid>
                        <Grid item md={1.1}>
                            <Typography color='secondary' sx={{ fontWeight: 'bold' }}>
                                Points System:
                            </Typography>
                        </Grid>
                        <Grid item md={1} marginLeft='0.5rem'>
                            <Stack direction='row' spacing='0.4rem' alignItems={'center'}>
                                    <Typography sx={{ fontSize: '1.1rem' }}>
                                        Win: 
                                    </Typography>
                                    <TextField color='secondary' size='small' sx={{ width:'50%' }} value={winPoints || ""}
                                        onChange={(e) => {
                                            setWinPoints(e.target.value);
                                        }}
                                    />
                                </Stack>
                        </Grid>
                        <Grid item md={1} marginLeft='0.3rem'>
                            <Stack direction='row' spacing='0.4rem' alignItems={'center'}>
                                    <Typography sx={{ fontSize: '1.1rem' }}>
                                        Draw: 
                                    </Typography>
                                    <TextField color='secondary' size='small' sx={{ width:'50%' }} value={drawPoints || ""}
                                        onChange={(e) => {
                                            setDrawPoints(e.target.value);
                                        }}
                                    />
                                </Stack>
                        </Grid>
                        <Grid item md={1} marginLeft='0.5rem'>
                            <Stack direction='row' spacing='0.4rem' alignItems={'center'}>
                                    <Typography sx={{ fontSize: '1.1rem' }}>
                                        Loss: 
                                    </Typography>
                                    <TextField color='secondary' size='small' sx={{ width:'50%' }} value={lossPoints || ""}
                                        onChange={(e) => {
                                            setLossPoints(e.target.value);
                                        }}
                                    />
                                </Stack>
                        </Grid>
                    </Grid>

                    <Stack sx={{ width: '50%', marginBottom: '1rem' }}>
                        <TextField
                            color='secondary'
                            multiline minRows={1} maxRows={Infinity} 
                            value={contestants || ''} onChange={handleContestantsInput} label='Contestants'
                            fullWidth required
                        />
                    </Stack>
                    {loading ?
                        <Stack direction='row' justifyContent='end'>
                            <CircularProgress />
                        </Stack>
                        : <Stack direction='row' justifyContent='end'>
                            <Button variant='contained' type='submit' color='secondary' sx={{ padding: '0.6rem', width: '20%', borderRadius: '0.5rem' }}>
                                Create Tournament
                            </Button>
                        </Stack>
                    }
                </Stack>
                <br />
                {error &&
                    <Stack direction='column' alignItems='center'>
                        <Typography color='red'>
                            {error}
                        </Typography>
                    </Stack>
                }
            </Box>
            <hr color='#C69749'/>
        </form>
    );
};

export default CreateTournamentForm;