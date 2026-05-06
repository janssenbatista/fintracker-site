import { useEffect, useState } from 'react';
import type { AuthError, Session, User } from '@supabase/supabase-js';
import { supabase } from '../api/supabase';

type Credentials = {
  email: string;
  password: string;
};

type SignUpCredentials = Credentials & {
  name?: string;
};

export const useAuth = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (!isMounted) {
        return;
      }

      setSession(data.session);
      setUser(data.session?.user ?? null);
      setLoading(false);
    };

    loadSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      setError(null);
      setLoading(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async ({ email, password }: Credentials) => {
    setLoading(true);
    setError(null);

    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError);
      setLoading(false);
      return { data: null, error: signInError };
    }

    setSession(data.session);
    setUser(data.user);
    setLoading(false);

    return { data, error: null };
  };

  const signUp = async ({ email, password, name }: SignUpCredentials) => {
    setLoading(true);
    setError(null);

    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
        },
      },
    });

    if (signUpError) {
      setError(signUpError);
      setLoading(false);
      return { data: null, error: signUpError };
    }

    setSession(data.session);
    setUser(data.user ?? null);
    setLoading(false);

    return { data, error: null };
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);

    const { error: signOutError } = await supabase.auth.signOut();

    if (signOutError) {
      setError(signOutError);
      setLoading(false);
      return { error: signOutError };
    }

    setSession(null);
    setUser(null);
    setLoading(false);

    return { error: null };
  };

  return {
    session,
    user,
    loading,
    error,
    signIn,
    signUp,
    signOut,
  };
};
