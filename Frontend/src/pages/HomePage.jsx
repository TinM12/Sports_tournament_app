import { Navigate } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";
import Header from '../components/Header';
import CreateTournamentForm from '../components/CreateTournamentForm';
import MyTournamentsList from '../components/MyTournamentsList';

const HomePage = () => {
    const { isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading ...</div>;
    }
    if(!isAuthenticated) {
        return <Navigate to={'/login'} />;
    }
    return (
        <main>
            <Header/>
            <CreateTournamentForm/>
            <MyTournamentsList/>
        </main>
    );
};

export default HomePage;