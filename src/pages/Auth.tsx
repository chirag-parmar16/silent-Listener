
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { MessageCircle, Instagram } from 'lucide-react';
import FeedbackForm from '@/components/FeedbackForm';
import { supabase } from '@/integrations/supabase/client';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
        navigate('/');
      } else {
        const { error } = await signUp(email, password);
        if (error) throw error;
        toast({
          title: "Account created!",
          description: "Please check your email to confirm your account.",
        });
        setIsLogin(true);
      }
    } catch (error: any) {
      console.error('Authentication error:', error);
      setError(error.message || 'An error occurred during authentication');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInstagramLogin = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'instagram',
        options: {
          redirectTo: window.location.origin + '/wall',
        },
      });
      
      if (error) throw error;
    } catch (error: any) {
      console.error('Instagram login error:', error);
      setError(error.message || 'An error occurred during Instagram authentication');
      setIsLoading(false);
    }
  };

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.3 }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24">
      {showFeedback ? (
        <motion.div 
          className="w-full max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FeedbackForm />
          <div className="text-center mt-4">
            <button
              onClick={() => setShowFeedback(false)}
              className="text-sm text-primary hover:underline"
            >
              Back to login
            </button>
          </div>
        </motion.div>
      ) : (
        <motion.div 
          className="w-full max-w-md space-y-8 bg-card rounded-lg shadow-lg p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="flex justify-center">
              <div className="bg-primary/10 p-3 rounded-full">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            <h2 className="mt-4 text-2xl font-bold tracking-tight text-foreground">
              {isLogin ? 'Sign in to your account' : 'Create a new account'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {isLogin
                ? 'Welcome back to Silent Listener'
                : 'Join our community today'}
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Email address"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Password"
                  className="mt-1"
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading
                ? 'Loading...'
                : isLogin
                ? 'Sign in'
                : 'Sign up'}
            </Button>
          </form>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-card text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center"
            onClick={handleInstagramLogin}
            disabled={isLoading}
          >
            <Instagram className="mr-2 h-4 w-4" />
            Sign in with Instagram
          </Button>

          <div className="text-center text-sm mt-4">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-medium text-primary hover:text-primary/80"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Sign in'}
            </button>
          </div>

          <div className="text-center text-sm mt-2">
            <button
              type="button"
              onClick={() => setShowFeedback(true)}
              className="font-medium text-primary hover:text-primary/80"
            >
              Share your feedback
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Auth;
