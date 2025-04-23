
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User } from '@supabase/supabase-js';
import { useToast } from '@/hooks/use-toast';

interface AuthContextProps {
  session: Session | null;
  user: User | null;
  profile: any | null;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  userHasRole: (role: 'admin' | 'analyst' | 'user') => boolean;
  roles: string[];
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [roles, setRoles] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Initialize with current session and set up listener
    const initAuth = async () => {
      setIsLoading(true);
      
      // First check the current session
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session);
      
      // Set up the auth state change listener
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          handleSession(session);
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    };
    
    initAuth();
  }, []);

  const handleSession = async (session: Session | null) => {
    setSession(session);
    setUser(session?.user || null);
    
    if (session?.user) {
      try {
        // Fetch user profile using RPC function instead of direct table access
        const { data: profile, error } = await supabase.rpc('get_user_profile', {
          p_user_id: session.user.id
        });

        if (error) {
          console.error('Error loading user profile:', error);
          setProfile(null);
        } else {
          setProfile(profile);
        }

        // Fetch user roles using RPC function
        const { data: userRoles, error: rolesError } = await supabase.rpc('get_user_roles', {
          p_user_id: session.user.id
        });

        if (rolesError) {
          console.error('Error loading user roles:', rolesError);
          setRoles([]);
        } else {
          // Ensure we can extract role names from the result
          setRoles(Array.isArray(userRoles) ? userRoles.map(r => r.role || '') : []);
        }
      } catch (error) {
        console.error('Session handling error:', error);
      }
    } else {
      setProfile(null);
      setRoles([]);
    }
    
    setIsLoading(false);
  };

  const logUserActivity = async (activityType: string, details: any = {}) => {
    if (!user) return;

    try {
      await supabase.rpc('log_user_activity', {
        p_user_id: user.id,
        p_activity_type: activityType,
        p_details: details,
        p_ip_address: '127.0.0.1' // In a real app, you would get this from the client
      });
    } catch (error) {
      console.error('Failed to log activity:', error);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        toast({
          title: "Login failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Login successful",
        description: "Welcome back!",
      });

      return { error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { error };
    }
  };

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          }
        }
      });

      if (error) {
        toast({
          title: "Registration failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      }

      toast({
        title: "Registration successful",
        description: "Please check your email for verification instructions.",
      });

      return { error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { error };
    }
  };

  const signOut = async () => {
    await logUserActivity('logout');
    await supabase.auth.signOut();
  };

  const userHasRole = (role: 'admin' | 'analyst' | 'user') => {
    return roles.includes(role);
  };

  const value = {
    session,
    user,
    profile,
    isLoading,
    signIn,
    signUp,
    signOut,
    userHasRole,
    roles
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
