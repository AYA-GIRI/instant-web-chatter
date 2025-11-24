import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LoginForm } from '@/components/auth/LoginForm';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { MagicLinkForm } from '@/components/auth/MagicLinkForm';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const Login = () => {
    const [activeTab, setActiveTab] = useState('login');
    const { user, loading } = useAuth();

    // Redirect if already logged in
    if (loading) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Загрузка...</p>
                </div>
            </div>
        );
    }

    if (user) {
        return <Navigate to="/methods" replace />;
    }

    return (
        <div className="min-h-screen bg-transparent relative overflow-hidden">
            <Navigation />

            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-md">
                    <Card className="glass-panel border-white/40">
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl font-bold">
                                Добро пожаловать
                            </CardTitle>
                            <CardDescription>
                                Войдите или зарегистрируйтесь для доступа к материалам
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="login">Вход</TabsTrigger>
                                    <TabsTrigger value="register">Регистрация</TabsTrigger>
                                    <TabsTrigger value="magic">Magic Link</TabsTrigger>
                                </TabsList>

                                <TabsContent value="login" className="mt-6">
                                    <LoginForm />
                                </TabsContent>

                                <TabsContent value="register" className="mt-6">
                                    <RegisterForm />
                                </TabsContent>

                                <TabsContent value="magic" className="mt-6">
                                    <MagicLinkForm />
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>

                    <p className="text-center text-sm text-muted-foreground mt-6">
                        Регистрируясь, вы соглашаетесь с нашими{' '}
                        <a href="/terms" className="text-primary hover:underline">
                            условиями использования
                        </a>{' '}
                        и{' '}
                        <a href="/privacy" className="text-primary hover:underline">
                            политикой конфиденциальности
                        </a>
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Login;
