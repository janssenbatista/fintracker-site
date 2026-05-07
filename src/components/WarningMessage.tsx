import type React from 'react';

interface Props {
  onClick: () => void;
}

const WarningMessage: React.FC<Props> = ({ onClick }) => {
  return (
    <section
      data-testid="warning"
      className="flex w-full max-w-xl flex-col gap-2 rounded-lg border border-yellow-500 bg-yellow-200 p-4"
    >
      <p data-testid="warning-text">
        Essa aplicação é utilizada apenas para testes. Todos os usuários criados são removidos
        automaticamente todos os dias as 00:00h.
      </p>
      <button
        data-testid="warning-button"
        type="button"
        className="cursor-pointer self-end text-yellow-800 hover:text-yellow-900"
        onClick={onClick}
      >
        Fechar
      </button>
    </section>
  );
};

export default WarningMessage;
