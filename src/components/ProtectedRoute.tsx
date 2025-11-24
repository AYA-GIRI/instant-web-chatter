import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, profile, loading } = useAuth();
    const location = useLocation();

    // Show loading state while checking auth
    if (loading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Проверка доступа...</p>
                </div>
            </div>
        );
    }

    // Redirect to login if not authenticated
    if (!user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // Check admin requirement
    if (requireAdmin && profile?.role !== 'admin') {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <h1 className="text-4xl font-bold text-foreground mb-4">403</h1>
                    <h2 className="text-2xl font-semibold text-foreground mb-2">
                        Доступ запрещён
                    </h2>
                    <p className="text-muted-foreground mb-6">
                        У вас нет прав для просмотра этой страницы
                    </p>
                    <a
                        href="/"
                        className="text-primary hover:underline"
                    >
                        Вернуться на главную
                    </a>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
