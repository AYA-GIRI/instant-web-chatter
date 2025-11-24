import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Mail, Sparkles } from 'lucide-react';

export function MagicLinkForm() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const { signInWithMagicLink } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await signInWithMagicLink(email);
            setSent(true);
        } catch (error) {
            console.error('Magic link error:', error);
        } finally {
            setLoading(false);
        }
    };

    if (sent) {
        return (
            <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold">Проверьте почту!</h3>
                    <p className="text-sm text-muted-foreground">
                        Мы отправили ссылку для входа на <strong>{email}</strong>
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Ссылка действительна в течение 1 часа
                    </p>
                </div>
                <Button
                    variant="outline"
                    onClick={() => {
                        setSent(false);
                        setEmail('');
                    }}
                >
                    Отправить ещё раз
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="space-y-2 text-center">
                <h3 className="text-lg font-semibold">Вход по ссылке</h3>
                <p className="text-sm text-muted-foreground">
                    Введите email и мы отправим вам ссылку для входа
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                    <Label htmlFor="magic-email">Email</Label>
                    <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                        <Input
                            id="magic-email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="pl-10"
                            required
                            disabled={loading}
                        />
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full"
                    disabled={loading}
                >
                    {loading ? 'Отправка...' : 'Отправить ссылку'}
                </Button>
            </form>

            <p className="text-xs text-center text-muted-foreground">
                Не требуется пароль. Просто перейдите по ссылке из письма.
            </p>
        </div>
    );
}
