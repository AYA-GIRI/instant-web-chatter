import { useState } from 'react';
import { Navigation } from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Profile = () => {
    const { user, profile, updateProfile } = useAuth();
    const navigate = useNavigate();
    const { toast } = useToast();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        full_name: profile?.full_name || '',
        avatar_url: profile?.avatar_url || '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            await updateProfile(formData);
            toast({
                title: 'Успех',
                description: 'Профиль успешно обновлен',
            });
            setIsEditing(false);
        } catch (error: any) {
            toast({
                title: 'Ошибка',
                description: error.message || 'Не удалось обновить профиль',
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            full_name: profile?.full_name || '',
            avatar_url: profile?.avatar_url || '',
        });
        setIsEditing(false);
    };

    if (!user || !profile) {
        return (
            <div className="min-h-screen bg-transparent flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
                    <p className="mt-4 text-muted-foreground">Загрузка профиля...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-transparent relative overflow-hidden">
            <Navigation />

            <section className="pt-32 pb-20 px-4">
                <div className="container mx-auto max-w-2xl">
                    <Card className="glass-panel border-white/40">
                        <CardHeader>
                            <div className="flex items-center justify-between">
                                <div>
                                    <CardTitle className="text-3xl font-bold">Профиль</CardTitle>
                                    <CardDescription>
                                        Управление вашей учетной записью
                                    </CardDescription>
                                </div>
                                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                                    {profile.avatar_url ? (
                                        <img
                                            src={profile.avatar_url}
                                            alt={profile.full_name || 'Avatar'}
                                            className="h-16 w-16 rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="h-8 w-8 text-primary" />
                                    )}
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Email (read-only) */}
                                <div className="space-y-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={user.email || ''}
                                        disabled
                                        className="bg-muted"
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        Email нельзя изменить
                                    </p>
                                </div>

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Полное имя</Label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        value={formData.full_name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, full_name: e.target.value })
                                        }
                                        disabled={!isEditing}
                                        className={!isEditing ? 'bg-muted' : ''}
                                    />
                                </div>

                                {/* Avatar URL */}
                                <div className="space-y-2">
                                    <Label htmlFor="avatar_url">URL аватара</Label>
                                    <Input
                                        id="avatar_url"
                                        type="url"
                                        value={formData.avatar_url}
                                        onChange={(e) =>
                                            setFormData({ ...formData, avatar_url: e.target.value })
                                        }
                                        disabled={!isEditing}
                                        className={!isEditing ? 'bg-muted' : ''}
                                        placeholder="https://example.com/avatar.jpg"
                                    />
                                </div>

                                {/* Role (read-only) */}
                                <div className="space-y-2">
                                    <Label htmlFor="role">Роль</Label>
                                    <Input
                                        id="role"
                                        type="text"
                                        value={profile.role === 'admin' ? 'Администратор' : 'Студент'}
                                        disabled
                                        className="bg-muted"
                                    />
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-4">
                                    {!isEditing ? (
                                        <>
                                            <Button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setIsEditing(true);
                                                }}
                                                className="flex-1"
                                            >
                                                Редактировать
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => navigate('/')}
                                                className="flex-1"
                                            >
                                                Назад
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button
                                                type="submit"
                                                disabled={loading}
                                                className="flex-1"
                                            >
                                                {loading ? (
                                                    <>
                                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                        Сохранение...
                                                    </>
                                                ) : (
                                                    'Сохранить'
                                                )}
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={handleCancel}
                                                disabled={loading}
                                                className="flex-1"
                                            >
                                                Отмена
                                            </Button>
                                        </>
                                    )}
                                </div>
                            </form>

                            {/* Account Info */}
                            <div className="mt-8 pt-6 border-t border-border">
                                <h3 className="text-sm font-semibold mb-4">Информация об аккаунте</h3>
                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <p>
                                        <span className="font-medium">Дата регистрации:</span>{' '}
                                        {new Date(profile.created_at).toLocaleDateString('ru-RU')}
                                    </p>
                                    <p>
                                        <span className="font-medium">Последнее обновление:</span>{' '}
                                        {new Date(profile.updated_at).toLocaleDateString('ru-RU')}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
};

export default Profile;
