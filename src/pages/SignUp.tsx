import { useState, type SubmitEvent } from 'react';
import Logo from '../components/Logo';
import { Link, useNavigate } from 'react-router';
import { validateEmail, validatePassword } from '../utils/form';
import { useAuth } from '../hooks/useAuth';
import ErrorMessage from '../components/ErrorMessage';
import WarningMessage from '../components/WarningMessage';

const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isWarningVisible, setIsWarningVisible] = useState(true);
  const [isUpdatingData, setIsUpdatingData] = useState(false);
  const navigate = useNavigate();
  const { signUp, error } = useAuth();

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setIsUpdatingData(false);
    const nextErrors: Record<string, string> = {};

    if (name.replace(/\s/g, '').length < 2) {
      nextErrors.nome = 'O nome deve possuir pelo menos 2 caracteres.';
    }

    if (!validateEmail(email)) {
      nextErrors.email = 'E-mail inválido.';
    }

    if (!validatePassword(password)) {
      nextErrors.password =
        'A senha precisa ter pelo menos 8 caracteres, letra maiúscula, minúscula e dígito.';
    }

    if (confirmPassword !== password) {
      nextErrors.confirmPassword = 'As senhas não coincidem.';
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length === 0) {
      const { error } = await signUp({ name, email, password });

      if (error) {
        console.log(error);
        return;
      }

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
            <label className="mb-1 block text-sm font-medium" htmlFor="nome">
              Nome
            </label>
            <input
              id="nome"
              data-testid="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsUpdatingData(true);
              }}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            {errors.nome && (
              <p data-testid="name-error-message" className="mt-1 text-sm text-red-600">
                {errors.nome}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              data-testid="email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setIsUpdatingData(true);
              }}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            {errors.email && (
              <p data-testid="email-error-message" className="mt-1 text-sm text-red-600">
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="password">
              Senha
            </label>
            <input
              id="password"
              data-testid="password"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setIsUpdatingData(true);
              }}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            {errors.password && (
              <p data-testid="password-error-message" className="mt-1 text-sm text-red-600">
                {errors.password}
              </p>
            )}
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium" htmlFor="confirmPassword">
              Confirmar senha
            </label>
            <input
              id="confirmPassword"
              data-testid="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setIsUpdatingData(true);
              }}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            {errors.confirmPassword && (
              <p data-testid="confirm-password-error-message" className="mt-1 text-sm text-red-600">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {error?.code === 'user_already_exists' && !isUpdatingData && (
            <ErrorMessage message={'E-mail já cadastrado.'} />
          )}

          <button
            type="submit"
            data-testid="signup-button"
            className="w-full cursor-pointer rounded bg-green-400 py-2 font-medium text-white transition-colors duration-150 hover:bg-green-500"
          >
            Cadastrar
          </button>

          <p className="text-center font-medium">
            Já possui conta?{' '}
            <Link data-testid="signin-link" className="text-green-600" to={'/login'}>
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
