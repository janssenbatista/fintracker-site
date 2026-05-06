import type React from 'react';

interface Props {
  message: string;
}

const ErrorMessage: React.FC<Props> = ({ message }) => {
  return (
    <p
      data-testid="error-message"
      className="rounded-lg border border-red-600 bg-red-100 p-2 text-sm text-red-600"
    >
      {message}
    </p>
  );
};

export default ErrorMessage;
