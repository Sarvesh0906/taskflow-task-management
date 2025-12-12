import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutDashboard } from 'lucide-react';
import { AuthForm } from '@/components/auth/AuthForm';
import { useAuth } from '@/hooks/useAuth';

export default function Auth() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center gap-3 animate-fade-in">
          <div className="h-14 w-14 rounded-xl gradient-primary flex items-center justify-center shadow-glow">
            <LayoutDashboard className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">TaskFlow</h1>
          <p className="text-muted-foreground text-center">
            Manage your tasks efficiently
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
}
