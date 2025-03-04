
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, Lock, Mail, User, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Header from '@/components/Header';

type AuthMode = 'login' | 'register';

const Login = () => {
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const toggleAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // In a real app, this would connect to an authentication service
      // For demonstration, we'll simulate success after a brief delay
      setTimeout(() => {
        // Simulate successful authentication
        localStorage.setItem('isAuthenticated', 'true');
        if (authMode === 'register') {
          localStorage.setItem('userName', name);
        }
        
        toast({
          title: authMode === 'login' ? 'Login successful' : 'Account created',
          description: authMode === 'login' 
            ? 'Welcome back to SafePath Guardian!' 
            : 'Your account has been created successfully.',
        });
        
        navigate('/profile');
      }, 1500);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Authentication failed',
        description: 'Please check your credentials and try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="pt-32 pb-16 px-6 md:px-8">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              {authMode === 'login' ? 'Sign In' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground max-w-sm mx-auto">
              {authMode === 'login' 
                ? 'Welcome back! Enter your credentials to access your account.' 
                : 'Join SafePath Guardian for enhanced personal safety.'}
            </p>
          </div>

          <div className="glass rounded-xl p-6 md:p-8 shadow-glass animate-fade-in">
            <form onSubmit={handleSubmit} className="space-y-5">
              {authMode === 'register' && (
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute left-3 top-2.5 text-muted-foreground">
                      <User className="h-5 w-5" />
                    </div>
                    <Input
                      id="name"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-muted-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-2.5 text-muted-foreground">
                    <Lock className="h-5 w-5" />
                  </div>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-2.5 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {authMode === 'login' && (
                <div className="text-right">
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </a>
                </div>
              )}

              <Button 
                type="submit" 
                className="w-full py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {authMode === 'login' ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  authMode === 'login' ? 'Sign In' : 'Create Account'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                {authMode === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={toggleAuthMode}
                  className="ml-1 text-primary hover:underline font-medium"
                >
                  {authMode === 'login' ? 'Sign up' : 'Sign in'}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
