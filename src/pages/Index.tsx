import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Zap, LayoutDashboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';

const features = [
  { icon: CheckCircle2, title: 'Task Management', description: 'Create, update, and organize your tasks with ease.' },
  { icon: Shield, title: 'Secure Authentication', description: 'Your data is protected with industry-standard security.' },
  { icon: Zap, title: 'Fast & Responsive', description: 'Optimized for speed on any device.' },
];

export default function Index() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/dashboard');
    }
  }, [user, loading, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <header className="container py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg gradient-primary flex items-center justify-center">
              <LayoutDashboard className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">TaskFlow</span>
          </div>
          <Link to="/auth"><Button variant="outline">Sign In</Button></Link>
        </nav>
      </header>

      <section className="container py-20 text-center">
        <div className="mx-auto max-w-3xl space-y-8 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Manage Your Tasks<span className="block text-primary">With Confidence</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto py-10">
            A simple, secure, and scalable task management application. Sign up today and take control of your productivity.
          </p>
          <Link to="/auth">
            <Button size="lg" className="gap-2 gradient-primary text-primary-foreground shadow-lg hover:shadow-glow">
              Get Started <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="container py-20">
        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={feature.title} className="rounded-xl border bg-card p-6 text-center space-y-4 animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="mx-auto h-12 w-12 rounded-lg bg-accent flex items-center justify-center">
                <feature.icon className="h-6 w-6 text-accent-foreground" />
              </div>
              <h3 className="text-lg font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TaskFlow</p>
        </div>
      </footer>
    </div>
  );
}
