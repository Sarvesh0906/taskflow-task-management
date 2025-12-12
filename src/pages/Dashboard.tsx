import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { DashboardHeader } from '@/components/layout/DashboardHeader';
import { ProfileCard } from '@/components/dashboard/ProfileCard';
import { TaskList } from '@/components/dashboard/TaskList';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      <main className="container py-8">
        <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
          <aside className="space-y-6">
            <ProfileCard />
          </aside>
          <section>
            <TaskList />
          </section>
        </div>
      </main>
    </div>
  );
}
