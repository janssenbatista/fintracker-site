import { useNavigate } from 'react-router';
import { useAuth } from './hooks/useAuth';

function App() {
  const { loading, user } = useAuth();

  const navigate = useNavigate();

  if (!user && !loading) {
    navigate('login');
  }

  if (loading) {
    return (
      <main className="flex min-h-screen min-w-screen items-center justify-center">Loading...</main>
    );
  }

  if (user) {
    navigate('dashboard');
  }
}

export default App;
