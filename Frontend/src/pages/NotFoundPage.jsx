import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => { 
    
    const navigateTo = useNavigate();

    useEffect(() => {
        navigateTo('/');
    });
};

export default NotFoundPage;