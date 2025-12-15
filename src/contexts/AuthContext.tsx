import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface Profile {
    id: string;
    full_name: string | null;
    role: 'student' | 'admin';
    avatar_url: string | null;
    created_at: string;
    updated_at: string;
}

interface AuthContextType {
    user: User | null;
    profile: Profile | null;
    session: Session | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<void>;
    signUp: (email: string, password: string, fullName: string) => Promise<void>;
    signInWithGoogle: () => Promise<void>;
    signInWithMagicLink: (email: string) => Promise<void>;
    signOut: () => Promise<void>;
    updateProfile: (updates: Partial<Profile>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const { toast } = useToast();

    // Fetch user profile from database
    const fetchProfile = async (userId: string) => {
        try {
            console.log('[AuthContext] Загрузка профиля для user_id:', userId);
            
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) {
                console.error('[AuthContext] Supabase error:', {
                    message: error.message,
                    code: error.code,
                    details: error.details,
                    hint: error.hint,
                });
                throw error;
            }
            
            console.log('[AuthContext] Профиль загружен:', data);
            setProfile(data);
        } catch (error) {
            const err = error as { message?: string; code?: string; details?: string; hint?: string };
            console.error('[AuthContext] Полная ошибка:', error);
            console.error('[AuthContext] Детали:', {
                message: err?.message,
                code: err?.code,
                details: err?.details,
                hint: err?.hint,
            });
            setProfile(null);
        }
    };

    // Initialize auth state
    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            }
            setLoading(false);
        });

        // Listen for auth changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
            if (session?.user) {
                fetchProfile(session.user.id);
            } else {
                setProfile(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    // Sign in with email and password
    const signIn = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;

            toast({
                title: 'Успешный вход',
                description: 'Добро пожаловать!',
            });
        } catch (error) {
            const authError = error as AuthError;
            toast({
                title: 'Ошибка входа',
                description: authError.message,
                variant: 'destructive',
            });
            throw error;
        }
    };

    // Sign up with email and password
    const signUp = async (email: string, password: string, fullName: string) => {
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                },
            });

            if (error) throw error;

            toast({
                title: 'Регистрация успешна',
                description: 'Проверьте email для подтверждения аккаунта',
            });
        } catch (error) {
            const authError = error as AuthError;
            toast({
                title: 'Ошибка регистрации',
                description: authError.message,
                variant: 'destructive',
            });
            throw error;
        }
    };

    // Sign in with Google OAuth
    const signInWithGoogle = async () => {
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
        } catch (error) {
            const authError = error as AuthError;
            toast({
                title: 'Ошибка входа через Google',
                description: authError.message,
                variant: 'destructive',
            });
            throw error;
        }
    };

    // Sign in with magic link
    const signInWithMagicLink = async (email: string) => {
        try {
            const { error } = await supabase.auth.signInWithOtp({
                email,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;

            toast({
                title: 'Ссылка отправлена',
                description: 'Проверьте email для входа',
            });
        } catch (error) {
            const authError = error as AuthError;
            toast({
                title: 'Ошибка отправки ссылки',
                description: authError.message,
                variant: 'destructive',
            });
            throw error;
        }
    };

    // Sign out
    const signOut = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;

            toast({
                title: 'Выход выполнен',
                description: 'До скорой встречи!',
            });
        } catch (error) {
            const authError = error as AuthError;
            toast({
                title: 'Ошибка выхода',
                description: authError.message,
                variant: 'destructive',
            });
            throw error;
        }
    };

    // Update user profile
    const updateProfile = async (updates: Partial<Profile>) => {
        if (!user) throw new Error('No user logged in');

        try {
            const { error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', user.id);

            if (error) throw error;

            // Refresh profile
            await fetchProfile(user.id);

            toast({
                title: 'Профиль обновлен',
                description: 'Изменения сохранены',
            });
        } catch (error) {
            toast({
                title: 'Ошибка обновления',
                description: 'Не удалось сохранить изменения',
                variant: 'destructive',
            });
            throw error;
        }
    };

    const value = {
        user,
        profile,
        session,
        loading,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithMagicLink,
        signOut,
        updateProfile,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Custom hook to use auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Helper hooks
export function useUser() {
    const { user } = useAuth();
    return user;
}

export function useProfile() {
    const { profile } = useAuth();
    return profile;
}

export function useSession() {
    const { session } = useAuth();
    return session;
}

export function useIsAdmin() {
    const { profile } = useAuth();
    return profile?.role === 'admin';
}
