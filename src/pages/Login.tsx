import { useState, type SubmitEvent } from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="mx-4 w-full max-w-xl rounded-lg border border-neutral-200 px-4 py-8 shadow-lg md:px-8">
        <div className="mb-6 flex items-center justify-center">
          <Logo />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              Email
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
              Password
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
            <p className="mt-2 text-end">
              <Link
                data-testid="forgot-password"
                to={''}
                className="text-sm font-medium text-green-600 hover:text-green-700"
              >
                Esqueci minha senha
              </Link>
            </p>
          </div>

          <button
            data-testid="sign-in"
            type="submit"
            className="w-full cursor-pointer rounded bg-green-400 py-2 font-medium text-white transition-colors duration-150 hover:bg-green-500"
          >
            Entrar
          </button>
          <p className="text-center font-medium">
            Não possui conta?{' '}
            <Link data-testid="sign-up" to={''} className="text-green-600">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
