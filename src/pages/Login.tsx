import { useState, type SubmitEvent } from 'react';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import WarningMessage from '../components/WarningMessage';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isWarningVisible, setIsWarningVisible] = useState(true);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      return;
    }

    const { error: signInError } = await signIn({
      email,
      password,
    });

    if (!signInError) {
      navigate('/');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      {isWarningVisible && <WarningMessage onClick={() => setIsWarningVisible(false)} />}

      <div className="mx-4 w-full max-w-xl rounded-lg border border-neutral-200 px-4 py-8 shadow-lg md:px-8">
        <div className="mb-6 flex items-center justify-center">
          <Logo />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              E-mail
            </label>
            <input
              data-testid="email"
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Senha
            </label>
            <input
              data-testid="password"
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
          </div>

          <button
            data-testid="sign-in"
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer rounded bg-green-400 py-2 font-medium text-white transition-colors duration-150 hover:bg-green-500 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
          {error && (
            <p data-testid="error-message" className="text-sm text-red-600">
              E-mail e/ou senha inválidos.
            </p>
          )}
          <p className="text-center font-medium">
            Não possui conta?{' '}
            <Link data-testid="sign-up" to={'/sign-up'} className="text-green-600">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
