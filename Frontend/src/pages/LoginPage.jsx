import { Paper, Stack, Typography } from '@mui/material';
import CenteredContent from '../components/CenteredContent';
import LoginButton from '../components/LoginButton';

const LoginPage = () => {
    return (
        <main className='login'>
            <CenteredContent centerX={true} centerY={true} my={'2rem'}>
                <Paper elevation={6} sx={{ padding: '3rem', borderRadius: '1.5rem', width: '60%', backgroundColor: '#000000'}}>
                    <Stack sx={{ alignItems: 'center', marginBottom: '2rem'}}>
                        <Typography variant='h5' sx={{ letterSpacing: '.1rem' }}>
                            Welcome!
                        </Typography>
                    </Stack>
                    <Stack direction='column' spacing='1rem' alignItems={'center'} justifyContent={'center'}>
                        <Typography>
                            This is a Web Application for Sports Tournaments. To use this application, you must be logged in.
                        </Typography>
                        <LoginButton/>
                    </Stack>
                    <br />
                </Paper>
            </CenteredContent>
        </main >
    );

};

export default LoginPage;