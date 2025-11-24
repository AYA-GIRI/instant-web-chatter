import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const AuthCallback = () => {
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        // Wait a bit for auth state to update
        const timer = setTimeout(() => {
            if (user) {
                navigate('/methods', { replace: true });
            } else {
                navigate('/login', { replace: true });
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [user, navigate]);

    return (
        <div className="min-h-screen bg-transparent flex items-center justify-center">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">Завершение входа...</p>
            </div>
        </div>
    );
};

export default AuthCallback;
