import { useState, type SubmitEvent } from 'react';
import Logo from '../components/Logo';
import { Link } from 'react-router';
import { validateEmail, validatePassword } from '../utils/form';

const SignUp = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isWarningVisible, setIsWarningVisible] = useState(true);

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};

    if (nome.replace(/\s/g, '').length < 2) {
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
      // TODO: realizar cadastro
      console.log('Cadastrar', { nome, email });
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white">
      {isWarningVisible && (
        <section className="flex w-full max-w-xl flex-col gap-2 rounded-lg border border-yellow-500 bg-yellow-200 p-4">
          <p data-testid="warning-text">
            Essa aplicação é utilizada para testes end to end. Todos os usuários criados são
            removidos automaticamente todos os dias as 00:00h.
          </p>
          <button
            data-testid="warning-button"
            type="button"
            className="cursor-pointer self-end text-yellow-800 hover:text-yellow-900"
            onClick={() => setIsWarningVisible(false)}
          >
            Fechar
          </button>
        </section>
      )}

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
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            {errors.nome && <p className="mt-1 text-sm text-red-600">{errors.nome}</p>}
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
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
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
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
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
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg border border-gray-400 px-3 py-2 focus:ring-2 focus:ring-green-400 focus:outline-none"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            type="submit"
            data-testid="sign-up"
            className="w-full cursor-pointer rounded bg-green-400 py-2 font-medium text-white transition-colors duration-150 hover:bg-green-500"
          >
            Cadastrar
          </button>
          <p className="text-center font-medium">
            Já possui conta?{' '}
            <Link data-testid="sign-in" className="text-green-600" to={'/login'}>
              Entrar
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
